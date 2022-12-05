import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  breadcrumbs = '<div class="container-fluid">' +
    '< nav aria - label="breadcrumb" >' +
    '<ol class="breadcrumb" >' +
    '<li class="breadcrumb-item nav-text bread-crumb" > <a href="#" > Home < /a></li >' +
    '<li class="breadcrumb-item nav-text bread-crumb active" aria - current="page" > Library < /li>' +
    '< /ol>' +
    '< /nav>' +
    '< /div>'

  constructor() { }

  ngOnInit(): void {
  }

}
