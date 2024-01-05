import { actionsTypes } from "../type/actionsTypes";

export interface ActionInterface {
    type: actionsTypes;
    content: string;
    link: string;
}