import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';
import { ChartConfiguration, Color } from 'chart.js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'depense-donut',
  templateUrl: './depense-donut.component.html',
  styleUrls: ['./depense-donut.component.css']
})
export class DepenseDonutComponent  {
   depenses: Depense[];
   user_id:number;
   depense_category:number[]=[];
  title = 'ng2-charts-demo';
  // Doughnut
 public doughnutChartLabels: string[] = [ 'Alimentation', 'Couses', 'Entertainement','Family', 'Health/Sport', 'Pets','Travel','Trasport','Other' ];
 public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

 public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
   responsive: false
 };
 constructor(private depenseService:DepensesServicesService,public datepipe: DatePipe,private keycloakService:KeycloakService,) {
 }

 ngOnInit() {
  this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
  this.set_depense(this.user_id);
  this  
}
set_depense(user_id:number){
  this.depenseService.getDepenseList(user_id).subscribe(data =>{this.depenses=data
    this.Depense_Category();});   
}
Depense_Category(){
  var now=new Date();
  let dd =this.datepipe.transform(now,'yyyy-MM-dd');
  var s:number;
  var y:number;
  var m:number;
  for (const i of this.doughnutChartLabels) {
    s=0;
    y=0;
    m=0;
    for (const j of this.depenses) {
      if (i==j.category){
         if((j.type=="yearly")){
           s=s+((Number(dd.split('-')[0])-Number(j.dat_ret.split('-')[0]))*j.montant);
           if((j.dat_ret.split('-')[1]<dd.split('-')[1])||((j.dat_ret.split('-')[1]=dd.split('-')[1])&&(j.dat_ret.split('-')[2]<=dd.split('-')[2]))){s=s+j.montant;}

         }else if((j.type=="monthly")){
           y=(Number(dd.split('-')[0])-Number(j.dat_ret.split('-')[0]));
           m=(12-Number(j.dat_ret.split('-')[1])+1)*y;
           s=s+j.montant*m;
           if(dd.split('-')[0]==j.dat_ret.split('-')[0]){
                 if((j.dat_ret.split('-')[1]<=dd.split('-')[1])&&(j.dat_ret.split('-')[2]<=dd.split('-')[2])){s=s+j.montant*(Number(dd.split('-')[1])-Number(j.dat_ret.split('-')[1])+1);}else if((j.dat_ret.split('-')[2]>dd.split('-')[2])){s=s+j.montant*(Number(dd.split('-')[1])-Number(j.dat_ret.split('-')[1]));}
           }else{if((j.dat_ret.split('-')[1]<dd.split('-')[1])||((j.dat_ret.split('-')[1]==dd.split('-')[1])&&(j.dat_ret.split('-')[2]<=dd.split('-')[2]))){s=s+j.montant*Number(dd.split('-')[1]);}else{s=s+j.montant*Number(dd.split('-')[1])-1;}}

         }else{s=s+j.montant;}
         
       }     
    }
    this.depense_category.push(s);
    
  }
var doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
  { data:this.depense_category, label: 'Series A',backgroundColor:["#F69EBA", "#F8B2BB", "#EFE2CE", "#F5567B", "#F58761", "#F6A17D","#FECD81","#937A78","#937A78"] },
];
this.doughnutChartDatasets=doughnutChartDatasets;
}


}
