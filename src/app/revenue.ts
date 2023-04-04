import { Compte } from "./compte";
import { User } from "./user";

export class Revenue {
    id:number;
    nom:string;
    description:string;
    dat_ver:string;
    type:string;
    category:string;
    montant:number;
    user:User;
    compte:Compte;
}
