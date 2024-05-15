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



import {CollaboratorAdminService} from 'src/app/shared/service/admin/commun/CollaboratorAdmin.service';
import {CollaboratorDto} from 'src/app/shared/model/commun/Collaborator.model';
import {CollaboratorCriteria} from 'src/app/shared/criteria/commun/CollaboratorCriteria.model';
import {GradDto} from 'src/app/shared/model/commun/Grad.model';
import {GradAdminService} from 'src/app/shared/service/admin/commun/GradAdmin.service';
@Component({
  selector: 'app-collaborator-create-admin',
  templateUrl: './collaborator-create-admin.component.html'
})
export class CollaboratorCreateAdminComponent  implements OnInit {

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



   private _validCollaboratorDescription = true;
    private _validGradCode = true;
    private _validGradLibelle = true;

	constructor(private service: CollaboratorAdminService , private gradService: GradAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.gradService.findAll().subscribe((data) => this.grads = data);
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
                this.item = new CollaboratorDto();
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
        this.validCollaboratorDescription = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCollaboratorDescription();
    }

    public validateCollaboratorDescription(){
        if (this.stringUtilService.isEmpty(this.item.description)) {
        this.errorMessages.push('Description non valide');
        this.validCollaboratorDescription = false;
        } else {
            this.validCollaboratorDescription = true;
        }
    }


    public async openCreateGrad(grad: string) {
    const isPermistted = await this.roleService.isPermitted('Grad', 'add');
    if(isPermistted) {
         this.grad = new GradDto();
         this.createGradDialog = true;
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



    get validCollaboratorDescription(): boolean {
        return this._validCollaboratorDescription;
    }

    set validCollaboratorDescription(value: boolean) {
         this._validCollaboratorDescription = value;
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


    get items(): Array<CollaboratorDto> {
        return this.service.items;
    }

    set items(value: Array<CollaboratorDto>) {
        this.service.items = value;
    }

    get item(): CollaboratorDto {
        return this.service.item;
    }

    set item(value: CollaboratorDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): CollaboratorCriteria {
        return this.service.criteria;
    }

    set criteria(value: CollaboratorCriteria) {
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
