import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {UserProfilePage} from '../pages';
import {FilterPage} from '../pages';
import {VIPPage} from '../pages';
import {ChatroomPage} from '../pages';
import {WaitlistPage} from '../pages';

@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  private languages;
  private numberInFront: number = 5;
  private numberBehind: number = 15;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetSomebodyPage');
  }
  goToWaitlist(){
    this.navCtrl.push(WaitlistPage)
  }
}
