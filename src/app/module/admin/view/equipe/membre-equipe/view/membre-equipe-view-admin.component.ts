import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


import {MembreEquipeAdminService} from 'src/app/shared/service/admin/equipe/MembreEquipeAdmin.service';
import {MembreEquipeDto} from 'src/app/shared/model/equipe/MembreEquipe.model';
import {MembreEquipeCriteria} from 'src/app/shared/criteria/equipe/MembreEquipeCriteria.model';

import {CollaboratorDto} from 'src/app/shared/model/commun/Collaborator.model';
import {CollaboratorAdminService} from 'src/app/shared/service/admin/commun/CollaboratorAdmin.service';
import {EquipeDto} from 'src/app/shared/model/equipe/Equipe.model';
import {EquipeAdminService} from 'src/app/shared/service/admin/equipe/EquipeAdmin.service';
import {GradDto} from 'src/app/shared/model/commun/Grad.model';
import {GradAdminService} from 'src/app/shared/service/admin/commun/GradAdmin.service';
@Component({
  selector: 'app-membre-equipe-view-admin',
  templateUrl: './membre-equipe-view-admin.component.html'
})
export class MembreEquipeViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: MembreEquipeAdminService, private collaboratorService: CollaboratorAdminService, private equipeService: EquipeAdminService, private gradService: GradAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get grad(): GradDto {
        return this.gradService.item;
    }
    set grad(value: GradDto) {
        this.gradService.item = value;
    }
    get grads(): Array<GradDto> {
        return this.gradService.items;
    }
    set grads(value: Array<GradDto>) {
        this.gradService.items = value;
    }
    get equipe(): EquipeDto {
        return this.equipeService.item;
    }
    set equipe(value: EquipeDto) {
        this.equipeService.item = value;
    }
    get equipes(): Array<EquipeDto> {
        return this.equipeService.items;
    }
    set equipes(value: Array<EquipeDto>) {
        this.equipeService.items = value;
    }
    get collaborator(): CollaboratorDto {
        return this.collaboratorService.item;
    }
    set collaborator(value: CollaboratorDto) {
        this.collaboratorService.item = value;
    }
    get collaborators(): Array<CollaboratorDto> {
        return this.collaboratorService.items;
    }
    set collaborators(value: Array<CollaboratorDto>) {
        this.collaboratorService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<MembreEquipeDto> {
        return this.service.items;
    }

    set items(value: Array<MembreEquipeDto>) {
        this.service.items = value;
    }

    get item(): MembreEquipeDto {
        return this.service.item;
    }

    set item(value: MembreEquipeDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): MembreEquipeCriteria {
        return this.service.criteria;
    }

    set criteria(value: MembreEquipeCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
