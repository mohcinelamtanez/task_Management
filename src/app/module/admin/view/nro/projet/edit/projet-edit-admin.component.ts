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




import {ProjetAdminService} from 'src/app/shared/service/admin/nro/ProjetAdmin.service';
import {ProjetDto} from 'src/app/shared/model/nro/Projet.model';
import {ProjetCriteria} from 'src/app/shared/criteria/nro/ProjetCriteria.model';


import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';

@Component({
  selector: 'app-projet-edit-admin',
  templateUrl: './projet-edit-admin.component.html'
})
export class ProjetEditAdminComponent implements OnInit {

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


    private _nrosElement = new NroDto();

    private _validProjetCode = true;
    private _validProjetLibelle = true;

    private _validNrosCode = true;
    private _validNrosLibelle = true;



    constructor(private service: ProjetAdminService , private nroService: NroAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {

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
            this.item = new ProjetDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateNros(){
        this.errorMessages = new Array();
        this.validateNrosCode();
        this.validateNrosLibelle();
    }

    public setValidation(value: boolean){
        this.validProjetCode = value;
        this.validProjetLibelle = value;
        this.validNrosCode = value;
        this.validNrosLibelle = value;
    }

   public addNros() {
        if( this.item.nros == null )
            this.item.nros = new Array<NroDto>();
       this.validateNros();
       if (this.errorMessages.length === 0) {
            if(this.nrosElement.id == null){
                this.item.nros.push(this.nrosElement);
            }else{
                const index = this.item.nros.findIndex(e => e.id == this.nrosElement.id);
                this.item.nros[index] = this.nrosElement;
            }
          this.nrosElement = new NroDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteNros(p: NroDto) {
        this.item.nros.forEach((element, index) => {
            if (element === p) { this.item.nros.splice(index, 1); }
        });
    }

    public editNros(p: NroDto) {
        this.nrosElement = {... p};
        this.activeTab = 0;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateProjetCode();
        this.validateProjetLibelle();
    }

    public validateProjetCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validProjetCode = false;
        } else {
            this.validProjetCode = true;
        }
    }

    public validateProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validProjetLibelle = false;
        } else {
            this.validProjetLibelle = true;
        }
    }



    private validateNrosCode(){
        if (this.nrosElement.code == null) {
        this.errorMessages.push('Code de la nro est  invalide');
            this.validNrosCode = false;
        } else {
            this.validNrosCode = true;
        }
    }
    private validateNrosLibelle(){
        if (this.nrosElement.libelle == null) {
        this.errorMessages.push('Libelle de la nro est  invalide');
            this.validNrosLibelle = false;
        } else {
            this.validNrosLibelle = true;
        }
    }



    get nrosElement(): NroDto {
        if( this._nrosElement == null )
            this._nrosElement = new NroDto();
         return this._nrosElement;
    }

    set nrosElement(value: NroDto) {
        this._nrosElement = value;
    }

    get validProjetCode(): boolean {
        return this._validProjetCode;
    }
    set validProjetCode(value: boolean) {
        this._validProjetCode = value;
    }
    get validProjetLibelle(): boolean {
        return this._validProjetLibelle;
    }
    set validProjetLibelle(value: boolean) {
        this._validProjetLibelle = value;
    }

    get validNrosCode(): boolean {
        return this._validNrosCode;
    }
    set validNrosCode(value: boolean) {
        this._validNrosCode = value;
    }
    get validNrosLibelle(): boolean {
        return this._validNrosLibelle;
    }
    set validNrosLibelle(value: boolean) {
        this._validNrosLibelle = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): ProjetCriteria {
        return this.service.criteria;
    }

    set criteria(value: ProjetCriteria) {
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
