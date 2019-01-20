import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseSQL{
    theConsole: string = "Console Messages";

    options: any = {
        name: 'data.db',
        location: 'default',
        createFromLocation: 1
    }
   
    private db: SQLiteObject;
   
    constructor(private sqlite: SQLite) {
   
        this.connectToDb();
    }
    
    private connectToDb():void {
       
        this.sqlite.create(this.options)
            .then((db: SQLiteObject) => {
   
                this.db = db;
                var sql = 'create table IF NOT EXISTS `user` (username VARCHAR(255), password VARCHAR(255))';
                //IF you move the below statment out of here then the db variable will not be initialized
                //before you can use it to execute the SQL. 
                this.db.executeSql(sql, [])
                .then(() => this.theConsole += 'Executed SQL' + sql)
                .catch(e => this.theConsole += "Error: " + JSON.stringify(e));
            })
            .catch(e => this.theConsole += JSON.stringify(e));
        
    }
   
     addUser(username, password):void {
       
        var sql = "INSERT INTO `user` (username,password) VALUES ('"+username+"','"+ password+"')";
       
        this.db.executeSql(sql,[])
        .then(() => this.theConsole += "\n" + 'Executed SQL' + sql)
        .catch(e => this.theConsole += "Error: " + JSON.stringify(e));
    
         
    }
    getDealer() {
        var sql = "SELECT * FROM user";
        
        this.db.executeSql(sql, [])
            .then((result) => {
                this.theConsole += JSON.stringify(result);
                if (result.rows.length > 0) {
                    this.theConsole += 'Result' + result.rows.item(0);
                }
                this.theConsole += "\n" + result.rows.item(0).username+ result.rows.item(0).password;
                this.theConsole +=  "\n" +'Rows' + result.rows.length;
               
            })
   
            .catch(e => this.theConsole += JSON.stringify(e));
    }
   
    getConsoleMessages() {
        return this.theConsole;
    }
}