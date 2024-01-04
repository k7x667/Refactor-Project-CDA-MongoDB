import { actionsTypes } from "../type/actionsTypes";
import { dialogType } from "../type/dialogType";

export interface Scene {
    id: string;
    type: string;
    dialogs: Dialog[];
    actions: Action[];
}

export interface Dialog {
    speaker: dialogType;
    content: string;
}
  
export interface Action {
    type: actionsTypes;
    content: string;
    link: string;
}
