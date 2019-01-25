import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotesProvider} from '../../providers/notes/notes';
import {AlertController} from 'ionic-angular';


import {NoteeditorPage} from '../noteeditor/noteeditor';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  nb_id: any = null;
  list : any;

  constructor(public navCtrl: NavController
    , public navParams: NavParams,
     private sqlite: NotesProvider,
     private alertCtr: AlertController
    ) {
    this.nb_id = navParams.get('nb_id');
  }

  showAlert(alert:string)
  {
    const alertNoti = this.alertCtr.create({
      title : 'Thông báo',
      subTitle : alert,
      buttons : ['Ok']
    });

    alertNoti.present();
  }

  addNewNote()
  {
    //this.showAlert('ABC');
    this.navCtrl.push(NoteeditorPage,{nb_id : this.nb_id, mode: 'create'})
  }

  openNote(note_id)
  {
    this.navCtrl.push(NoteeditorPage, {note_id: note_id, mode:'modify'})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  ionViewDidEnter()
  {   
    this.sqlite.getConnect()   
      .then(() => {
        if(this.nb_id != undefined && this.nb_id != 'undefined')
        {
          this.sqlite.showNotesOf(this.nb_id)
          .then((result:any) => {
            this.list = result.list;
            //this.showAlert(JSON.stringify(result));
          })
          .catch(e=>{this.showAlert(JSON.stringify(e))});
        }else{
          this.sqlite.showAllNotes()
          .then((result: any) =>{
            this.list = result.list;
          })
          .catch(e => {this.showAlert(JSON.stringify(e))})
        }
      })
      .catch(e => {JSON.stringify(e)})
  }

}
