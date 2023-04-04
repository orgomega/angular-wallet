import { Component, Input, OnInit } from '@angular/core';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';
import * as Chartist from 'chartist';
import { DatePipe } from '@angular/common'
import { KeycloakService } from 'keycloak-angular';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
           revenues: Revenue[];
           depenses: Depense[];
           user_id:number;
           revenue_semaine:number[]=[];
           revenue_mois:number[]=[];
           revenue_ans:number;
           depense_semaine:number[]=[];
           depense_mois:number[]=[];
           depense_ans:number;
           comptes:Compte[];

  constructor(private revenueService:RevenuesServicesService,
    private depenseService:DepensesServicesService,
    public datepipe: DatePipe,private keycloakService:KeycloakService,private compteService:CompteServiceService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });
      seq2 = 0;
  };
  ngOnInit() {
      this.user_id=this.keycloakService.loadUserProfile()['__zone_symbol__value'].attributes.id[0] ;
      this.set_depense(this.user_id);
      this.set_revenue(this.user_id);
      this.getComptes();
  }

  set_revenue(user_id:number){
    this.revenueService.getRevenueList(user_id).subscribe(data =>{this.revenues=data
      this.Revenue_jour();
      this.Revenue_mois();});   
  }
  set_depense(user_id:number){
    this.depenseService.getDepenseList(user_id).subscribe(data =>{this.depenses=data
      this.Depense_jour();
      this.Depense_mois();});
  }
  getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      });
  }
  Revenue_jour(){
      var now=new Date(); 

      switch (now.getDay()) {
        case 0:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
           break;
        case 1:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8));
           break; 
        case 2:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 9));
          break;
          case 3:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10));
           break;
        case 4:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 11));
           break; 
        case 5:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12));
          break;
        case 6:
           this.Revenue_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13));
          break;
      }
  }
  
  Revenue_mois(){
   this.revenue_ans=0;
   var now=new Date();
   var y=now.getFullYear();
   for (let p=1;p<=12;p++){
    var s=0;
    for (const i of this.revenues){
      if((Number(i.dat_ver.split('-')[1])==p)&&(Number(i.dat_ver.split('-')[0])<y)){
        s=s+i.montant;       
      }if((Number(i.dat_ver.split('-')[1])<p)&&(Number(i.dat_ver.split('-')[0])<y)&&i.type=="monthly"){
        s=s+i.montant;
      }
    }
    this.revenue_mois.push(s);
    this.revenue_ans=this.revenue_ans+s;
   }
   var datawebsiteViewsChart = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    series: [
      [this.revenue_mois[0], this.revenue_mois[1], this.revenue_mois[2], this.revenue_mois[3],
      this.revenue_mois[4], this.revenue_mois[5], this.revenue_mois[6], this.revenue_mois[7],
      this.revenue_mois[8], this.revenue_mois[9], this.revenue_mois[10], this.revenue_mois[11]]
    ]
  };
  var optionswebsiteViewsChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: this.max(this.revenue_mois),
      chartPadding: { top: 0, right: 5, bottom: 0, left: 20}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
  this.startAnimationForBarChart(websiteViewsChart);
  }
  Revenue_semaine(d:Date){
    var y=d.getFullYear();
    for(let p=0;p<7;p++){
    let dd =this.datepipe.transform(d,'yyyy-MM-dd');
    var s:number=0;
    for (const i of this.revenues) {
      if (i.dat_ver==dd){
        s=s+i.montant;
      }if(((Number(i.dat_ver.split('-')[1])<p)||(Number(i.dat_ver.split('-')[0])<=y))&&(Number(i.dat_ver.split('-')[2])==Number(dd.split('-')[2]))&&(i.type=="monthly")){
        s=s+i.montant;
      }
    }
    this.revenue_semaine.push(s);
    d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
  }
  const dataDailySalesChart: any = {
    labels: ['S','M', 'T', 'W', 'T', 'F', 'S'],
    series: [
        [this.revenue_semaine[0], this.revenue_semaine[1],this.revenue_semaine[2],this.revenue_semaine[3],
        this.revenue_semaine[4],this.revenue_semaine[5],this.revenue_semaine[6]]
    ]};
  const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: this.max(this.revenue_semaine), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left:20},
  }

  var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
  this.startAnimationForLineChart(dailySalesChart);
  }
Depense_jour(){
      var now=new Date(); 

      switch (now.getDay()) {
        case 0:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
           break;
        case 1:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8));
           break; 
        case 2:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 9));
          break;
          case 3:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10));
           break;
        case 4:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 11));
           break; 
        case 5:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12));
          break;
        case 6:
           this.Depense_semaine(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13));
          break;
      }
  }
Depense_mois(){
  this.depense_ans=0;
   var now=new Date();
   var y=now.getFullYear();
   for (let p=1;p<=12;p++){
    var s=0;
    for (const i of this.depenses){
      if((Number(i.dat_ret.split('-')[1])==p)&&(Number(i.dat_ret.split('-')[0])<y)){
        s=s+i.montant;       
      }if((Number(i.dat_ret.split('-')[1])<p)&&(Number(i.dat_ret.split('-')[0])<y)&&i.type=="monthly"){
        s=s+i.montant;
      }
    }
    this.depense_mois.push(s);
    this.depense_ans=this.depense_ans+s;
   }
   var dataMonthlyExpensesChart = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    series: [
      [this.depense_mois[0], this.depense_mois[1], this.depense_mois[2], this.depense_mois[3],
      this.depense_mois[4], this.depense_mois[5], this.depense_mois[6], this.depense_mois[7],
      this.depense_mois[8], this.depense_mois[9], this.depense_mois[10], this.depense_mois[11]]
    ]
  };
  var optionsMonthlyExpensesChart = {
      axisX: {
          showGrid: false
      },
      low: 0,
      high: this.max(this.depense_mois),
      chartPadding: { top: 0, right: 5, bottom: 0, left: 20}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var MonthlyExpensesChart = new Chartist.Bar('#MonthlyExpenses', dataMonthlyExpensesChart, optionsMonthlyExpensesChart, responsiveOptions);
  this.startAnimationForBarChart(MonthlyExpensesChart);

}
Depense_semaine(d:Date){
    var y=d.getFullYear();
    for(let p=0;p<7;p++){
      let dd =this.datepipe.transform(d,'yyyy-MM-dd');
      var s:number=0;
      for (const i of this.depenses) {
        if (i.dat_ret==dd){
          s=s+i.montant;
        }if(((Number(i.dat_ret.split('-')[1])<p)||(Number(i.dat_ret.split('-')[0])<=y))&&(Number(i.dat_ret.split('-')[2])==Number(dd.split('-')[2]))&&(i.type=="monthly")){
          s=s+i.montant;
        }
      }
      this.depense_semaine.push(s);
      d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
    }
    const dataDailyExpensesChart: any = {
      labels: ['S','M', 'T', 'W', 'T', 'F', 'S'],
      series: [
          [this.depense_semaine[0], this.depense_semaine[1],this.depense_semaine[2],this.depense_semaine[3],
          this.depense_semaine[4],this.depense_semaine[5],this.depense_semaine[6]]
      ]};
    const optionsDailyExpensesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: this.max(this.depense_semaine), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 20},
    }
    var dailyExpensesChart = new Chartist.Line('#DailyExpenses', dataDailyExpensesChart, optionsDailyExpensesChart);
    this.startAnimationForLineChart(dailyExpensesChart);
    }

    max(array:number[]):number{
    var m:number =0;
    for (var i=0;i<array.length;i++) {
      if (array[i]>m){m=array[i];}
    }
    return(m);
    }

}
