import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {NroDto} from './Nro.model';

export class ProjetDto extends BaseDto{

    public code: string;

    public libelle: string;

     public nros: Array<NroDto>;
    

    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.nros = new Array<NroDto>();

        }

}
