import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dette } from 'app/dette';
import { DetteServiceService } from 'app/dette-service.service';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'dettes',
  templateUrl: './dettes.component.html',
  styleUrls: ['./dettes.component.css']
})
export class DettesComponent implements OnInit {
  dettes:Dette[];
  user_id:number;
  constructor(private detteService:DetteServiceService,
    private router:Router,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
    this.getDettes();
  }
  private getDettes(){
    this.detteService.getDetteList(this.user_id).subscribe(data =>{this.dettes=data;
      });
  }
  updateDette(id:number){
    this.router.navigate(['update-dette',id]);
  }
  deleteDette(id:number){const swalWithBootstrapButtons = Swal.mixin({
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
      this.detteService.deleteDette(id).subscribe(data=>{
        console.log(data);
        this.getDettes();
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
  addDette(){
  this.router.navigate(['add-dette',this.user_id]);
  }

}
