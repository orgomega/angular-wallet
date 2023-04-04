import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';
import { ChartConfiguration, Color } from 'chart.js';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'revenue-donut',
  templateUrl: './revenue-donut.component.html',
  styleUrls: ['./revenue-donut.component.css']
})
export class RevenueDonutComponent implements OnInit {
   revenues: Revenue[];
   user_id:number;
   revenue_category:number[]=[];
   title = 'ng2-charts-demo';
   // Doughnut
  public doughnutChartLabels: string[] = [ 'Financial Revenue', 'Salary', 'Litte Jobs','pension', 'Epagne', 'Other' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data:[], label: 'Series A',backgroundColor:["rgba(209,113,80,0.4)", "black", "grey","brown","yellow","pink"],  },
    ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  
  constructor(private revenueService:RevenuesServicesService,public datepipe: DatePipe,private keycloakService:KeycloakService,) {
  }

  ngOnInit() {
    this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
    this.set_revenue(this.user_id);
    this  
  }
  set_revenue(user_id:number){
    this.revenueService.getRevenueList(user_id).subscribe(data =>{this.revenues=data
      this.Revenue_Category();});   
  }
  Revenue_Category(){
    var now=new Date();
    let dd =this.datepipe.transform(now,'yyyy-MM-dd');
    var s:number;
    var y:number;
    var m:number;
    for (const i of this.doughnutChartLabels) {
      s=0;
      y=0;
      m=0;
      for (const j of this.revenues) {
        if (i==j.category){
           if((j.type=="yearly")){
             s=s+((Number(dd.split('-')[0])-Number(j.dat_ver.split('-')[0]))*j.montant);
             if((j.dat_ver.split('-')[1]<dd.split('-')[1])||((j.dat_ver.split('-')[1]=dd.split('-')[1])&&(j.dat_ver.split('-')[2]<=dd.split('-')[2]))){s=s+j.montant;}
             
           }else if((j.type=="monthly")){
             y=(Number(dd.split('-')[0])-Number(j.dat_ver.split('-')[0]));
             m=(12-Number(j.dat_ver.split('-')[1])+1)*y;
             s=s+j.montant*m;
             if(dd.split('-')[0]==j.dat_ver.split('-')[0]){
                   
                   if((j.dat_ver.split('-')[1]<=dd.split('-')[1])&&(j.dat_ver.split('-')[2]<=dd.split('-')[2])){s=s+j.montant*(Number(dd.split('-')[1])-Number(j.dat_ver.split('-')[1])+1);}else if((j.dat_ver.split('-')[2]>dd.split('-')[2])){s=s+j.montant*(Number(dd.split('-')[1])-Number(j.dat_ver.split('-')[1]));}
             }else{if((j.dat_ver.split('-')[1]<dd.split('-')[1])||((j.dat_ver.split('-')[1]==dd.split('-')[1])&&(j.dat_ver.split('-')[2]<=dd.split('-')[2]))){s=s+j.montant*Number(dd.split('-')[1]);}else{s=s+j.montant*Number(dd.split('-')[1])-1;}}
             
           }else{s=s+j.montant;}
           
         }     
      }
      this.revenue_category.push(s);
    }
  var doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data:this.revenue_category, label: 'Series A',backgroundColor:["#666633", "#83B799", "#E2CD6D","#C2B28F","#E4D8B4","#E86F68"],  },
  ];
  this.doughnutChartDatasets=doughnutChartDatasets;
  }
}
