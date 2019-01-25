import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController, ActionSheetController} from 'ionic-angular';

import {NotesPage} from '../notes/notes';
//import {Notebook} from '../../notebook';
import {NotebooksProvider} from '../../providers/notebooks/notebooks';

/**
 * Generated class for the NotebooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notebooks',
  templateUrl: 'notebooks.html',
})
export class NotebooksPage {
  list : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public sqlite: NotebooksProvider,
  public alertCtr : AlertController,
  public actionSheetCtr : ActionSheetController) {

    this.sqlite.getConnect()
      .then(() => {
        this.sqlite.getAllNotebooks()
          .then((result) => {
            this.list = result;
          })
          .catch(e=> {
            this.showAlert(JSON.stringify(e));
          })
      })
      .catch(e => this.showAlert(JSON.stringify(e)));
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

  showAllNotebooks()
  {
    this.sqlite.getAllNotebooks()
      .then((result) => {
        this.list = result;        
      })
      .catch(e=> {
        this.showAlert(JSON.stringify(e));
      })
  }

  addNotebook()
  {
    const prompt = this.alertCtr.create({
      title : 'Notebook title',
      message : 'Please enter a name for this notebook',
      inputs: [
        {
          name : 'nb_name',
          placeholder : 'Notebook Name'
        }
      ],
      buttons: [
        {
          text : 'Cancel',
          handler: data => {console.log('Cancel Clicked')}
        },
        {
          text: 'Ok',
          handler : data => {
            this.sqlite.addNotebook(data.nb_name)
              .then(() => {this.showAllNotebooks()})
              .catch(e => this.showAlert(JSON.stringify(e)));
          }
        }
      ]
    });

    prompt.present();
  }

  openNotebook(nb_id : number)
  {
    //console.log(nb_id);
    this.navCtrl.push(NotesPage,{nb_id : nb_id})
  }

  deleteNotebook(nb_id)
  {
    this.sqlite.deleteNotebook(nb_id)
      .then((result) => {
        //this.showAlert(JSON.stringify(result));
        this.showAllNotebooks();
      })
      .catch(e => {this.showAlert(JSON.stringify(e))})
  }

  renameNotebook(nb_id)
  {
    const prompt = this.alertCtr.create({
      title : 'Notebook new name',
      message : 'Please enter a new name for this notebook',
      inputs: [
        {
          name : 'nb_name',
          placeholder : 'Notebook Name'
        }
      ],
      buttons: [
        {
          text : 'Cancel',
          handler: data => {console.log('Cancel Clicked')}
        },
        {
          text: 'Ok',
          handler : data => {
            this.sqlite.renameNotebook(nb_id,data.nb_name)
              .then(() => {this.showAllNotebooks()})
              .catch(e => this.showAlert(JSON.stringify(e)));
          }
        }
      ]
    });

    prompt.present();
  }

  openMoreOption(notebook)
  {
    const actionSheet = this.actionSheetCtr.create({
      title: `Edit ${notebook.nb_name}`,
      buttons : [
        {
          text : 'Delete',
          icon: 'trash',
          handler : () =>{
            this.deleteNotebook(notebook.id)
          }         
        },
        {
          text: 'Rename',
          icon : 'create',
          handler : () => {
            this.renameNotebook(notebook.id);
          }
        }
      ]
    })

    actionSheet.present();
  }

  ionViewDidLoad() {
    
  }

}

