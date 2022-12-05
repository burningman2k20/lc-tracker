import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

//import * as firebase from 'firebase/app';
import { Timestamp } from '@angular/fire/firestore';

import RecordData from './shared/RecordData';
import Symptom from './shared/Symptom';


class CountryList{
  name : string = "";
  code : string = "";
}

const FLAG_URL = 'assets/flagImages/';

const n_countries : CountryList[] = [
  { name : 'Canada',
    code : 'CA.svg' },

  { name : 'United States',
    code : 'US.svg' },

  { name : 'Russia',
    code : 'RU.svg' },

  { name : 'Abkhazia',
    code : 'AB.svg' },

  { name : 'Ascension Island',
    code : 'AC.svg' },

  { name : 'Andorra',
    code : 'AD.svg' },

  { name : 'United Arab Emirates',
    code : 'AE.svg' },

  { name : 'Afghanistan',
    code : 'AF.svg' },

  { name : "Antigua and Barbuda",
    code : 'AG.svg' },

  { name :  "Anguilla",
    code : 'AI.svg' },

  { name :  "Albania",
    code : 'AL.svg' },

  { name :  "Armenia",
    code : 'AM.svg' },

  { name :  "Angola",
    code : 'AO.svg' },

  { name : "Antarctica",
    code : 'AQ.svg' },

  { name : "Argentina",
    code : 'AR.svg' },

  { name : "American Samoa",
    code : 'AS.svg' },

  { name : "Austria",
    code : 'AT.svg' },

  { name : "Australia",
    code : 'AU.svg' },

  { name : "Aruba",
    code : 'AW.svg' },

   { name :  "Åland Islands",
    code : 'AX.svg' },

    { name : "Azerbaijan",
      code : 'AZ.svg' }

  ];

@Injectable({
  providedIn: 'root'
})



class mydata {
  completed:boolean = false;
  created : Timestamp = new Timestamp(0,0);
  title: string = "";
}


@Injectable()
export class FbService {
  [x: string]: any;

  mobile : boolean = false;
  countries = [
  'United States', 'Canada', 'France', 'Germany', 'United Kingdom', 'Russia', 'China','Abkhazia','Ascension Island',
  'Andorra','United Arab Emirates', 'Afghanistan','Antigua and Barbuda','Anguilla', 'Albania', "Armenia", "Angola",
  "Antarctica","Argentina", "American Samoa","Austria","Australia","Aruba", "Åland Islands","Azerbaijan", "Bosnia and Herzegovina",
  "Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria", "Bahrain",
	 "Burundi", "Benin", "Saint Barthélemy", "Bermuda", "Brunei Darussalam", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Brazil",
	 "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Cocos (Keeling) Islands", "Congo, Democratic Republic of the",
	 "Central African Republic", "Congo", "Switzerland", "Cote d'Ivoire", "Cook Islands", "Chile", "Cameroon", "Colombia", "Costa Rica",
	 "Cuba", "Cape Verde", "Curaçao", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic",
	 "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "European Union", "Finland", "Fiji", "Falkland Islands",
	 "Federated States of Micronesia", "Faroe Islands", "Gabon",  "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland",
	 "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau",
	 "Guyana", "Hong Kong", "Heard Island and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Canary Islands", "Israel",
	 "Isle of Man", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Iceland", "Italy", "Jersey", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan",
	 "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "North Korea", "South Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon",
	 "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Morocco", "Monaco", "Moldova",
	 "Montenegro", "Saint Martin (French Part)", "Madagascar", "Marshall Islands", "North Macedonia", "Mali", "Burma", "Mongolia", "Macao", "Northern Mariana Islands",
	 "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius",
   "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands",
	 "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "South Ossetia", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines",
	 "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn", "Puerto Rico", "Palestine", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania",
	 "Serbia", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard and Jan Mayen",
	 "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "Sao Tome and Principe", "El Salvador", "Sint Maarten",
	 "Syria","Swaziland", "Tristan da Cunha", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan",
	 "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania", "Ukraine", "Uganda",
	 "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Holy See (Vatican City State)", "Saint Vincent and the Grenadines",
	 "Venezuela", "Virgin Islands, British", "Virgin Islands, U.S.", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Kosovo", "Yemen",
	 "Mayotte", "South Africa", "Zambia", "Zimbabwe"];


  SymptomsListCollection = 'SymptomsList';
  RecordsCollection = 'Records';

  items : string[] = [];
  public data : mydata[] = [];

  public allRecords : RecordData[] = [];
  public filteredRecords: RecordData[] = [];
  public allSymptoms: Symptom[] = [];
  public currentRecord = new RecordData();

  constructor(private firestore: AngularFirestore) {
    //this.items = firestore.collection('items').valueChanges();
  }

  getAll(){

    this.firestore.collection(this.SymptomsListCollection).snapshotChanges().subscribe((response) => {
      this.allSymptoms = [];
      response.forEach((task) => {
        var temp = new Symptom();
        temp = task.payload.doc.data() as Symptom;

        //this.data.push(temp);
        this.allSymptoms.push(temp)
        this.currentRecord.symptoms = this.allSymptoms;
       // console.log(task.payload.doc.data());
      })
      this.allSymptoms.sort((a,b) => a.name.localeCompare(b.name))
      //console.log('reponse ', response);
    })
  }

  filterRecords(filter: string, country : string = ""){
    this.filteredRecords = [];

    // if (country != "" && filter != ""){
    //   this.allRecords.forEach(record =>{
    //     if (record.location == country && record.localStateProv == filter){
    //       this.filteredRecords.push(record);
    //     }
    //   })
    // } else
    if ( filter != "") {
    this.allRecords.forEach(record =>{
      if (record.location == country && record.localStateProv == filter){
        this.filteredRecords.push(record);
      }
    })
  } else if (filter == ""){
    //if (filter == ""){
      this.allRecords.forEach(record =>{
        if (record.location == country ){
          this.filteredRecords.push(record);
        }
      })
    }
  }

  getOneRecord(docid : string){

  }

  getAllRecords() {
    this.firestore.collection(this.RecordsCollection).snapshotChanges().subscribe((response) => {
      this.allRecords= [];
      response.forEach((task) => {
        var temp = new RecordData();
        temp = task.payload.doc.data() as RecordData;
        temp.id = task.payload.doc.id;
        this.allRecords.push(temp);
        //console.log(task.payload.doc.data());
      })
      //console.log('reponse ', response);
    })
  }

  async addNewRecord(record : RecordData, docid: string) : Promise<string> {
    var id : string = "";
    //var name = record;
    //record.location = "none";
    //record.name = "someone";
    //alert(docid);
    //var personalInfo = "";
    for(let i = 0;i < record.name.length;i++){
      if (record.symptoms[i].rating == undefined) record.symptoms[i].rating = 0;
    }
    if (docid == ""){
      await this.firestore.collection(this.RecordsCollection).add({name : record.name, location: record.location, localStateProv: record.localStateProv, symptoms: record.symptoms})
      .then(function(docRef) {
        id = docRef.id;
        console.log("Document written with ID: ", docRef.id);
    })
    return id;
    } else {
      await this.firestore.collection(this.RecordsCollection).doc(docid).set({name : record.name, location: record.location,  localStateProv: record.localStateProv, symptoms: record.symptoms});
      return docid;
    }
  }

  getCountryFlag(flag : string) : string {

    for(let i = 0; i < n_countries.length;i++){
      if (n_countries[i].name == flag) {
        return FLAG_URL + n_countries[i].code;
      }
    }
    // this.countries.forEach(country => {

    //   else {
    //     return "";//"https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg";
    //   }
    // })
    return "";//"https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg';
  }

}
