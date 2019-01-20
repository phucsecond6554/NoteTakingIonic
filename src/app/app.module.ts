import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SQLite} from '@ionic-native/sqlite';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {NotebooksPage} from '../pages/notebooks/notebooks';
import {NotesPage} from '../pages/notes/notes';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeroProvider } from '../providers/hero/hero';
import { InitDbProvider } from '../providers/init-db/init-db';
import { NotebooksProvider } from '../providers/notebooks/notebooks';
import { NotesProvider } from '../providers/notes/notes';
import { NoteeditorPage } from '../pages/noteeditor/noteeditor';

@NgModule({
  declarations: [
    MyApp,
    NotebooksPage,
    NotesPage,
    NoteeditorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotebooksPage,
    NotesPage,
    NoteeditorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeroProvider,
    SQLite,
    InitDbProvider,
    NotebooksProvider,
    NotesProvider
  ]
})
export class AppModule {}
