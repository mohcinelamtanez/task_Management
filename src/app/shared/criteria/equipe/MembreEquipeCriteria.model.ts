import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {CollaboratorCriteria} from '../commun/CollaboratorCriteria.model';
import {EquipeCriteria} from './EquipeCriteria.model';
import {GradCriteria} from '../commun/GradCriteria.model';

export class MembreEquipeCriteria  extends BaseCriteria  {

    public id: number;
  public grad: GradCriteria ;
  public grads: Array<GradCriteria> ;

}
