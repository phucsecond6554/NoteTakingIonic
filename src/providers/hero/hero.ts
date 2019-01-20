import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';

/*
  Generated class for the HeroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HeroProvider {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    console.log('Hello HeroProvider Provider');
    this.getConnect();
  }

  getConnect(): void{
    this.sqlite.create({
      name: 'note_taking_app.db',
      location:'default'
    })
      .then((db:SQLiteObject) => {
        this.db = db;

        var sql = `create table if not exists 'notebooks'(
          id INTEGER PRIMARY KEY, 
          nb_name varchar(255), 
          create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        db.executeSql(sql, [])
          .then(() => {
            this.createNotesTable(db);
            console.log('OK');
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
          })
      })
  }

  createNotesTable(db: SQLiteObject) : void
  {
    var sql = `create table 'notes'(
      id INTEGER PRIMARY KEY, 
      nb_id INTEGER,
      content text, 
      create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_notebook
      FOREIGN KEY (nb_id)
      REFERENCES notebooks(id)
    )
    `;

    db.executeSql(sql, [])
      .then(() => {
        console.log('OK');
      })
      .catch((e) =>{
        console.log(JSON.stringify(e));
      })
  }

  addNotebook(nb_name: string)
  {
    return new Promise((resolve, reject) => {
      var sql = `insert into notebooks(nb_name) values('${nb_name}')`;

      this.db.executeSql(sql, [])
        .then(()=>{
          resolve(true);
        })
        .catch((e) => {
          reject(JSON.stringify(e))
        })
    })
  }

  showNotebooks()
  {
    return new Promise((resolve, reject) =>{
      var sql = 'select * from notebooks';

      this.db.executeSql(sql, [])
        .then((result) =>{
          let list = [];

          for(var i = 0 ; i < result.rows.length; i++)
          {
            let item = result.rows.item(i);
            list.push(item);
          }

          resolve(list);
        })
        .catch(e =>{
          reject(JSON.stringify(e));
        })
    });
  }


}
