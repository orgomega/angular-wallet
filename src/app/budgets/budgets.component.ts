import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Budget } from 'app/budget';
import { BudgetServiceService } from 'app/budget-service.service';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets:Budget[];
  user_id:number;
  constructor(private budgetService:BudgetServiceService,
    private router:Router,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
    this.getBudgets();
  }
  private getBudgets(){
    this.budgetService.getBudgetList(this.user_id).subscribe(data =>{this.budgets=data;
      });
  }
  updateBudget(id:number){
    this.router.navigate(['update-budget',id]);
  }
  deleteBudget(id:number){const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.budgetService.deleteBudget(id).subscribe(data=>{
        console.log(data);
        this.getBudgets();
      })
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Budget has been deleted.',
        'success'
      )
      this.router.navigate(['dashboard']);
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Budget was not deleted :)',
        'error'
      )
    }
  })
  }
  addBudget(){
    this.router.navigate(['add-budget',this.user_id]);
  }

}
