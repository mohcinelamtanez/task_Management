import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {CollaboratorDto} from '../commun/Collaborator.model';
import {TypeEquipeDto} from './TypeEquipe.model';
import {MembreEquipeDto} from './MembreEquipe.model';

export class EquipeDto extends BaseDto{

    public code: string;

    public libelle: string;

    public chefEquipe: CollaboratorDto ;
    public typeEquipe: TypeEquipeDto ;
     public membreEquipes: Array<MembreEquipeDto>;
    

    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.chefEquipe = new CollaboratorDto() ;
        this.membreEquipes = new Array<MembreEquipeDto>();

        }

}
