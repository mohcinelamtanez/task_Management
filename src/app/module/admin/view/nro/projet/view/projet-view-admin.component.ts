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


import {ProjetAdminService} from 'src/app/shared/service/admin/nro/ProjetAdmin.service';
import {ProjetDto} from 'src/app/shared/model/nro/Projet.model';
import {ProjetCriteria} from 'src/app/shared/criteria/nro/ProjetCriteria.model';

import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
@Component({
  selector: 'app-projet-view-admin',
  templateUrl: './projet-view-admin.component.html'
})
export class ProjetViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    nros = new NroDto();
    nross: Array<NroDto> = [];

    constructor(private service: ProjetAdminService, private nroService: NroAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }



    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ProjetDto> {
        return this.service.items;
    }

    set items(value: Array<ProjetDto>) {
        this.service.items = value;
    }

    get item(): ProjetDto {
        return this.service.item;
    }

    set item(value: ProjetDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ProjetCriteria {
        return this.service.criteria;
    }

    set criteria(value: ProjetCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
