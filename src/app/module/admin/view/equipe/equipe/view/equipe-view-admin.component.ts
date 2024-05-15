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


import {EquipeAdminService} from 'src/app/shared/service/admin/equipe/EquipeAdmin.service';
import {EquipeDto} from 'src/app/shared/model/equipe/Equipe.model';
import {EquipeCriteria} from 'src/app/shared/criteria/equipe/EquipeCriteria.model';

import {CollaboratorDto} from 'src/app/shared/model/commun/Collaborator.model';
import {CollaboratorAdminService} from 'src/app/shared/service/admin/commun/CollaboratorAdmin.service';
import {TypeEquipeDto} from 'src/app/shared/model/equipe/TypeEquipe.model';
import {TypeEquipeAdminService} from 'src/app/shared/service/admin/equipe/TypeEquipeAdmin.service';
import {GradDto} from 'src/app/shared/model/commun/Grad.model';
import {GradAdminService} from 'src/app/shared/service/admin/commun/GradAdmin.service';
import {MembreEquipeDto} from 'src/app/shared/model/equipe/MembreEquipe.model';
import {MembreEquipeAdminService} from 'src/app/shared/service/admin/equipe/MembreEquipeAdmin.service';
@Component({
  selector: 'app-equipe-view-admin',
  templateUrl: './equipe-view-admin.component.html'
})
export class EquipeViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    membreEquipes = new MembreEquipeDto();
    membreEquipess: Array<MembreEquipeDto> = [];

    constructor(private service: EquipeAdminService, private collaboratorService: CollaboratorAdminService, private typeEquipeService: TypeEquipeAdminService, private gradService: GradAdminService, private membreEquipeService: MembreEquipeAdminService){
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
    get typeEquipe(): TypeEquipeDto {
        return this.typeEquipeService.item;
    }
    set typeEquipe(value: TypeEquipeDto) {
        this.typeEquipeService.item = value;
    }
    get typeEquipes(): Array<TypeEquipeDto> {
        return this.typeEquipeService.items;
    }
    set typeEquipes(value: Array<TypeEquipeDto>) {
        this.typeEquipeService.items = value;
    }
    get chefEquipe(): CollaboratorDto {
        return this.collaboratorService.item;
    }
    set chefEquipe(value: CollaboratorDto) {
        this.collaboratorService.item = value;
    }
    get chefEquipes(): Array<CollaboratorDto> {
        return this.collaboratorService.items;
    }
    set chefEquipes(value: Array<CollaboratorDto>) {
        this.collaboratorService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<EquipeDto> {
        return this.service.items;
    }

    set items(value: Array<EquipeDto>) {
        this.service.items = value;
    }

    get item(): EquipeDto {
        return this.service.item;
    }

    set item(value: EquipeDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): EquipeCriteria {
        return this.service.criteria;
    }

    set criteria(value: EquipeCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
