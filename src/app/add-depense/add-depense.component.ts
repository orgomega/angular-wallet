import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'app/budget';
import { BudgetServiceService } from 'app/budget-service.service';
import { Carte } from 'app/carte';
import { CarteServiceService } from 'app/carte-service.service';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';
import { User } from 'app/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.css']
})
export class AddDepenseComponent implements OnInit {
  user_id:number;
  name:string;
  depense:Depense=new Depense();
  user:User=new User();
  comptes:Compte[] ;
  cartes:Carte[];
  budgets:Budget[];
  constructor(private route:ActivatedRoute,private depenseService:DepensesServicesService,
    private router:Router,private compteService:CompteServiceService,private carteService:CarteServiceService,private budgetService:BudgetServiceService) { }

  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
    this.getComptes();
    this.getCartes();
    this.getBudgets();
  }
  saveDepense(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.depense.user=this.user;
    this.depense.user.id=this.user_id;
    for (const i of this.comptes) {
      if (i.name==this.name){
        if (this.valide(i,this.depense.montant)){
        console.log('d5al 1');
        this.alerte(true);  
        this.depense.compte=i;
        i.balance=String(Number(i.balance)-this.depense.montant);
        this.compteService.updateCompte(i.id,i).subscribe(data=>{
        },error =>console.log(error));

        this.depenseService.addDepense(this.depense).subscribe(data =>{
          console.log(data);
          this.GoToDepenseList();
         },
          error=>console.log(error));
      }else{this.alerte(false);}
      }
    }
    for (const i of this.cartes){
      if (i.name==this.name){
        if (this.valide(i.compte,this.depense.montant)&&(Number(i.limit)>this.depense.montant)){
        console.log('d5al 2');
        this.alerte(true);
        this.depense.compte=i.compte;
        i.compte.balance=String(Number(i.compte.balance)-Number(this.depense.montant));
        this.compteService.updateCompte(i.id,i.compte).subscribe(data=>{
        },error =>console.log(error));

        this.depenseService.addDepense(this.depense).subscribe(data =>{
          console.log(data);
          this.GoToDepenseList();
         },
          error=>console.log(error));
      }else{this.alerte(false);}
      }
    }
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
  private getBudgets(){
    this.budgetService.getBudgetList(this.user_id).subscribe(data =>{this.budgets=data;
      console.log(data);
      });
  }
  GoToDepenseList(){
    this.router.navigate(['table-list'])
  }
  onSubmit(){
    this.saveDepense();
  }
  valide(compte:Compte,montant:number):boolean{
    for (const i of this.budgets) {
      if(i.compte.name==compte.name){
        if(Number(i.value)<montant){
          return(false);
        }
        else {         
          return(true);
        }
      }
    }
  }
  alerte(test:boolean){
    if(test){
      Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Depense saved',
        showConfirmButton: false,
        timer: 1500 })
    }else{
      Swal.fire({
        title: 'Not Allowed',
        text: 'you have exceeded your Budget or your limit',
        icon: 'error',
        confirmButtonText: 'OK'
      })  
    }
  }
}
