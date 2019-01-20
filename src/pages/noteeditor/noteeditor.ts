import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Note} from '../../note';
import {NotesProvider} from '../../providers/notes/notes';
import {AlertController} from 'ionic-angular';

/**
 * Generated class for the NoteeditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noteeditor',
  templateUrl: 'noteeditor.html',
})
export class NoteeditorPage {
  notedata: Note = {
    id: -1,
    nb_id: -1,
    title : '',
    content: '',
    create_time : ''
  };

  mode: string; // Mode tao moi, khac voi modify
  saved: boolean;

  note_id = -1; // Bien nay dung de hien thi note duoc chon (Note id)

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlite: NotesProvider,
    public alertCtr : AlertController) {     
      this.mode = this.navParams.get('mode');

      if(this.mode == 'create')
      {
        this.saved = false;
        this.notedata.nb_id = this.navParams.get('nb_id');
      }
      else if(this.mode == 'modify')
      {
        this.saved = true;
        this.note_id = this.navParams.get('note_id');

        this.sqlite.getNote(this.note_id)
          .then((result: any) => {
            this.notedata = result.item;

            //this.showAlert(JSON.stringify(result));
          })
          .catch(e => {this.showAlert(JSON.stringify(e))})
      }
  }

  onChange()
  {
    this.saved = false;
  }

  saveNote()
  {
    if(this.mode == 'create')
    {
      this.sqlite.addNote(this.notedata)
      .then((result) => {
        //this.showAlert(JSON.stringify(result));
        this.saved = true;
      })
      .catch(e => {this.showAlert(JSON.stringify(e))})
    }
    else if(this.mode == 'modify')
    {
      this.sqlite.editNote(this.notedata)
        .then(result => {
          //this.showAlert(JSON.stringify(result));
          this.saved = true;
        })
        .catch(e => {this.showAlert(JSON.stringify(e))})
    }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteeditorPage');
  }

}
