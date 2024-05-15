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


import {TacheAdminService} from 'src/app/shared/service/admin/tache/TacheAdmin.service';
import {TacheDto} from 'src/app/shared/model/tache/Tache.model';
import {TacheCriteria} from 'src/app/shared/criteria/tache/TacheCriteria.model';

import {TypeTacheDto} from 'src/app/shared/model/tache/TypeTache.model';
import {TypeTacheAdminService} from 'src/app/shared/service/admin/tache/TypeTacheAdmin.service';
import {MembreEquipeDto} from 'src/app/shared/model/equipe/MembreEquipe.model';
import {MembreEquipeAdminService} from 'src/app/shared/service/admin/equipe/MembreEquipeAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
@Component({
  selector: 'app-tache-view-admin',
  templateUrl: './tache-view-admin.component.html'
})
export class TacheViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: TacheAdminService, private typeTacheService: TypeTacheAdminService, private membreEquipeService: MembreEquipeAdminService, private sroService: SroAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get sro(): SroDto {
        return this.sroService.item;
    }
    set sro(value: SroDto) {
        this.sroService.item = value;
    }
    get sros(): Array<SroDto> {
        return this.sroService.items;
    }
    set sros(value: Array<SroDto>) {
        this.sroService.items = value;
    }
    get typeTache(): TypeTacheDto {
        return this.typeTacheService.item;
    }
    set typeTache(value: TypeTacheDto) {
        this.typeTacheService.item = value;
    }
    get typeTaches(): Array<TypeTacheDto> {
        return this.typeTacheService.items;
    }
    set typeTaches(value: Array<TypeTacheDto>) {
        this.typeTacheService.items = value;
    }
    get membreEquipe(): MembreEquipeDto {
        return this.membreEquipeService.item;
    }
    set membreEquipe(value: MembreEquipeDto) {
        this.membreEquipeService.item = value;
    }
    get membreEquipes(): Array<MembreEquipeDto> {
        return this.membreEquipeService.items;
    }
    set membreEquipes(value: Array<MembreEquipeDto>) {
        this.membreEquipeService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<TacheDto> {
        return this.service.items;
    }

    set items(value: Array<TacheDto>) {
        this.service.items = value;
    }

    get item(): TacheDto {
        return this.service.item;
    }

    set item(value: TacheDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TacheCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
