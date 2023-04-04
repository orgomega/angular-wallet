import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  comptes:Compte[];
  user_id:number;
  constructor(private compteService:CompteServiceService,
    private router:Router,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
    this.getComptes();
  }
  private getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      });
  }
  updateCompte(id:number){
    this.router.navigate(['update-compte',id]);
  }
  deleteCompte(id:number){const swalWithBootstrapButtons = Swal.mixin({
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
      this.compteService.deleteCompte(id).subscribe(data=>{
        console.log(data);
        this.getComptes();
      })
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Card has been deleted.',
        'success'
      )
      this.router.navigate(['dashboard']);
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Card was not deleted :)',
        'error'
      )
    }
  })
  }
  addCompte(){
    this.router.navigate(['add-compte',this.user_id]);
  }
}
