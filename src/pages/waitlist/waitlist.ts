import { Component } from '@angular/core';
import { NavController, LoadingController, App, NavParams } from 'ionic-angular';
import {FilterPage} from '../pages';
import {VIPPage} from '../pages';
import {ChatroomPage} from '../pages';
import {ChatroomService} from '../../services/services';
import {Chatroom} from '../../models/models';
@Component({
  selector: 'page-waitlist',
  templateUrl: 'waitlist.html'
})
export class WaitlistPage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public chatroomSrvc: ChatroomService,
    public navParams: NavParams,
    public app: App) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetSomebodyPage');
  }
  ionViewDidEnter(){
    // get location property
    // TO DO
    let location = '';
    // get languages property
    let languages = this.navParams.get('languages');
    // join a chatroom
    this.chatroomSrvc.joinChatroom(location, languages)
    .subscribe(chatroomId => {
      let view = this.navCtrl.getActive();
      if(view.component.name === "WaitlistPage"){
        this.goToChatroom(chatroomId);
      }
    });
  }
  viewVIP(){
    this.navCtrl.push(VIPPage);
  }
  // view notifications
  viewFilter() {
    this.app.getRootNav().push(FilterPage);
  }
  goToChatroom(chatroomId: string){
    this.navCtrl.push(ChatroomPage, {room: `${chatroomId}`});
  }
  back(){
    this.navCtrl.pop();
  }
}
