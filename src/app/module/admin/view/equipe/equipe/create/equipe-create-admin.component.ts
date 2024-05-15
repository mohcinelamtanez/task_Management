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
  selector: 'app-equipe-create-admin',
  templateUrl: './equipe-create-admin.component.html'
})
export class EquipeCreateAdminComponent  implements OnInit {

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

    private _membreEquipesElement = new MembreEquipeDto();


   private _validEquipeCode = true;
   private _validEquipeLibelle = true;
    private _validChefEquipeDescription = true;
    private _validTypeEquipeCode = true;
    private _validTypeEquipeLibelle = true;

	constructor(private service: EquipeAdminService , private collaboratorService: CollaboratorAdminService, private typeEquipeService: TypeEquipeAdminService, private gradService: GradAdminService, private membreEquipeService: MembreEquipeAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.membreEquipesElement.grad = new GradDto();
        this.gradService.findAll().subscribe((data) => this.grads = data);
        this.membreEquipesElement.collaborator = new CollaboratorDto();
        this.collaboratorService.findAll().subscribe((data) => this.collaborators = data);
        this.collaboratorService.findAll().subscribe((data) => this.chefEquipes = data);
        this.typeEquipeService.findAll().subscribe((data) => this.typeEquipes = data);
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
                this.item = new EquipeDto();
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



    validateMembreEquipes(){
        this.errorMessages = new Array();
    }


    public  setValidation(value: boolean){
        this.validEquipeCode = value;
        this.validEquipeLibelle = value;
    }

    public addMembreEquipes() {
        if( this.item.membreEquipes == null )
            this.item.membreEquipes = new Array<MembreEquipeDto>();
       this.validateMembreEquipes();
       if (this.errorMessages.length === 0) {
              this.item.membreEquipes.push({... this.membreEquipesElement});
              this.membreEquipesElement = new MembreEquipeDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }


    public deletemembreEquipes(p: MembreEquipeDto) {
        this.item.membreEquipes.forEach((element, index) => {
            if (element === p) { this.item.membreEquipes.splice(index, 1); }
        });
    }

    public editmembreEquipes(p: MembreEquipeDto) {
        this.membreEquipesElement = {... p};
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateEquipeCode();
        this.validateEquipeLibelle();
    }

    public validateEquipeCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validEquipeCode = false;
        } else {
            this.validEquipeCode = true;
        }
    }
    public validateEquipeLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validEquipeLibelle = false;
        } else {
            this.validEquipeLibelle = true;
        }
    }


    public async openCreateTypeEquipe(typeEquipe: string) {
    const isPermistted = await this.roleService.isPermitted('TypeEquipe', 'add');
    if(isPermistted) {
         this.typeEquipe = new TypeEquipeDto();
         this.createTypeEquipeDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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
    get createGradDialog(): boolean {
        return this.gradService.createDialog;
    }
    set createGradDialog(value: boolean) {
        this.gradService.createDialog= value;
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
    get createCollaboratorDialog(): boolean {
        return this.collaboratorService.createDialog;
    }
    set createCollaboratorDialog(value: boolean) {
        this.collaboratorService.createDialog= value;
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
    get createTypeEquipeDialog(): boolean {
        return this.typeEquipeService.createDialog;
    }
    set createTypeEquipeDialog(value: boolean) {
        this.typeEquipeService.createDialog= value;
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
    get createChefEquipeDialog(): boolean {
        return this.collaboratorService.createDialog;
    }
    set createChefEquipeDialog(value: boolean) {
        this.collaboratorService.createDialog= value;
    }



    get validEquipeCode(): boolean {
        return this._validEquipeCode;
    }

    set validEquipeCode(value: boolean) {
         this._validEquipeCode = value;
    }
    get validEquipeLibelle(): boolean {
        return this._validEquipeLibelle;
    }

    set validEquipeLibelle(value: boolean) {
         this._validEquipeLibelle = value;
    }

    get validChefEquipeDescription(): boolean {
        return this._validChefEquipeDescription;
    }
    set validChefEquipeDescription(value: boolean) {
        this._validChefEquipeDescription = value;
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

    get membreEquipesElement(): MembreEquipeDto {
        if( this._membreEquipesElement == null )
            this._membreEquipesElement = new MembreEquipeDto();
        return this._membreEquipesElement;
    }

    set membreEquipesElement(value: MembreEquipeDto) {
        this._membreEquipesElement = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): EquipeCriteria {
        return this.service.criteria;
    }

    set criteria(value: EquipeCriteria) {
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
