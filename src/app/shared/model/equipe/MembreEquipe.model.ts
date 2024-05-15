import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {CollaboratorDto} from '../commun/Collaborator.model';
import {EquipeDto} from './Equipe.model';
import {GradDto} from '../commun/Grad.model';

export class MembreEquipeDto extends BaseDto{

    public equipe: EquipeDto ;
    public grad: GradDto ;
    public collaborator: CollaboratorDto ;
    

    constructor() {
        super();

        this.grad = new GradDto() ;

        }

}
