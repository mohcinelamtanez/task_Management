import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class GradDto extends BaseDto{

    public code: string;

    public libelle: string;

    public tarification: null | number;

    

    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.tarification = null;

        }

}
