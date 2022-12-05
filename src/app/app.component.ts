
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FbService } from './fb.service';
import  emailjs  from '@emailjs/browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lc-tracker';
  //items: Observable<any[]>;
  constructor(public fb:FbService, private firestore: AngularFirestore) {
    //this.items = firestore.collection('items').valueChanges();

  }

  ngOnInit(): void {
    emailjs.init("1gZvd3oFRD-4b4IFK");
    //this.fb.getAll();
  }

}
