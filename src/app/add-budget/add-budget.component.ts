import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'app/budget';
import { BudgetServiceService } from 'app/budget-service.service';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { User } from 'app/user';

@Component({
  selector: 'add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {
  user_id:number ;
  name:string;
  budget:Budget=new Budget();
  user:User=new User();
  compte:Compte=new Compte();
  comptes:Compte[] ;
  constructor(private route:ActivatedRoute,private budgetService:BudgetServiceService,private compteService:CompteServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
    this.getComptes();
  }
  saveBudget(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.budget.user=this.user;
    this.budget.user.id=this.user_id;
    for (const i of this.comptes) {
      if (i.name==this.name){
        this.budget.compte=i;
      }
    }
    this.budgetService.addBudget(this.budget).subscribe(data =>{
     console.log(data);
     this.GoToBudgetList();
    },
     error=>console.log(error));
  }
  GoToBudgetList(){
    this.router.navigate(['budget'])
  }
  getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      console.log(data);
      });
  }
  onSubmit(){
    this.saveBudget();
  }

}
