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

import { ProjetCreateAdminComponent } from './projet/create/projet-create-admin.component';
import { ProjetEditAdminComponent } from './projet/edit/projet-edit-admin.component';
import { ProjetViewAdminComponent } from './projet/view/projet-view-admin.component';
import { ProjetListAdminComponent } from './projet/list/projet-list-admin.component';
import { NroCreateAdminComponent } from './nro/create/nro-create-admin.component';
import { NroEditAdminComponent } from './nro/edit/nro-edit-admin.component';
import { NroViewAdminComponent } from './nro/view/nro-view-admin.component';
import { NroListAdminComponent } from './nro/list/nro-list-admin.component';

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

    ProjetCreateAdminComponent,
    ProjetListAdminComponent,
    ProjetViewAdminComponent,
    ProjetEditAdminComponent,
    NroCreateAdminComponent,
    NroListAdminComponent,
    NroViewAdminComponent,
    NroEditAdminComponent,
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
  ProjetCreateAdminComponent,
  ProjetListAdminComponent,
  ProjetViewAdminComponent,
  ProjetEditAdminComponent,
  NroCreateAdminComponent,
  NroListAdminComponent,
  NroViewAdminComponent,
  NroEditAdminComponent,
  ],
})
export class NroAdminModule { }
