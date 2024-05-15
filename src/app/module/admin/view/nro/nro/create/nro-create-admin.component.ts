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



import {NroAdminService} from 'src/app/shared/service/admin/nro/NroAdmin.service';
import {NroDto} from 'src/app/shared/model/nro/Nro.model';
import {NroCriteria} from 'src/app/shared/criteria/nro/NroCriteria.model';
import {ProjetDto} from 'src/app/shared/model/nro/Projet.model';
import {ProjetAdminService} from 'src/app/shared/service/admin/nro/ProjetAdmin.service';
import {SroDto} from 'src/app/shared/model/sro/Sro.model';
import {SroAdminService} from 'src/app/shared/service/admin/sro/SroAdmin.service';
@Component({
  selector: 'app-nro-create-admin',
  templateUrl: './nro-create-admin.component.html'
})
export class NroCreateAdminComponent  implements OnInit {

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

    private _srosElement = new SroDto();


   private _validNroCode = true;
   private _validNroLibelle = true;
    private _validSrosCode = true;
    private _validSrosLibelle = true;
    private _validProjetCode = true;
    private _validProjetLibelle = true;

	constructor(private service: NroAdminService , private projetService: ProjetAdminService, private sroService: SroAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.projetService.findAll().subscribe((data) => this.projets = data);
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
                this.item = new NroDto();
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



    validateSros(){
        this.errorMessages = new Array();
        this.validateSrosCode();
        this.validateSrosLibelle();
    }


    public  setValidation(value: boolean){
        this.validNroCode = value;
        this.validNroLibelle = value;
        this.validSrosCode = value;
        this.validSrosLibelle = value;
    }

    public addSros() {
        if( this.item.sros == null )
            this.item.sros = new Array<SroDto>();
       this.validateSros();
       if (this.errorMessages.length === 0) {
              this.item.sros.push({... this.srosElement});
              this.srosElement = new SroDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }


    public deletesros(p: SroDto) {
        this.item.sros.forEach((element, index) => {
            if (element === p) { this.item.sros.splice(index, 1); }
        });
    }

    public editsros(p: SroDto) {
        this.srosElement = {... p};
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateNroCode();
        this.validateNroLibelle();
    }

    public validateNroCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validNroCode = false;
        } else {
            this.validNroCode = true;
        }
    }
    public validateNroLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validNroLibelle = false;
        } else {
            this.validNroLibelle = true;
        }
    }

    public validateSrosCode(){
        if (this.srosElement.code == null) {
            this.errorMessages.push('Code de la sro est  invalide');
            this.validSrosCode = false;
        } else {
            this.validSrosCode = true;
        }
    }
    public validateSrosLibelle(){
        if (this.srosElement.libelle == null) {
            this.errorMessages.push('Libelle de la sro est  invalide');
            this.validSrosLibelle = false;
        } else {
            this.validSrosLibelle = true;
        }
    }

    public async openCreateProjet(projet: string) {
    const isPermistted = await this.roleService.isPermitted('Projet', 'add');
    if(isPermistted) {
         this.projet = new ProjetDto();
         this.createProjetDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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
    get createProjetDialog(): boolean {
        return this.projetService.createDialog;
    }
    set createProjetDialog(value: boolean) {
        this.projetService.createDialog= value;
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

    get validSrosCode(): boolean {
        return this._validSrosCode;
    }
    set validSrosCode(value: boolean) {
        this._validSrosCode = value;
    }
    get validSrosLibelle(): boolean {
        return this._validSrosLibelle;
    }
    set validSrosLibelle(value: boolean) {
        this._validSrosLibelle = value;
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

    get srosElement(): SroDto {
        if( this._srosElement == null )
            this._srosElement = new SroDto();
        return this._srosElement;
    }

    set srosElement(value: SroDto) {
        this._srosElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): NroCriteria {
        return this.service.criteria;
    }

    set criteria(value: NroCriteria) {
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
