import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carte } from 'app/carte';
import { CarteServiceService } from 'app/carte-service.service';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { User } from 'app/user';

@Component({
  selector: 'add-carte',
  templateUrl: './add-carte.component.html',
  styleUrls: ['./add-carte.component.css']
})
export class AddCarteComponent implements OnInit {
  user_id:number ;
  name:string;
  carte:Carte=new Carte();
  user:User=new User();
  compte:Compte=new Compte();
  comptes:Compte[] ;
  constructor(private route:ActivatedRoute,private carteService:CarteServiceService,private compteService:CompteServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
    this.getComptes();
  }
  saveCarte(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.carte.user=this.user;
    this.carte.user.id=this.user_id;
    for (const i of this.comptes) {
      if (i.name==this.name){
        this.carte.compte=i;
      }
    }
    this.carteService.addCarte(this.carte).subscribe(data =>{
     console.log(data);
     this.GoToBudgetList();
    },
     error=>console.log(error));
  }
  GoToBudgetList(){
    this.router.navigate(['cartes'])
  }
  getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      console.log(data);
      });
  }
  onSubmit(){
    this.saveCarte();
  }

}
