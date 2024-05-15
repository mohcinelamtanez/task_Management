import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from "primeng/editor";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";

import { TacheCreateAdminComponent } from './tache/create/tache-create-admin.component';
import { TacheEditAdminComponent } from './tache/edit/tache-edit-admin.component';
import { TacheViewAdminComponent } from './tache/view/tache-view-admin.component';
import { TacheListAdminComponent } from './tache/list/tache-list-admin.component';
import { TypeTacheCreateAdminComponent } from './type-tache/create/type-tache-create-admin.component';
import { TypeTacheEditAdminComponent } from './type-tache/edit/type-tache-edit-admin.component';
import { TypeTacheViewAdminComponent } from './type-tache/view/type-tache-view-admin.component';
import { TypeTacheListAdminComponent } from './type-tache/list/type-tache-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [

    TacheCreateAdminComponent,
    TacheListAdminComponent,
    TacheViewAdminComponent,
    TacheEditAdminComponent,
    TypeTacheCreateAdminComponent,
    TypeTacheListAdminComponent,
    TypeTacheViewAdminComponent,
    TypeTacheEditAdminComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
    PaginatorModule,
    TranslateModule,
    FileUploadModule,
    FullCalendarModule,
    CardModule,
    EditorModule,


  ],
  exports: [
  TacheCreateAdminComponent,
  TacheListAdminComponent,
  TacheViewAdminComponent,
  TacheEditAdminComponent,
  TypeTacheCreateAdminComponent,
  TypeTacheListAdminComponent,
  TypeTacheViewAdminComponent,
  TypeTacheEditAdminComponent,
  ],
})
export class TacheAdminModule { }
