import { input, confirm, select } from '@inquirer/prompts';
import chalk, { ChalkInstance } from 'chalk';
import { Player, Prisma, PrismaClient } from '@prisma/client';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890ABDCEFGHIJKLMNOPQRSTUVWXYZ', 5);

const prisma = new PrismaClient();

export const enum actionsTypes {
	msg = 'msg',
	room = 'room',
	action = 'action',
	sq = 'quit',
}

export enum dialogType {
	self = 'self',
	pnj = 'pnj',
	narrator = 'narrator',
}

async function turn({ gameInfo }: { gameInfo: GameInfo }) {
	console.clear();
	const scene = gameInfo.getNextScript();
	if (!scene) throw new Error('No scene found session might be corrupted');

	for (const dialog of scene.dialogs) {
		await Narator.dialog(dialog.content, dialog.speaker as dialogType);
	}

	const answer = await select(
		{
			message: 'Quelle action souhaitez-vous effectuer ?',
			choices: scene.actions.map((item) => {
				return {
					name: item.content,
					value: item.link.id,
				};
			}),
		},
		{
			clearPromptOnDone: true,
		}
	);

	await gameInfo.setNextElementScript(answer);
	return;
}

async function main() {
	try {
		console.clear();
		const gameInfo = new GameInfo();
		await gameInfo.init();
		while (!gameInfo.hasEnded()) {
			await turn({ gameInfo });
		}
	} catch (error) {
		console.error(error);
	}
}

await main();

// J'ai besoin de définir une structure qui me permet de gérer un tour et de récupérer le prochain tour

type CompleteScene = Prisma.SceneGetPayload<{
	include: {
		dialogs: true;
		actions: {
			include: {
				link: true;
			};
		};
	};
}>;

type CompleteSession = Prisma.SessionGetPayload<{
	include: {
		scene: {
			include: {
				dialogs: true;
				actions: {
					include: {
						link: true;
					};
				};
			};
		};
	};
}>;

class GameInfo {
	private player?: Player;
	private session?: CompleteSession;
	private end: boolean = false;
	private nextElementScript?: CompleteScene;

	async init() {
		{
			await Narator.speak("Bienvenue dans l'aventure jeune aventurier !");
			await Narator.speak(
				"Avant de commencer j'aurais besoin de de quelques informations..."
			);

			const answer = await input(
				{ message: 'Entrez votre nom' },
				{
					clearPromptOnDone: true,
				}
			);
			console.clear();

			const user = await prisma.player.findFirst({
				where: {
					name: answer,
				},
			});
			if (!user) {
				const user = await prisma.player.create({
					data: {
						name: answer,
						Session: {
							create: {
								sessionKey: nanoid(),
							},
						},
					},
				});
				const session = await prisma.session.findFirst({
					where: {
						player: {
							id: user.id,
						},
					},
					orderBy: {
						date: 'desc',
					},
					include: {
						scene: {
							include: {
								dialogs: true,
								actions: {
									include: {
										link: true,
									},
								},
							},
						},
					},
				});

				if (session) {
					await this.setSession(session);
				}

				this.setPlayer(user);

				await Narator.speak(`Ah heureux de vous rencontrer ${answer}!`);
				await Narator.speak(
					`Une grande aventure nous attend, j'espère que vous êtes prêts.`
				);
			} else {
				await Narator.speak(`Hum... il semblerait que votre tête me soit familière... !`);
				const answer = await confirm(
					{
						message:
							'Une session existe déjà pour vous, voulez vous continuer la précédente ?',
					},
					{
						clearPromptOnDone: true,
					}
				);

				this.setPlayer(user);

				if (answer) {
					await Narator.speak('Très bien continuons cette aventure dans ce cas !');
					const session = await prisma.session.findFirst({
						where: {
							playerId: user.id,
						},
					});
					if (!session) {
						await prisma.session.create({
							data: {
								player: {
									connect: {
										id: user.id,
									},
								},
								sessionKey: nanoid(),
							},
						});
					}

					const lastSession = await prisma.session.findFirst({
						where: {
							player: {
								id: user.id,
							},
						},
						orderBy: {
							date: 'desc',
						},
						include: {
							scene: {
								include: {
									dialogs: true,
									actions: {
										include: {
											link: true,
										},
									},
								},
							},
						},
					});
					if (lastSession) {
						await this.setSession(lastSession);
						if (lastSession.scene) this.nextElementScript = lastSession.scene;
					}
				} else {
					await Narator.speak(
						"Repartons alors de zero... allez savoir ce qu'il va advenir de vous cette fois !"
					);
					const session = await prisma.session.create({
						data: {
							player: {
								connect: {
									id: user.id,
								},
							},
							sessionKey: nanoid(),
						},
						include: {
							scene: {
								include: {
									dialogs: true,
									actions: {
										include: {
											link: true,
										},
									},
								},
							},
						},
					});

					await this.setSession(session);
				}
			}

			//spinner.stop();
			//console.clear();
		}
	}

	async setSession(session: CompleteSession) {
		this.session = session;

		if (session.scene) {
			this.nextElementScript = session.scene;
		} else await this.setDefaultScene();
	}

	private async setDefaultScene() {
		const defaultScene = await prisma.scene.findUnique({
			where: {
				id: 'default',
			},
			include: {
				dialogs: true,
				actions: {
					include: {
						link: true,
					},
				},
			},
		});

		if (!defaultScene)
			throw new Error('No default scene found, have you ran the seed script ?');
		this.nextElementScript = defaultScene;
	}

	setPlayer(player: Player) {
		this.player = player;
	}

	async setNextElementScript(nextElementScript: string) {
		if (nextElementScript === actionsTypes.sq) {
			return this.setEnd();
		}

		if (!this.session) throw new Error('No session found');
		const scene = await prisma.scene.findUnique({
			where: {
				id: nextElementScript,
			},
			include: {
				dialogs: true,
				actions: {
					include: {
						link: true,
					},
				},
			},
		});

		if (!scene) throw new Error('No scene found');

		await prisma.session.update({
			where: {
				id: this.session.id,
			},
			data: {
				scene: {
					connect: {
						id: scene.id,
					},
				},
			},
		});
		this.nextElementScript = scene;
	}

	getSession() {
		return this.session;
	}

	getPlayer() {
		return this.player;
	}

	getNextScript() {
		return this.nextElementScript;
	}

	setEnd() {
		this.end = true;
	}

	hasEnded() {
		return this.end;
	}
}

class Narator {
	private static readingSpeed: number = 20;
	static async speak(text: string) {
		await typeWriterEffect(text, this.readingSpeed, chalk.magenta);
	}

	static async dialog(text: string, type: keyof typeof dialogType) {
		switch (type) {
			case dialogType.narrator: {
				await this.speak(text);
				break;
			}
			case dialogType.pnj: {
				await typeWriterEffect(text, this.readingSpeed, chalk.green);
				break;
			}
			case dialogType.self: {
				await typeWriterEffect(text, this.readingSpeed, chalk.yellow);
				break;
			}
			default: {
				throw new Error('Unknown dialog type');
			}
		}
	}
}

async function typeWriterEffect(text: string, speed: number, decorator: ChalkInstance) {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	for (const char of text) {
		process.stdout.write(decorator(char));
		await delay(speed);
	}
	console.log(); // Move to the next line after typing is complete
}
