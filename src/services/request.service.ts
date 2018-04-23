import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User, Request } from "../models/models";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";
import { UtilService } from "./services";

@Injectable()
export class RequestService {
	private requests: Request[];
	private utilSrvc: UtilService;
	constructor(private afs: AngularFirestore) {
		this.requests = [];
	}
	// Get an object from Firestore by its path. For eg: firestore.get('users/' + userId) to get a user object.
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(resolve => {
			resolve(this.afs.doc(path));
		});
	}
	getReceivedRequests(id: string): AngularFirestoreCollection<Request> {
		return this.afs.collection("users/" + id + "/requestsReceived");
	}
	updateRequestSeen(requestId: string, userId: string) {
		//add the id to the seen in the backend
	}
	acceptFriendRequest(id: string) {
		/* make sure this is async method that returns
		a success or failure that prompts a relevant
		alert in the caller's UI
		1. [ ] add to each others’ contacts list
		2. [ ] create a new chatroom
		3. [ ] add to relationships list/collection
		4. [ ] remove from this user's receivedrequests list
    5. [ ] remove from the other user's sent requests list
		*/
		console.error(
			"acceptFriendRequest method in user service called, but has not been implemented yet"
		);
	}
	rejectFriendRequest(id: string) {
		/*
		1. [ ] remove from this user's receivedrequests list
    2. [ ] remove from the other user's sent requests list
		*/
		console.error(
			"rejectFriendRequest method in user service called, but has not been implemented yet"
		);
	}

	sendRequest(from: string, to: string) {
		let newRequest = {
			id: this.utilSrvc.uniqueRelId(from, to),
			date: new Date(),
			seen: [],
			senderId: from,
			toUserId: to
		};
		return new Promise((resolve, reject) => {
			this.get("users/" + from)
				.then(ref => {
					ref
						.valueChanges()
						.take(1)
						.subscribe((user: User) => {
							if (!user.requestsSent) {
								user.requestsSent = [newRequest];
							} else {
								if (
									this.utilSrvc.finInstance(user.requestsSent, newRequest) == -1
								) {
									user.requestsSent.push(newRequest);
								}
							}
							ref
								.update({
									requestsSent: user.requestsSent
								})
								.then(() => {
									this.get("users/" + to)
										.then(ref => {
											ref
												.valueChanges()
												.take(1)
												.subscribe((user: User) => {
													if (!user.requestsReceived) {
														user.requestsReceived = [newRequest];
													} else {
														if (
															this.utilSrvc.finInstance(
																user.requestsReceived,
																newRequest
															) == -1
														) {
															user.requestsReceived.push(newRequest);
														}
													}
													ref
														.update({
															requestsReceived: user.requestsReceived
														})
														.then(() => {
															resolve();
														})
														.catch(() => {
															reject();
														});
												});
										})
										.catch(() => {
											reject();
										});
								})
								.catch(() => {
									reject();
								});
						});
				})
				.catch(() => {
					reject();
				});
		});
	}
	removeRequest(id: string) {
		/*
		1. [ ] remove from this user's receivedrequests list
		2. [ ] remove from the other user's sent requests list
		*/
		console.error(
			"removeRequest method in user service called, but has not been implemented yet"
		);
	}
	block(id: string) {
		/*
		2. [ ] set the relations collection
		3. [ ] remove from contacts if he’s there
		4. [ ] kick the user out of the chatroom and tell him he was kicked out
		*/
		console.error(
			"block method in user service called, but has not been implemented yet"
		);
	}
	unblock(id: string) {
		/*
			1. [ ] set it back to null, without adding the false
			2. [ ] remove from blocked list
		*/
		console.error(
			"unblock method in user service called, but has not been implemented yet"
		);
	}
	hasLiked(fromId: string, toId: string) {
		// check the relationship whether current user is set to true or not while the other is not
	}
}
