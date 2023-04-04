import { Compte } from "./compte";
import { User } from "./user";

export class Budget {
    id:number;
    name:string;
    value:string;
    duration:string;
    compte:Compte;
    category:string;
    user:User;
}
