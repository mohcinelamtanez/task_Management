import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {TypeTacheCriteria} from './TypeTacheCriteria.model';
import {MembreEquipeCriteria} from '../equipe/MembreEquipeCriteria.model';
import {SroCriteria} from '../sro/SroCriteria.model';

export class TacheCriteria  extends BaseCriteria  {

    public id: number;
    public reference: string;
    public referenceLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
    public dateTache: Date;
    public dateTacheFrom: Date;
    public dateTacheTo: Date;
     public dureeTache: number;
     public dureeTacheMin: number;
     public dureeTacheMax: number;
  public membreEquipe: MembreEquipeCriteria ;
  public membreEquipes: Array<MembreEquipeCriteria> ;

}
