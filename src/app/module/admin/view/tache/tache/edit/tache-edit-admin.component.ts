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
  selector: 'app-tache-edit-admin',
  templateUrl: './tache-edit-admin.component.html'
})
export class TacheEditAdminComponent implements OnInit {

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



    private _validTacheReference = true;
    private _validTacheLibelle = true;

    private _validSroCode = true;
    private _validSroLibelle = true;
    private _validTypeTacheCode = true;
    private _validTypeTacheLibelle = true;



    constructor(private service: TacheAdminService , private typeTacheService: TypeTacheAdminService, private membreEquipeService: MembreEquipeAdminService, private sroService: SroAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.sroService.findAll().subscribe((data) => this.sros = data);
        this.membreEquipeService.findAll().subscribe((data) => this.membreEquipes = data);
        this.typeTacheService.findAll().subscribe((data) => this.typeTaches = data);
    }

    public prepareEdit() {
        this.item.dateTache = this.service.format(this.item.dateTache);
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
            this.item = new TacheDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validTacheReference = value;
        this.validTacheLibelle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTacheReference();
        this.validateTacheLibelle();
    }

    public validateTacheReference(){
        if (this.stringUtilService.isEmpty(this.item.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validTacheReference = false;
        } else {
            this.validTacheReference = true;
        }
    }

    public validateTacheLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTacheLibelle = false;
        } else {
            this.validTacheLibelle = true;
        }
    }




   public async openCreateTypeTache(typeTache: string) {
        const isPermistted = await this.roleService.isPermitted('TypeTache', 'edit');
        if (isPermistted) {
             this.typeTache = new TypeTacheDto();
             this.createTypeTacheDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createSroDialog(): boolean {
        return this.sroService.createDialog;
    }
    set createSroDialog(value: boolean) {
        this.sroService.createDialog= value;
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
    get createTypeTacheDialog(): boolean {
        return this.typeTacheService.createDialog;
    }
    set createTypeTacheDialog(value: boolean) {
        this.typeTacheService.createDialog= value;
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
    get createMembreEquipeDialog(): boolean {
        return this.membreEquipeService.createDialog;
    }
    set createMembreEquipeDialog(value: boolean) {
        this.membreEquipeService.createDialog= value;
    }


    get validTacheReference(): boolean {
        return this._validTacheReference;
    }
    set validTacheReference(value: boolean) {
        this._validTacheReference = value;
    }
    get validTacheLibelle(): boolean {
        return this._validTacheLibelle;
    }
    set validTacheLibelle(value: boolean) {
        this._validTacheLibelle = value;
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
    get validTypeTacheCode(): boolean {
        return this._validTypeTacheCode;
    }
    set validTypeTacheCode(value: boolean) {
        this._validTypeTacheCode = value;
    }
    get validTypeTacheLibelle(): boolean {
        return this._validTypeTacheLibelle;
    }
    set validTypeTacheLibelle(value: boolean) {
        this._validTypeTacheLibelle = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TacheCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheCriteria) {
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
