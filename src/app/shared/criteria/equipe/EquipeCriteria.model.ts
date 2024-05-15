import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {CollaboratorCriteria} from '../commun/CollaboratorCriteria.model';
import {TypeEquipeCriteria} from './TypeEquipeCriteria.model';
import {MembreEquipeCriteria} from './MembreEquipeCriteria.model';

export class EquipeCriteria  extends BaseCriteria  {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
  public chefEquipe: CollaboratorCriteria ;
  public chefEquipes: Array<CollaboratorCriteria> ;
      public membreEquipes: Array<MembreEquipeCriteria>;

}
