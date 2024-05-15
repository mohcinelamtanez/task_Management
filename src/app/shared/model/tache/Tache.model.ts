import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {TypeTacheDto} from './TypeTache.model';
import {MembreEquipeDto} from '../equipe/MembreEquipe.model';
import {SroDto} from '../sro/Sro.model';

export class TacheDto extends BaseDto{

    public reference: string;

    public libelle: string;

    public description: string;

   public dateTache: Date;

    public dureeTache: null | number;

    public sro: SroDto ;
    public membreEquipe: MembreEquipeDto ;
    public typeTache: TypeTacheDto ;
    

    constructor() {
        super();

        this.reference = '';
        this.libelle = '';
        this.description = '';
        this.dateTache = null;
        this.dureeTache = null;
        this.membreEquipe = new MembreEquipeDto() ;

        }

}
