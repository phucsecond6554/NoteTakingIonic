import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotebooksPage } from './notebooks';

@NgModule({
  declarations: [
    //NotebooksPage,
  ],
  imports: [
    IonicPageModule.forChild(NotebooksPage),
  ],
})
export class NotebooksPageModule {}
