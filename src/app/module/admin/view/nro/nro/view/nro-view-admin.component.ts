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


import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';
import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroCriteria} from 'src/app/shared/criteria/nro/NroCriteria.model';

import {ProjetDto} from 'src/app/shared/model/nro/Projet.model';
import {ProjetAdminService} from 'src/app/shared/service/admin/nro/ProjetAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
@Component({
  selector: 'app-nro-view-admin',
  templateUrl: './nro-view-admin.component.html'
})
export class NroViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    sros = new SroDto();
    sross: Array<SroDto> = [];

    constructor(private service: NroAdminService, private projetService: ProjetAdminService, private sroService: SroAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get projet(): ProjetDto {
        return this.projetService.item;
    }
    set projet(value: ProjetDto) {
        this.projetService.item = value;
    }
    get projets(): Array<ProjetDto> {
        return this.projetService.items;
    }
    set projets(value: Array<ProjetDto>) {
        this.projetService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<NroDto> {
        return this.service.items;
    }

    set items(value: Array<NroDto>) {
        this.service.items = value;
    }

    get item(): NroDto {
        return this.service.item;
    }

    set item(value: NroDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): NroCriteria {
        return this.service.criteria;
    }

    set criteria(value: NroCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
