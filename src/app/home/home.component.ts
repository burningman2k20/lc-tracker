import { Component, Input, OnInit, Output } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import Swal from 'sweetalert2';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';
import { FbService } from '../fb.service';
import Symptom from '../shared/Symptom';
import  emailjs  from '@emailjs/browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// interface Item {
//   name: string,
//   //...
// };
export class HomeComponent implements OnInit {


  users = ['one', 'two', 'three', 'four', 'five', 'six'];
  mobile = false;

  radio: number = 0;
  condition = false;
  @Input() selectedCountry : string = this.fb.countries[0];
  docID : string = '';
  to_email : string = "";
  @Input() localStateProv : string = "none";
    //item: Observable<Item[]>;

  constructor(public fb:FbService, private firestore: AngularFirestore) {
    //const collection = firestore.collection(getFirestore, 'items');
    //this.item = firestore.collectionData(collection);
    //this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    this.fb.getAll();
    const userAgent = navigator.userAgent;
console.log(userAgent);
if(/Android/i.test(userAgent)) {
  this.mobile = true;
  //alert('Mobile CHROME USER');
  }
else if(/Chrome/i.test(userAgent)) {
  this.mobile = false;
//alert('DESKTOP CHROME USER');
}
  }

  sendConfirmation(id : string){
    var templateParams = {
      name: 'James',
      notes: 'Check this out!',
      confirmationID : id,
      to_email : this.to_email
  };

  // alert(this.to_email);
  // alert(id);
  // return;

  emailjs.send('service_bmn9l8r', 'template_9zey7g5', templateParams)
      .then(function(response: { status: any; text: any; }) {
         console.log('SUCCESS!', response.status, response.text);
         alert('Email Confirmation Sent. Thank you');
      }, function(error: any) {
         console.log('FAILED...', error);
      });
  }

  loadRecord(){
    alert(this.docID);
    for(let i = 0;i < this.fb.allRecords.length;i++){
      if (this.fb.allRecords[i].id == this.docID) {
        this.fb.currentRecord = this.fb.allRecords[i];
        this.localStateProv = this.fb.currentRecord.localStateProv;

    }
  }
}

async clickme() : Promise<void> {
  const { value: fruit } = await Swal.fire({
    title: 'Select Country',
    input: 'select',
    inputOptions: {
      'Countries': this.fb.countries,
      // 'Vegetables': {
      //   potato: 'Potato',
      //   broccoli: 'Broccoli',
      //   carrot: 'Carrot'
      // },
      // 'icecream': 'Ice cream'
    },
    inputPlaceholder: 'Select a Country',
    showCancelButton: true,
    // inputValidator: (value) => {
    //   return new Promise((resolve) => {
    //     if (value === 'oranges') {
    //       resolve(value)
    //     } else {
    //       resolve('You need to select oranges :)')
    //     }
    //   })
    // }
  })

  if (fruit) {
    this.fb.currentRecord.location = this.fb.countries[fruit];
    this.selectedCountry = this.fb.countries[fruit];
    //Swal.fire(`You selected: ${this.fb.countries[fruit]}`)
  }
}

clearCountrySearch(){
  this.selectedCountry = "";
}
  changeCountry(e:any):void {
    this.selectedCountry = e.target.value;
}

  selectCountry(index: number){
    this.selectedCountry = this.fb.countries[index];
    //alert(this.selectedCountry);
  }
  select(index: number, rating : number) {
    var temp = new Symptom();
    temp = this.fb.allSymptoms[index];
    temp.rating = rating;
    if (this.fb.currentRecord.symptoms.length < index + 1) {
      this.fb.currentRecord.symptoms.push(temp);
    } else {
      this.fb.currentRecord.symptoms[index].rating = rating;
    }
    //console.log(this.fb.currentRecord);
  }

  show(index : number){
    alert(index);
  }

  async saveRecord(){
    //alert(this.docID);
    this.selectedCountry = (<HTMLInputElement>document.getElementById("exampleDataList")).value;
    //alert(this.selectedCountry);
    this.fb.currentRecord.localStateProv = this.localStateProv;
    this.fb.currentRecord.location = this.selectedCountry;
    var id = this.fb.addNewRecord(this.fb.currentRecord, this.docID);
    this.sendConfirmation(await id);
  }

}
