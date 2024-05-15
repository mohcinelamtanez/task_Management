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



import {TypeEquipeAdminService} from 'src/app/shared/service/admin/equipe/TypeEquipeAdmin.service';
import {TypeEquipeDto} from 'src/app/shared/model/equipe/TypeEquipe.model';
import {TypeEquipeCriteria} from 'src/app/shared/criteria/equipe/TypeEquipeCriteria.model';
@Component({
  selector: 'app-type-equipe-create-admin',
  templateUrl: './type-equipe-create-admin.component.html'
})
export class TypeEquipeCreateAdminComponent  implements OnInit {

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



   private _validTypeEquipeCode = true;
   private _validTypeEquipeLibelle = true;

	constructor(private service: TypeEquipeAdminService , @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
    }


    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new TypeEquipeDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }





    public  setValidation(value: boolean){
        this.validTypeEquipeCode = value;
        this.validTypeEquipeLibelle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTypeEquipeCode();
        this.validateTypeEquipeLibelle();
    }

    public validateTypeEquipeCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validTypeEquipeCode = false;
        } else {
            this.validTypeEquipeCode = true;
        }
    }
    public validateTypeEquipeLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validTypeEquipeLibelle = false;
        } else {
            this.validTypeEquipeLibelle = true;
        }
    }






    get validTypeEquipeCode(): boolean {
        return this._validTypeEquipeCode;
    }

    set validTypeEquipeCode(value: boolean) {
         this._validTypeEquipeCode = value;
    }
    get validTypeEquipeLibelle(): boolean {
        return this._validTypeEquipeLibelle;
    }

    set validTypeEquipeLibelle(value: boolean) {
         this._validTypeEquipeLibelle = value;
    }



    get items(): Array<TypeEquipeDto> {
        return this.service.items;
    }

    set items(value: Array<TypeEquipeDto>) {
        this.service.items = value;
    }

    get item(): TypeEquipeDto {
        return this.service.item;
    }

    set item(value: TypeEquipeDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): TypeEquipeCriteria {
        return this.service.criteria;
    }

    set criteria(value: TypeEquipeCriteria) {
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
