import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
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

export type Round = {
	type: (typeof actionsTypes)[keyof typeof actionsTypes];
	content: Dialog[];
	actions: {
		type: (typeof actionsTypes)[keyof typeof actionsTypes];
		content: string;
		link: string;
	}[];
};

export type Dialog = {
	speaker: (typeof dialogType)[keyof typeof dialogType];
	content: string;
};

export type RoundHolder = {
	[key: string]: Round;
};

const dataStructure: RoundHolder = {
	quit: {
		type: actionsTypes.sq,
		content: [],
		actions: [],
	},
	suzie: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.self,
				content:
					"Hello Suzie, toujour aussi en forme ? Dit moi toi qui connais tous les ragots, tu sais pas ce qu'il s'est passé hier soir ? J'ai l'impression que toute la ville a changé...",
			},
			{
				speaker: dialogType.narrator,
				content:
					"Et c'est ainsi que se termine notre première partie de l'histoire. Je n'ai pas eu le teps de faire plus, c'est déjà bien assez.",
			},
		],
		actions: [
			{
				type: actionsTypes.sq,
				content: "Merci d'avoir essayé la démo de Far à l'Ouest.",
				link: actionsTypes.sq,
			},
		],
	},
	sheriff_prison: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.self,
				content:
					"Je ne sais pas à quelle paix tu veilles, mais une chose est sûre, c'est qu'il y a de l'or au fond de ton tamis.",
			},
			{
				speaker: dialogType.narrator,
				content: 'Le shérif se lève, énervé par vos propos.',
			},
			{
				speaker: dialogType.pnj,
				content:
					"Billy Boy tu as raison, je me fais vieux et ma déduction n'est plus ce qu'elle était, que dirais tu de m'aider ? Assied toi qu'on puisse en discuter.",
			},
			{
				speaker: dialogType.self,
				content: "Et bien je m'attendais pas à ça en venant ici.",
			},
			{
				speaker: dialogType.narrator,
				content: "Vous vous asseillez à la table du shérif, l'air confiant.",
			},
			{
				speaker: dialogType.narrator,
				content:
					"Seulement... vous n'aviez pas remaqué que le sherif avait sorti ses menotes. Il vous menottes à la cheville et vous traine en cellule.",
			},
			{
				speaker: dialogType.pnj,
				content:
					'Fais donc le malin maintenant derrière les barreaux de la prison. Peut être la prochaine fois tu y réfléchira à deux fois avant de me provoquer.',
			},
		],
		actions: [
			{
				type: actionsTypes.sq,
				content:
					"Après quelques jours, vous serez transporté loin d'ici dans une prison peu regardante. [GAME OVER]",
				link: actionsTypes.sq,
			},
		],
	},
	sheriff_wound: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.narrator,
				content: 'Notre personnage montre le petit doigt de la main gauche au shérif',
			},
			{
				speaker: dialogType.self,
				content:
					"Tu as vu que Joe avait une blessure assez grave au niveau de la main, ça m'a interpellé lors de notre conversation. Tout allait bien hier.",
			},
			{
				speaker: dialogType.pnj,
				content: 'Il a dû se couper en rangeant ou faisant la vaisselle.',
			},
			{
				speaker: dialogType.self,
				content:
					'Joe a la peau des mains dure, il était menuisier avant je te le rappelle.',
			},
			{
				speaker: dialogType.pnj,
				content:
					'Billy... Tu ne devrait pas te méler de ce qui ne te regarde pas. Je dis ça pour ton bien. Il y a des choses que même moi ici je ne suis pas en mesure de maitriser.',
			},
			{
				speaker: dialogType.narrator,
				content: 'Billy Boy prend note de ces "menaces".',
			},
			{
				speaker: dialogType.self,
				content:
					"Très bien Sheriff, je m'en vais j'ai à faire, faites attention à vos santiags toute neuves c'est jonché de merde aujourd'hui !",
			},
		],
		actions: [
			{
				type: actionsTypes.action,
				content: 'Vous décidez de provoquer une dernière fois le Sherif.',
				link: 'sheriff_prison',
			},
			{
				type: actionsTypes.action,
				content: 'Vous allez chez la Suzie, après tout on lui raconte beaucoup de choses.',
				link: 'suzie',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
	epicerie: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.narrator,
				content:
					"Notre personnage s'apprête à passer la porte de l'épicerie quand tout à coup M. Jenkins sort furieux avec son six coup sur votre gorge.",
			},
			{
				speaker: dialogType.pnj,
				content: 'BILLY BOY TU AS DU CULOT DE REVENIR APRES CE QUE TU AS FAIT HIER SOIR.',
			},
			{
				speaker: dialogType.self,
				content:
					"WOW, WOW, WOW Jenkins, calme toi c'est surement un malentendu. Que dirais tu d'un brin de causette avant de m'envoyer voir Papa Johnny ?",
			},
			{
				speaker: dialogType.pnj,
				content:
					"BILLY ON M'A VOLÉ TOUT MON STOCK, ET SEULEMENT TOI ET MOI CONNAISSIONS LA TRAPPE SECRETE POUR OUVRIR LA PORTE ! Et jusqu'à preuve du contraire on ne se vole pas sois même.",
			},
			{
				speaker: dialogType.self,
				content: "JENKINS, Je te JURE que je n'ai rien à voir dans tout ça.",
			},
			{
				speaker: dialogType.pnj,
				content:
					"Tu mens comme tu respire Billy Boy, j'ai un dessin de toi en train de faire le méfais fait par Joe quand il a fermé son bar hier.",
			},
			{
				speaker: dialogType.narrator,
				content:
					"M. Jenkins ne retrouvera pas la raison, vous ne mourrez pas, mais vous finirez goudronné avec des plumes, dépossédé de tout ce que vous aviez et laissé à votre propre sort devant l'entrée du village où vous n'êtes plus le bienvenu.",
			},
		],
		actions: [
			{
				type: actionsTypes.sq,
				content:
					"Vous avez tout perdu, vous ne découvriez jamais ce qu'il se cache dans ce village. [GAME OVER]",
				link: actionsTypes.sq,
			},
		],
	},
	sheriff: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.narrator,
				content: 'Notre personnage rentre dans le bureau du shérif.',
			},
			{
				speaker: dialogType.pnj,
				content:
					"Bonjour Billy Boy, je vois que tu t'es bien remis de la soirée d'hier ! Tu n'étais pas le plus frais quand je suis arrivé mettre fin à tout ce vacarme.",
			},
			{
				speaker: dialogType.self,
				content:
					"Bonjour Shérif, effectivement le rodéo s'est mieux passé que ce qu'on avait prévu, le président de la fédération a voulu graver la date dans le marbre ! Et ce qui n'était qu'un petit apéro a fini en grosse bringue.",
			},
			{
				speaker: dialogType.self,
				content:
					"Par contre, je ne suis pas vraiment venu te faire la causette. J'ai parlé à Joe à la taverne, et quelque chose cloche. Personne dans son bar, et il m'a dit de partir comme si j'étais son pire cauchemard.Quelque chose s'est passé ?",
			},
			{
				speaker: dialogType.pnj,
				content:
					"Joe peut avoir ses humeurs des fois, surtout quand j'interviens comme hier où il aurait pu avoir un joli paquet de billets en plus.",
			},
		],
		actions: [
			{
				type: actionsTypes.action,
				content:
					"Dire au shérif que vous devez vous en faire pour rien. Vous partez faire un tour vers l'épicerie.",
				link: 'epicerie',
			},
			{
				type: actionsTypes.action,
				content: 'Parler du fait que Joe avait un bandage à la main gauche.',
				link: 'sheriff_wound',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
	taverne_suzie: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.self,
				content:
					'(Chuchotte) Joe. Si il y a des oreilles qui trainent et qui dérangent, retrouve moi ce soir derrière chez Suzie, personne ne pourras nous écouter là bas.',
			},
			{
				speaker: dialogType.narrator,
				content: 'Joe reste muet, tout en vous regardant partir.',
			},
		],
		actions: [
			{
				type: actionsTypes.action,
				content: 'Vous allez voir suzie en attendant.',
				link: 'suzie',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
	taverne_close: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.self,
				content:
					"Joe. Hier soir nous étions en train de danser sur le comptoir de la taverne. Et cela ce n'est pas rien",
			},
			{
				speaker: dialogType.self,
				content:
					"(Chuchotte) Même si ça fait peu de temps que je suis là et que je te connais, je sais faire la différence entre quelqu'un qui ne veut pas me voir, et quelqu'un qui ment pour se protéger.",
			},
			{
				speaker: dialogType.narrator,
				content: 'Joe restait malheureusement muet, concentré sur sa vaisselle.',
			},
		],
		actions: [
			{
				type: actionsTypes.action,
				content: 'Suggérer à Joe de vous retrouver ce soir derrière chez la Suzie.',
				link: 'taverne_suzie',
			},
			{
				type: actionsTypes.action,
				content: "Vous n'insistez pas plus, vous allez sur la palier du bar.",
				link: 'sheriff',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
	taverne: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.self,
				content:
					"Salut Joe. Ton bar est étrangement vide, d'habitude à cette heure ci ça se bat pour commander, tu as un problème ?",
			},
			{
				speaker: dialogType.pnj,
				content:
					"Désolé, je ne peux pas te répondre Billy Boy. Tu n'est plus le bienvenu ici",
			},
		],
		actions: [
			{
				type: actionsTypes.action,
				content: 'Vous insistez et vous rapprochez du gérant de la taverne.',
				link: 'taverne_close',
			},
			{
				type: actionsTypes.action,
				content: "Allons voir le shérif, j'aurais peut être plus d'infos.",
				link: 'sheriff',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
	default: {
		type: actionsTypes.msg,
		content: [
			{
				speaker: dialogType.narrator,
				content: 'Vous arrivez dans la taverne du Ü Sadlü comme à votre habitude.',
			},
			{
				speaker: dialogType.narrator,
				content:
					"Cette fois ci quelque chose cloche, c'est un petit peu trop calme à votre goût...",
			},
		],
		actions: [
			{
				type: actionsTypes.room,
				content: 'Vous allez voir le gérant de la taverne',
				link: 'taverne',
			},
			{
				type: actionsTypes.sq,
				content: 'Enregistrer la partie ici je reviendrais plus tard.',
				link: actionsTypes.sq,
			},
		],
	},
};
async function main() {
	console.log(chalk.green('Seeding data...'));
	for (const [key, value] of Object.entries(dataStructure)) {
		await prisma.scene.create({
			data: {
				id: key,
				type: value.type,
				dialogs: {
					create: [
						...value.content.map((item) => ({
							speaker: item.speaker,
							content: item.content,
						})),
					],
				},
				actions: {
					create: [
						...value.actions.map((item) => ({
							type: item.type,
							content: item.content,
							link: {
								connect: {
									id: item.link,
								},
							},
						})),
					],
				},
			},
		});
	}
	console.log(chalk.green('✅ Data seeding finished with success!'));
}
await main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
