import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  user : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.user = new FormGroup({
      fullName : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
    });
  }
  
  register(){
    return console.log('You Have Been Successfully Registered');
  }
}
