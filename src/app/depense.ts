import { Compte } from "./compte";
import { User } from "./user";

export class Depense {
    id : number ;
    nom:string;
    description:string;
    dat_ret:string;
    type:string;
    category:string;
    montant:number;
    user:User;
    compte:Compte;
}
