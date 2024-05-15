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




import {MembreEquipeAdminService} from 'src/app/shared/service/admin/equipe/MembreEquipeAdmin.service';
import {MembreEquipeDto} from 'src/app/shared/model/equipe/MembreEquipe.model';
import {MembreEquipeCriteria} from 'src/app/shared/criteria/equipe/MembreEquipeCriteria.model';


import {CollaboratorDto} from 'src/app/shared/model/commun/Collaborator.model';
import {CollaboratorAdminService} from 'src/app/shared/service/admin/commun/CollaboratorAdmin.service';
import {EquipeDto} from 'src/app/shared/model/equipe/Equipe.model';
import {EquipeAdminService} from 'src/app/shared/service/admin/equipe/EquipeAdmin.service';
import {GradDto} from 'src/app/shared/model/commun/Grad.model';
import {GradAdminService} from 'src/app/shared/service/admin/commun/GradAdmin.service';

@Component({
  selector: 'app-membre-equipe-edit-admin',
  templateUrl: './membre-equipe-edit-admin.component.html'
})
export class MembreEquipeEditAdminComponent implements OnInit {

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




    private _validEquipeCode = true;
    private _validEquipeLibelle = true;
    private _validGradCode = true;
    private _validGradLibelle = true;
    private _validCollaboratorDescription = true;



    constructor(private service: MembreEquipeAdminService , private collaboratorService: CollaboratorAdminService, private equipeService: EquipeAdminService, private gradService: GradAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.equipeService.findAll().subscribe((data) => this.equipes = data);
        this.gradService.findAll().subscribe((data) => this.grads = data);
        this.collaboratorService.findAll().subscribe((data) => this.collaborators = data);
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
            this.item = new MembreEquipeDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }




   public async openCreateEquipe(equipe: string) {
        const isPermistted = await this.roleService.isPermitted('Equipe', 'edit');
        if (isPermistted) {
             this.equipe = new EquipeDto();
             this.createEquipeDialog = true;
        }else {
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
    get equipe(): EquipeDto {
        return this.equipeService.item;
    }
    set equipe(value: EquipeDto) {
        this.equipeService.item = value;
    }
    get equipes(): Array<EquipeDto> {
        return this.equipeService.items;
    }
    set equipes(value: Array<EquipeDto>) {
        this.equipeService.items = value;
    }
    get createEquipeDialog(): boolean {
        return this.equipeService.createDialog;
    }
    set createEquipeDialog(value: boolean) {
        this.equipeService.createDialog= value;
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
    get validGradCode(): boolean {
        return this._validGradCode;
    }
    set validGradCode(value: boolean) {
        this._validGradCode = value;
    }
    get validGradLibelle(): boolean {
        return this._validGradLibelle;
    }
    set validGradLibelle(value: boolean) {
        this._validGradLibelle = value;
    }
    get validCollaboratorDescription(): boolean {
        return this._validCollaboratorDescription;
    }
    set validCollaboratorDescription(value: boolean) {
        this._validCollaboratorDescription = value;
    }

	get items(): Array<MembreEquipeDto> {
        return this.service.items;
    }

    set items(value: Array<MembreEquipeDto>) {
        this.service.items = value;
    }

    get item(): MembreEquipeDto {
        return this.service.item;
    }

    set item(value: MembreEquipeDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): MembreEquipeCriteria {
        return this.service.criteria;
    }

    set criteria(value: MembreEquipeCriteria) {
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
