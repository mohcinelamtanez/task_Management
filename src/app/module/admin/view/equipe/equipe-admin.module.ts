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

import { MembreEquipeCreateAdminComponent } from './membre-equipe/create/membre-equipe-create-admin.component';
import { MembreEquipeEditAdminComponent } from './membre-equipe/edit/membre-equipe-edit-admin.component';
import { MembreEquipeViewAdminComponent } from './membre-equipe/view/membre-equipe-view-admin.component';
import { MembreEquipeListAdminComponent } from './membre-equipe/list/membre-equipe-list-admin.component';
import { EquipeCreateAdminComponent } from './equipe/create/equipe-create-admin.component';
import { EquipeEditAdminComponent } from './equipe/edit/equipe-edit-admin.component';
import { EquipeViewAdminComponent } from './equipe/view/equipe-view-admin.component';
import { EquipeListAdminComponent } from './equipe/list/equipe-list-admin.component';
import { TypeEquipeCreateAdminComponent } from './type-equipe/create/type-equipe-create-admin.component';
import { TypeEquipeEditAdminComponent } from './type-equipe/edit/type-equipe-edit-admin.component';
import { TypeEquipeViewAdminComponent } from './type-equipe/view/type-equipe-view-admin.component';
import { TypeEquipeListAdminComponent } from './type-equipe/list/type-equipe-list-admin.component';

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

    MembreEquipeCreateAdminComponent,
    MembreEquipeListAdminComponent,
    MembreEquipeViewAdminComponent,
    MembreEquipeEditAdminComponent,
    EquipeCreateAdminComponent,
    EquipeListAdminComponent,
    EquipeViewAdminComponent,
    EquipeEditAdminComponent,
    TypeEquipeCreateAdminComponent,
    TypeEquipeListAdminComponent,
    TypeEquipeViewAdminComponent,
    TypeEquipeEditAdminComponent,
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
  MembreEquipeCreateAdminComponent,
  MembreEquipeListAdminComponent,
  MembreEquipeViewAdminComponent,
  MembreEquipeEditAdminComponent,
  EquipeCreateAdminComponent,
  EquipeListAdminComponent,
  EquipeViewAdminComponent,
  EquipeEditAdminComponent,
  TypeEquipeCreateAdminComponent,
  TypeEquipeListAdminComponent,
  TypeEquipeViewAdminComponent,
  TypeEquipeEditAdminComponent,
  ],
})
export class EquipeAdminModule { }
