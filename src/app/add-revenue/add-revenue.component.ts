import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carte } from 'app/carte';
import { CarteServiceService } from 'app/carte-service.service';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';
import { User } from 'app/user';

@Component({
  selector: 'add-revenue',
  templateUrl: './add-revenue.component.html',
  styleUrls: ['./add-revenue.component.css']
})
export class AddRevenueComponent implements OnInit {
  revenue:Revenue=new Revenue();
  name:string;
  user_id:number;
  user:User=new User();
  compte:Compte=new Compte();
  comptes:Compte[] ;
  cartes:Carte[];
  carte:Carte;
  constructor(private route:ActivatedRoute,private revenueService:RevenuesServicesService,
    private router:Router,private compteService:CompteServiceService,private carteService:CarteServiceService) { }

  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
    this.getComptes();
    this.getCartes();
  }
  saveRevenue(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.revenue.user=this.user;
    this.revenue.user.id=this.user_id;
    for (const i of this.comptes) {
      if (i.name==this.name){
        this.revenue.compte=i;
        i.balance=String(Number(i.balance)+Number(this.revenue.montant));
        this.compteService.updateCompte(i.id,i).subscribe(data=>{
        },error =>console.log(error)
        );
      }
    }
    for (const i of this.cartes){
      if (i.name==this.name){
        this.revenue.compte=i.compte;
        i.compte.balance=String(Number(i.compte.balance)+Number(this.revenue.montant));
        this.compteService.updateCompte(i.id,i.compte).subscribe(data=>{
        },error =>console.log(error)
        );
      }
    }
    this.revenueService.addRevenue(this.revenue).subscribe(data =>{
     console.log(data);
     this.GoToRevenueList();
    },
     error=>console.log(error));
  }
  getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      console.log(data);
      });
  }
  getCartes(){
    this.carteService.getCarteList(this.user_id).subscribe(data =>{this.cartes=data;
      console.log(data);
      });
  }
  GoToRevenueList(){
    this.router.navigate(['table-list'])
  }
  onSubmit(){
    this.saveRevenue();
  }

}
