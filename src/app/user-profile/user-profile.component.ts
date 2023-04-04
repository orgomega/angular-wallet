import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/user';
import { UserServiceService } from 'app/user-service.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id:number;
  user:User=new User(); 
  constructor(private userservice:UserServiceService,private keycloakService:KeycloakService,private router:Router) { }
  ngOnInit() {
    this.id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id;
    this.user.username=this.keycloakService.getUsername();
    this.user.email=this.keycloakService.loadUserProfile()['__zone_symbol__value'].email;
  }

  firstname(){
    var firstname =(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.firstname)
    return(firstname[firstname.length -1]) 
  }
  lastname(){
    var lastname=(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.lastname)
    return(lastname[lastname.length -1])
  }
  country(){
    var country=(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.country)
    return(country[country.length -1])
  }
  city(){
    var city =(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.city)
    return(city[city.length -1])
  }
  codepostal(){
    var codepostal=(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.codepostal)
    return(codepostal[codepostal.length -1])
  }
  address(){
    var address=(this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.adress)
    return (address[address.length -1])
  }
  onSubmit(){ 
    this.userservice.updateUser(this.id,this.user).subscribe(data=>{
      this.router.navigate(['dashboard']);
    },error =>console.log(error)
    );
  }
}
