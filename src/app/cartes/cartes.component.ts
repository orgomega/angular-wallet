import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carte } from 'app/carte';
import { CarteServiceService } from 'app/carte-service.service';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.css']
})
export class CartesComponent implements OnInit {
  cartes:Carte[];
  user_id:number;
  constructor(private carteService:CarteServiceService,
    private router:Router,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
    this.getCartes();
  }
  private getCartes(){
    this.carteService.getCarteList(this.user_id).subscribe(data =>{this.cartes=data;
      });
  }
  updateCarte(id:number){
    this.router.navigate(['update-carte',id]);
  }
  deleteCarte(id:number){const swalWithBootstrapButtons = Swal.mixin({
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
      this.carteService.deleteCarte(id).subscribe(data=>{
        console.log(data);
        this.getCartes();
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
  addCarte(){
  this.router.navigate(['add-carte',this.user_id]);
  }

}
