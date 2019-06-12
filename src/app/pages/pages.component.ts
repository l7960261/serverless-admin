import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  template: `
    <app-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/pages/dashboard',
    },
    {
      title: 'License',
      icon: 'shield-outline',
      link: '/pages/license/create'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
