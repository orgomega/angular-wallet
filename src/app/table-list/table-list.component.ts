import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  revenues: Revenue[];
  depenses: Depense[];
  user_id:number;
  constructor(private revenueService:RevenuesServicesService,
    private depenseService:DepensesServicesService,
    private router:Router,private keycloakService:KeycloakService) { }

  ngOnInit() {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0];
    this.getRevenues();
    this.getDepenses();
  }

  private getRevenues(){
    this.revenueService.getRevenueList(this.user_id).subscribe(data =>{this.revenues=data;
      });
  }
  private getDepenses(){
    this.depenseService.getDepenseList(this.user_id).subscribe(data =>{this.depenses=data;
    });
  }
   updateRevenue(id:number){
    this.router.navigate(['update',id]);
  }
   deleteRevenue(id:number){const swalWithBootstrapButtons = Swal.mixin({
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
      this.revenueService.deleteRevenue(id).subscribe(data=>{
        console.log(data);
        this.getRevenues();
      })
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Depense has been deleted.',
        'success'
      )
      this.router.navigate(['dashboard']);
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Depense was not deleted :)',
        'error'
      )
    }
  })
    }
   viewRevenue(id:number){
    this.router.navigate(['view-revenue',id]);
  }
   updateDepense(id:number){
    this.router.navigate(['update-depense',id]);
  }
   deleteDepense(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
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
        this.depenseService.deleteDepense(id).subscribe(data=>{
          console.log(data);
          this.getDepenses();
        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Depense has been deleted.',
          'success'
        )
        this.router.navigate(['dashboard']);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Depense was not deleted :)',
          'error'
        )
      }
    })
    }
   viewDepense(id:number){
    this.router.navigate(['view-depense',id]);
   }
   addRevenue(){
    this.router.navigate(['add-revenue',this.user_id]);
   }
   addDepense(){
    this.router.navigate(['add-depense',this.user_id]);
   }
}
