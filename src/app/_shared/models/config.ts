import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Config {
  constructor() { }
  prodApiUrl = 'http://api.somedomain.com/api/';
  devApiUrl = 'http://localhost:5000';
  prodUrl = 'http://somedomain.com';
  devUrl = 'http://localhost:4200';
  facebook = 'https://www.facebook.com/SomeFacebookUrl';
  instagram = 'https://www.instagram.com/SomeInstagramUrl';
  twitter = 'https://twitter.com/SomeTwitterUrl';
}
