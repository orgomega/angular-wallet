import { Compte } from "./compte";
import { User } from "./user";

export class Carte {
    id:number;
    name:string;
    limit:string;
    interest_rate:string;
    compte:Compte;
    user:User
}
