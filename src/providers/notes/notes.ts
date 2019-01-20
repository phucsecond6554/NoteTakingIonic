import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {InitDbProvider} from '../init-db/init-db';
import { Injectable } from '@angular/core';
import {Note} from '../../note';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesProvider {
  isOpen = false;
  db: SQLiteObject;

  constructor(private sqlite: SQLite, private initDB: InitDbProvider) {
    console.log('Hello NotesProvider Provider');
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

  addNote(note : Note)
  {
    return new Promise((resolve, reject) => {
      var sql = `insert into 'notes'(nb_id, content, title) 
        values(?, ?, ?)`;
      this.db.executeSql(sql, [note.nb_id, note.content, note.title])
        .then((result) => {
          resolve({result:result, note: note, sql: sql});
        })
        .catch(e => {reject({result:e, note: note, sql: sql})})
    })
  }

  editNote(note: Note)
  {
    return new Promise((resolve, reject) => {
      var sql = 'update notes set title=?, content=? where id=?';

      this.db.executeSql(sql, [note.title, note.content, note.id])
        .then((result) => {
          resolve({state: 'success', result: result, note: note});
        })
        .catch(e => {
          reject({state: 'error', result: e, note:note})
        })
    })
  }

  getNote(noteid)
  {
    return new Promise((resolve, reject) => {
      var sql = 'select * from notes where id = ?';

      this.db.executeSql(sql, [noteid])
        .then(result => {
          if(result.rows.length <= 0)
            reject({state: 'success',sql: sql, noteid: noteid});
          else
          {
            var item = result.rows.item(0);

            resolve({state: 'success', item: item});
          }
        })
        .catch(e => {reject({state:'error', detail: e})}) 
    })
  }

  showNotesOf(nb_id)
  {
    return new Promise((resolve, reject)=>{
      var sql = `select * from notes where nb_id=?`;

      this.db.executeSql(sql, [nb_id])
        .then((result) => {
          var list = [];

          for(let i = 0 ; i < result.rows.length; i++)
          {
            let item = result.rows.item(i);
            list.push(item);
          }

          resolve({list: list, state: 'success', result:result, nb_id:nb_id})
        })
        .catch(e => {reject({state:'error',result:e, nb_id: nb_id, sql: sql})})
    })
  }

  showAllNotes()
  {
    return new Promise((resolve, reject) => {
      var sql = 'select * from `notes` order by `create_time` desc';

      this.db.executeSql(sql, [])
        .then((result) => {
          var list = [];

          for(let i = 0 ; i < result.rows.length; i++)
          {
            let item = result.rows.item(i);
            list.push(item);
          }

          resolve({state: 'success', list: list});
        })
        .catch(e => {reject(e)});
    })
  }

}
