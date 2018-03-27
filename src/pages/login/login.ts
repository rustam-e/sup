import { WaitlistPage, MeetSomebodyPage, PrelaunchPage } from "../pages";
import {
	UserService,
	AuthService,
	UtilService
} from "./../../services/services";
import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
@Component({
	selector: "page-login",
	templateUrl: "login.html"
})
export class LoginPage {
	loader: any;
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public utilService: UtilService,
		public authSrvc: AuthService,
		public userSrvc: UserService
	) {}
	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}
	goToMeetSomebody() {
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	goToPrelaunchPage() {
		this.navCtrl.setRoot(PrelaunchPage);
	}
	facebookLogin(): void {
		var env = this;
		this.authSrvc.signInWithFacebook().then(
			authData => {
				this.loader.dismiss().then(() => {
					this.userSrvc.setAccessToken(authData["credential"].accessToken);
					//should be after the user has been set
					this.userSrvc
						.setCurrentUser(authData["user"]["providerData"][0])
						.then(() => env.goToMeetSomebody());
				});
			},
			error =>
				this.loader.dismiss().then(() => {
					console.error("login failed: ", error);
					this.utilService.doAlert(error.message, {
						text: "Ok",
						role: "cancel"
					});
				})
		);
		this.presentLoading();
	}
	presentLoading() {
		this.loader = this.loadingCtrl.create({
			content: "Authenticating..."
		});
		this.loader.present();
	}
}
