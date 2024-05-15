import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {ProjetCriteria} from './ProjetCriteria.model';
import {SroCriteria} from '../sro/SroCriteria.model';

export class NroCriteria  extends BaseCriteria  {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
  public projet: ProjetCriteria ;
  public projets: Array<ProjetCriteria> ;
      public sros: Array<SroCriteria>;

}
