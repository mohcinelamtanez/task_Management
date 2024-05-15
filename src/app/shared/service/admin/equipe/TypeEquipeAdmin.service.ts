import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {PaginatedList} from 'src/app/zynerator/dto/PaginatedList.model';
import * as moment from 'moment/moment';

import {TypeEquipeDto} from 'src/app/shared/model/equipe/TypeEquipe.model';
import {TypeEquipeCriteria} from 'src/app/shared/criteria/equipe/TypeEquipeCriteria.model';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';


@Injectable({
  providedIn: 'root'
})
export class TypeEquipeAdminService {
    protected _API = '';
    protected _items: Array<TypeEquipeDto>;
    protected _item: TypeEquipeDto;
    protected _selections: Array<TypeEquipeDto>;
    protected _createDialog: boolean;
    protected _editDialog: boolean;
    protected _viewDialog: boolean;
    protected _criteria: TypeEquipeCriteria;
    protected _validate = false;

    private _createActionIsValid = true;
    private _editActionIsValid = true;
    private _listActionIsValid = true;
    private _deleteActionIsValid = true;
    private _viewActionIsValid = true;
    private _duplicateActionIsValid = true;


    private _createAction = 'create';
    private _listAction = 'list';
    private _editAction = 'edit';
    private _deleteAction = 'delete';
    private _viewAction = 'view';
    private _duplicateAction = 'duplicate';
    private _entityName: string;

    protected API_PERMISSION: string ;


    constructor(private http: HttpClient) {
        this.API_PERMISSION = environment.apiUrl + 'modelPermissionUser/';
    }


    public findAll() {
        return this.http.get<Array<TypeEquipeDto>>(this.API);
    }

    public findAllOptimized() {
        return this.http.get<Array<TypeEquipeDto>>(this.API + 'optimized');
    }

    public findPaginatedByCriteria(criteria: TypeEquipeCriteria): Observable<PaginatedList<TypeEquipeDto>> {
        return this.http.post<PaginatedList<TypeEquipeDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public save(): Observable<TypeEquipeDto> {
        return this.http.post<TypeEquipeDto>(this.API, this.item);
    }

    public delete(dto: TypeEquipeDto) {
        return this.http.delete<number>(this.API + 'id/' + dto.id);
    }


    public edit(): Observable<TypeEquipeDto> {
        return this.http.put<TypeEquipeDto>(this.API, this.item);
    }


    public findByCriteria(criteria: TypeEquipeCriteria): Observable<Array<TypeEquipeDto>> {
        return this.http.post<Array<TypeEquipeDto>>(this.API + 'find-by-criteria', criteria);
    }

    public findByIdWithAssociatedList(item: TypeEquipeDto): Observable<TypeEquipeDto> {
        return this.http.get<TypeEquipeDto>(this.API + 'id/' + item.id);
    }

    public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple', this.selections);
    }
    public exportPdf(element: TypeEquipeDto): Observable<ArrayBuffer> {
        return this.http.post(this.API + 'exportPdf/', element, {responseType: 'arraybuffer'});
    }

    public hasActionPermission(username: string, actionReference: string): Observable<boolean> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<boolean>(this.API_PERMISSION + 'user/' + username + '/model/' + this.entityName + '/action/' + actionReference);
    }

    public importExcel(file: File): Observable<Array<TypeEquipeDto>> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<Array<TypeEquipeDto>>(this.API + 'import-excel', formData);
    }



    public format(myDate: Date): Date {
        if (myDate != null) {
            const newdate = new Date(myDate);
            const formattedDate = moment(newdate).format(environment.dateFormatEdit);
            console.log(formattedDate);
            myDate = new Date(formattedDate);
        }
        return myDate;
    }

    get API() {
        return environment.apiUrlTaskservice + 'admin/typeEquipe/';
    }

    public get items(): Array<TypeEquipeDto> {
        if (this._items == null) {
            this._items = new Array<TypeEquipeDto>();
        }
        return this._items;
    }

    public set items(value: Array<TypeEquipeDto>) {
        this._items = value;
    }

    public get item(): TypeEquipeDto {
        if (this._item == null) {
            this._item = new TypeEquipeDto();
        }
        return this._item;
    }

    public set item(value: TypeEquipeDto) {
        this._item = value;
    }

    public get selections(): Array<TypeEquipeDto> {
        if (this._selections == null) {
            this._selections = new Array<TypeEquipeDto>();
        }
        return this._selections;
    }


    public set selections(value: Array<TypeEquipeDto>) {
        this._selections = value;
    }

    public get createDialog(): boolean {
        return this._createDialog;
    }

    public set createDialog(value: boolean) {
        this._createDialog = value;
    }

    public get editDialog(): boolean {
        return this._editDialog;
    }

    public set editDialog(value: boolean) {
        this._editDialog = value;
    }

    public get viewDialog(): boolean {
        return this._viewDialog;
    }

    public set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    public get criteria(): TypeEquipeCriteria {
        if (this._criteria == null) {
            this._criteria = new TypeEquipeCriteria();
        }
        return this._criteria;
    }

    public set criteria(value: TypeEquipeCriteria) {
        this._criteria = value;
    }


    public setApi(API: string) {
        this._API = API;
    }

    set validate(value: boolean) {
        this._validate = value;
    }


    get createAction(): string {
        return this._createAction;
    }

    set createAction(value: string) {
        this._createAction = value;
    }

    get listAction(): string {
        return this._listAction;
    }

    set listAction(value: string) {
        this._listAction = value;
    }

    get editAction(): string {
        return this._editAction;
    }

    set editAction(value: string) {
        this._editAction = value;
    }

    get deleteAction(): string {
        return this._deleteAction;
    }

    set deleteAction(value: string) {
        this._deleteAction = value;
    }

    get createActionIsValid(): boolean {
        return this._createActionIsValid;
    }

    set createActionIsValid(value: boolean) {
        this._createActionIsValid = value;
    }


    get editActionIsValid(): boolean {
        return this._editActionIsValid;
    }

    set editActionIsValid(value: boolean) {
        this._editActionIsValid = value;
    }

    get listActionIsValid(): boolean {
        return this._listActionIsValid;
    }

    set listActionIsValid(value: boolean) {
        this._listActionIsValid = value;
    }

    get deleteActionIsValid(): boolean {
        return this._deleteActionIsValid;
    }

    set deleteActionIsValid(value: boolean) {
        this._deleteActionIsValid = value;
    }

    get viewAction(): string {
        return this._viewAction;
    }

    set viewAction(value: string) {
        this._viewAction = value;
    }

    get duplicateAction(): string {
        return this._duplicateAction;
    }

    set duplicateAction(value: string) {
        this._duplicateAction = value;
    }

    get viewActionIsValid(): boolean {
        return this._viewActionIsValid;
    }

    set viewActionIsValid(value: boolean) {
        this._viewActionIsValid = value;
    }

    get duplicateActionIsValid(): boolean {
        return this._duplicateActionIsValid;
    }

    set duplicateActionIsValid(value: boolean) {
        this._duplicateActionIsValid = value;
    }

    get entityName(): string {
        return this._entityName;
    }

    set entityName(value: string) {
        this._entityName = value;
    }

}
