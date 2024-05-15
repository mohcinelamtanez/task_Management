import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import { TacheAdminModule } from './view/tache/tache-admin.module';
import { TacheAdminRoutingModule } from './view/tache/tache-admin-routing.module';
import { NroAdminModule } from './view/nro/nro-admin.module';
import { NroAdminRoutingModule } from './view/nro/nro-admin-routing.module';
import { CommunAdminModule } from './view/commun/commun-admin.module';
import { CommunAdminRoutingModule } from './view/commun/commun-admin-routing.module';
import { EquipeAdminModule } from './view/equipe/equipe-admin.module';
import { EquipeAdminRoutingModule } from './view/equipe/equipe-admin-routing.module';
import { SroAdminModule } from './view/sro/sro-admin.module';
import { SroAdminRoutingModule } from './view/sro/sro-admin-routing.module';

import {SecurityModule} from 'src/app/module/security/security.module';
import {SecurityRoutingModule} from 'src/app/module/security/security-routing.module';


@NgModule({
  declarations: [
   LoginAdminComponent,
   RegisterAdminComponent
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
  TacheAdminModule,
  TacheAdminRoutingModule,
  NroAdminModule,
  NroAdminRoutingModule,
  CommunAdminModule,
  CommunAdminRoutingModule,
  EquipeAdminModule,
  EquipeAdminRoutingModule,
  SroAdminModule,
  SroAdminRoutingModule,
  SecurityModule,
  SecurityRoutingModule
  ],
  exports: [
  LoginAdminComponent,
  RegisterAdminComponent,

    TacheAdminModule,
    NroAdminModule,
    CommunAdminModule,
    EquipeAdminModule,
    SroAdminModule,
  SecurityModule
  ],

})
export class AdminModule { }
