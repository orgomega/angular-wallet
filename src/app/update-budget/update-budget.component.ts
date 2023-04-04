import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'app/budget';
import { BudgetServiceService } from 'app/budget-service.service';

@Component({
  selector: 'update-budget',
  templateUrl: './update-budget.component.html',
  styleUrls: ['./update-budget.component.css']
})
export class UpdateBudgetComponent implements OnInit {
  id:number;
  budget:Budget=new Budget();
  constructor(private budgetservice:BudgetServiceService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.budgetservice.getBudgetById(this.id).subscribe(data =>{
     this.budget =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.budgetservice.updateBudget(this.id,this.budget).subscribe(data=>{
      this.router.navigate(['budget']);
    },error =>console.log(error)
    );
  }

}
