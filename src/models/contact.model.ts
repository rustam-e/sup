import { Message } from "./models";

export interface Contact {
	id: string;
	createdAt: string;
	imgUrl: string;
	lastMessage: Message;
	name: string;
}