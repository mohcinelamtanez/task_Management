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


import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroCriteria} from 'src/app/shared/criteria/sro/SroCriteria.model';

import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';
@Component({
  selector: 'app-sro-view-admin',
  templateUrl: './sro-view-admin.component.html'
})
export class SroViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: SroAdminService, private nroService: NroAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get nro(): NroDto {
        return this.nroService.item;
    }
    set nro(value: NroDto) {
        this.nroService.item = value;
    }
    get nros(): Array<NroDto> {
        return this.nroService.items;
    }
    set nros(value: Array<NroDto>) {
        this.nroService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<SroDto> {
        return this.service.items;
    }

    set items(value: Array<SroDto>) {
        this.service.items = value;
    }

    get item(): SroDto {
        return this.service.item;
    }

    set item(value: SroDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): SroCriteria {
        return this.service.criteria;
    }

    set criteria(value: SroCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
