import { Compte } from "./compte";
import { User } from "./user";

export class Dette {
    id:number;
    name:string;
    value:string;
    date:string;
    pay_date:string;
    from:string;
    compte:Compte;
    user:User;
}
