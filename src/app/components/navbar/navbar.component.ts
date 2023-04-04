import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {DatePipe, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Dette } from 'app/dette';
import { DetteServiceService } from 'app/dette-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    dettes:Dette[];
    notifications:String[]=[];
    user_id:number;

    constructor(location: Location,  private element: ElementRef, private router: Router,private keycloakService:KeycloakService,private detteService:DetteServiceService,public datepipe: DatePipe) {
          this.location = location;
          this.sidebarVisible = false;
    }
    ngOnInit(){
      this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
      this.getDettes();
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
     console.log(this.notifications);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    logout():void{
    this.keycloakService.logout();
    }
    private getDettes(){
        this.detteService.getDetteList(this.user_id).subscribe(data =>{this.dettes=data;
          this.Notification()});
      }
    Notification(){
    console.log(this.dettes);
    var now=new Date();
    var dd =this.datepipe.transform(now,'yyyy-MM-dd');
    for (const i of this.dettes) {
        console.log(dd);
        console.log(i.pay_date);
        if (Number(i.pay_date.split('-')[0])==Number(dd.split('-')[0])){
            if((Number(i.pay_date.split('-')[1])-Number(dd.split('-')[1]))==1){
            this.notifications.push('Debt named'+i.name+'will be overdue after 1 month');
            }
            else if ((Number(i.pay_date.split('-')[1])==Number(dd.split('-')[1]))&&(Number(i.pay_date.split('-')[2])-Number(dd.split('-')[2]))==7){
            this.notifications.push('Debt named'+i.name+'will be overdue after 1 week');
            }
            else if ((Number(i.pay_date.split('-')[1])<Number(dd.split('-')[1]))||((Number(i.pay_date.split('-')[1])==Number(dd.split('-')[1]))&&(Number(i.pay_date.split('-')[2])<Number(dd.split('-')[2])))){
            this.notifications.push('Debt named  '+i.name+'  is overdue');    
            }
        }
    }
    }
}
