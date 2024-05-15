import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {NroDto} from '../nro/Nro.model';

export class SroDto extends BaseDto{

    public code: string;

    public libelle: string;

    public nro: NroDto ;
    

    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.nro = new NroDto() ;

        }

}
