import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {AlertController} from 'ionic-angular';

import {HeroProvider} from '../../providers/hero/hero';


/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  db : SQLiteObject;
  nb_list:any;

  nb_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtr : AlertController,
    public sqlite : HeroProvider
  ) {

  }

  showAlert(alert:string)
  {
    const alertNoti = this.alertCtr.create({
      title : 'Gì cũng dc',
      subTitle : alert,
      buttons : ['Ok']
    });

    alertNoti.present();
  }

  addNotebook(){
    this.sqlite.addNotebook(this.nb_name)
      .then(result => {
        if(result)
          this.showAlert('Thanh cong');
      })
      .catch(err =>{
        this.showAlert(err);
      })
  }

  showNotebooks(){
    this.sqlite.showNotebooks()
      .then(result => {
        this.nb_list = result;
        this.showAlert(JSON.stringify(result));
      })
      .catch(e =>{
        this.showAlert(e);
      })
  }

  // Ket noi database
  /*getConnect()
  {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((result : SQLiteObject) => {
      this.db = result;
      var sql = 'create table if not exists `testtable`(username varchar(23))';
      
      this.db.executeSql(sql, [])
        .then(() =>{
          this.showAlert('Thanh cong');         
        })
        .catch(e => {
          this.showAlert(JSON.stringify(e));
        })

    })
    .catch(e => {
      this.showAlert(JSON.stringify(e));
    })
  }

  getConnVariable()
  {
    return new Promise((resovle, reject) => {
      this.sqlite.create({
        name : 'data.db',
        location : 'default'
      })
      .then((db: SQLiteObject) => {
        resovle(db);
      })
      .catch(e => {
        reject(e);
      })
    })
  }

  addUser()
  {
    console.log('abc');
    
    this.getConnVariable()
      .then((db:SQLiteObject) => {
        var sql = `insert into 'testtable' values('${this.user}')`;

        console.log(this.user);

        db.executeSql(sql, [])
          .then(() => {
            this.showAlert('Thanh cong');
          })
          .catch(e =>{
            this.showAlert(JSON.stringify(e));
          })
      })
      .catch(e =>{
        console.log(e);
        this.showAlert(JSON.stringify(e))
      })
  }

  showUsers()
  {
    var sql = 'select * from `testtable`';

    this.getConnVariable()
      .then((db: SQLiteObject) => {
        db.executeSql(sql, [])
        .then(result =>{          
          this.showAlert(JSON.stringify(result));

          for(var i = 0 ; i < result.rows.length; i++)
          {
            let item = result.rows.item(i);
            this.list.push(item);
          }
        })
        .catch(e =>{
          this.showAlert(JSON.stringify(e));
        })
      })
      .catch(e=>{
        this.showAlert(JSON.stringify(e));
      })
  }*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    //this.showNotebooks();
  }

  ionViewDidEnter()
  {
    this.sqlite.showNotebooks()
      .then(result => {
        this.nb_list = result;
        this.showAlert(JSON.stringify(result));
      })
      .catch(e =>{
        this.showAlert(e);
      })
  }

}
