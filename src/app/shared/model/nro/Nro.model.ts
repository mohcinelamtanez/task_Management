import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {ProjetDto} from './Projet.model';
import {SroDto} from '../sro/Sro.model';

export class NroDto extends BaseDto{

    public code: string;

    public libelle: string;

    public projet: ProjetDto ;
     public sros: Array<SroDto>;
    

    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.projet = new ProjetDto() ;
        this.sros = new Array<SroDto>();

        }

}
