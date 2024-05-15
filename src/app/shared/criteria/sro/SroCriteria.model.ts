import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {NroCriteria} from '../nro/NroCriteria.model';

export class SroCriteria  extends BaseCriteria  {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
  public nro: NroCriteria ;
  public nros: Array<NroCriteria> ;

}
