import { Component, OnInit } from '@angular/core';
import { FbService } from '../fb.service';

@Component({
  selector: 'app-gov-sites',
  templateUrl: './gov-sites.component.html',
  styleUrls: ['./gov-sites.component.css']
})
export class GovSitesComponent implements OnInit {

  selectedCountry: string = this.fb.countries[0];
  mobile = false;

  constructor(public fb : FbService) {

  }

  ngOnInit(): void {
  }

  clickme(){

  }

  clearSearch(){
    this.selectedCountry = "";
  }

  changeCountry(e:any):void {

    //alert(e.target.value);
  }

  selectCountry(i : number){
    alert(this.fb.countries[i]);
  }

}
