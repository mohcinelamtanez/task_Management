import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {NroCriteria} from './NroCriteria.model';

export class ProjetCriteria  extends BaseCriteria  {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
      public nros: Array<NroCriteria>;

}
