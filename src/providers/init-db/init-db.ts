import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Platform} from 'ionic-angular';
/*
  Generated class for the InitDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InitDbProvider {
  db : SQLiteObject;

  constructor(public sqlite : SQLite, public platform : Platform) {
    console.log('Hello InitDbProvider Provider');
   
  }

  createDB()
  {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
          this.sqlite.create({
            name : 'notetaking.db',
            location: 'default'
          })
          .then((db : SQLiteObject) => {
              this.db = db; 
              var sql = `create table if not exists 'notebooks'(
                id INTEGER PRIMARY KEY, 
                nb_name varchar(255), 
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )`;

              this.db.executeSql(sql, [])
                .then(() => {
                  sql = `create table if not exists 'notes'(
                    id INTEGER PRIMARY KEY, 
                    nb_id INTEGER,
                    title varchar(255),
                    content text, 
                    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_notebook
                    FOREIGN KEY (nb_id)
                    REFERENCES notebooks(id)
                  )`;

                  this.db.executeSql(sql, [])
                    .then(() => resolve('Ok'))
                    .catch(e => {reject(e)})
                })
                .catch(e => {reject(e)})
          })
          .catch(e => {
            reject(e);
          })
      })
    })
  }

  createNotebooksTable()
  {
    return new Promise((resolve, reject) => {
      var sql1 = `create table if not exists 'notebooks'(
        id INTEGER PRIMARY KEY, 
        nb_name varchar(255), 
        create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

      this.db.executeSql(sql1, [])
        .then(() => {
          resolve('Ok');
        })
        .catch(e => {reject(e)});
    });
  }

  createNotesTable()
  {
    return new Promise((resolve, reject) => {
      var sql2 = `create table if not exists 'notes'(
        id INTEGER PRIMARY KEY, 
        nb_id INTEGER,
        content text, 
        create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_notebook
        FOREIGN KEY (nb_id)
        REFERENCES notebooks(id)
      )
      `;

      this.db.executeSql(sql2, [])
        .then(() => {
          resolve('Ok')
        })
        .catch(e => {reject(e)})
    })
  }

}
