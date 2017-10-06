import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {UserProfilePage} from '../pages';
import {FilterPage} from '../pages';
import {VIPPage} from '../pages';
import {ChatroomPage} from '../pages';

@Component({
  selector: 'page-waitlist',
  templateUrl: 'waitlist.html'
})
export class WaitlistPage {
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
  ionViewDidEnter(){
    setTimeout(() => {
      let view = this.navCtrl.getActive();
      if(view.component.name === "WaitlistPage"){
        this.goToChatroom();        
      }
    },1800);
  }
  viewVIP(){
    this.navCtrl.push(VIPPage);
  }
  // view notifications
  viewFilter() {
    this.app.getRootNav().push(FilterPage);
  }
  goToChatroom(){
    this.navCtrl.push(ChatroomPage)
  }
}
