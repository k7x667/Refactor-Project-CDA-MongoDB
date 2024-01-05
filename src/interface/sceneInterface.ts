import { ActionInterface } from "./actionInterface";
import { DialogInterface } from "./dialogInterface";

export interface Scene {
    id: string;
    type: string;
    dialogs: DialogInterface[];
    actions: ActionInterface[];
}