import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {InitDbProvider} from '../init-db/init-db';

/*
  Generated class for the NotebooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotebooksProvider {
  private db : SQLiteObject;
  isOpen = false;

  constructor(private sqlite: SQLite, private initDB: InitDbProvider) {
    console.log('Hello NotebooksProvider Provider');
    this.getConnect();
  }

  getConnect()
  {
    return new Promise((resolve, reject) => {
      if(this.isOpen)
        resolve(this.isOpen);
      else{
        this.initDB.createDB()
          .then(() => {
            this.sqlite.create({
              name:'notetaking.db',
              location: 'default'
            })
              .then((db: SQLiteObject) => {
                this.db = db;
                this.isOpen = true;
                resolve(this.isOpen);
              })
              .catch(e => reject(JSON.stringify(e)))
          })
          .catch(e => reject(e))
      }
    })
  }

  // Them so tay moi
  addNotebook(nb_name : string)
  {
    return new Promise((resolve, reject) =>{
      var sql = `insert into 'notebooks'(nb_name) values('${nb_name}')`;

      this.db.executeSql(sql, [])
        .then(()=>{
          resolve({state: 'success'});
        })
        .catch(e => {
          reject({state: 'error' , detail: e})
        })
    });
  }

  // Lay toan bo so tay
  getAllNotebooks()
  {
    return new Promise((resolve, reject) => {     
      var sql = 'Select * from `notebooks` order by create_time desc';
      this.db.executeSql(sql, [])
        .then(result =>{
          var notebooks_list = [];

          for(let i = 0 ; i < result.rows.length; i++)
          {
            let item = result.rows.item(i);
            notebooks_list.push(item);
          }

          resolve(notebooks_list);
        })
        .catch(e =>{
          reject(e);
        })
    })
  }

  // Xoa so tay
  deleteNotebook(nb_id)
  {
    return new Promise((resolve, reject) => {
      var sql = `delete from 'notes' where nb_id = ?`;

      this.db.executeSql(sql, [nb_id])
        .then(() => {
          var sql2 = `delete from 'notebooks' where id= ?`;

          this.db.executeSql(sql2 , [nb_id])
            .then((result) => {resolve({rows: result})})
            .catch(e => {reject({e: e, Sql1: sql, sql2:sql2, nb_id: nb_id})})
        })
        .catch((e) => {reject({e: e, Sql1: sql, nb_id: nb_id})})
    })
  }

  // Doi ten so tay
  renameNotebook(nb_id, newName)
  {
    return new Promise((resolve, reject) => {
      var sql = `update 'notebooks' set nb_name = '${newName}' where id=${nb_id}`;

      this.db.executeSql(sql, [])
        .then(() => {resolve('Ok')})
        .catch(e => {reject(e)})
    })
  }

}
