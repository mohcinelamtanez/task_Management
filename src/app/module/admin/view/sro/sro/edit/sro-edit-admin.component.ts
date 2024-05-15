import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
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




import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroCriteria} from 'src/app/shared/criteria/sro/SroCriteria.model';


import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';

@Component({
  selector: 'app-sro-edit-admin',
  templateUrl: './sro-edit-admin.component.html'
})
export class SroEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;



    private _validSroCode = true;
    private _validSroLibelle = true;

    private _validNroCode = true;
    private _validNroLibelle = true;



    constructor(private service: SroAdminService , private nroService: NroAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.nroService.findAll().subscribe((data) => this.nros = data);
    }

    public prepareEdit() {
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new SroDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validSroCode = value;
        this.validSroLibelle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateSroCode();
        this.validateSroLibelle();
    }

    public validateSroCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validSroCode = false;
        } else {
            this.validSroCode = true;
        }
    }

    public validateSroLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSroLibelle = false;
        } else {
            this.validSroLibelle = true;
        }
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
    get createNroDialog(): boolean {
        return this.nroService.createDialog;
    }
    set createNroDialog(value: boolean) {
        this.nroService.createDialog= value;
    }


    get validSroCode(): boolean {
        return this._validSroCode;
    }
    set validSroCode(value: boolean) {
        this._validSroCode = value;
    }
    get validSroLibelle(): boolean {
        return this._validSroLibelle;
    }
    set validSroLibelle(value: boolean) {
        this._validSroLibelle = value;
    }

    get validNroCode(): boolean {
        return this._validNroCode;
    }
    set validNroCode(value: boolean) {
        this._validNroCode = value;
    }
    get validNroLibelle(): boolean {
        return this._validNroLibelle;
    }
    set validNroLibelle(value: boolean) {
        this._validNroLibelle = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): SroCriteria {
        return this.service.criteria;
    }

    set criteria(value: SroCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }


}
