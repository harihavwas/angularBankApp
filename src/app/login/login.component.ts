import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your perfect banking partner"
  accno = "Account number please"
  acno=""
  pswd=""
  users:any = {
    1000:{acno:1000,uname:"user1",password:"0000",balance:5000},
    1001:{acno:1001,uname:"user1",password:"0000",balance:5000},
    1002:{acno:1002,uname:"user2",password:"0000",balance:5000},
    1003:{acno:1003,uname:"user3",password:"0000",balance:5000}
  }

  loginForm = this.fb.group(
    {
      acno: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    }
  )

  constructor(private router:Router,private ds:DataService, private fb:FormBuilder ) { }

  ngOnInit(): void {
  }
  acnoChange(event:any){
    this.acno = event.target.value
    console.log(this.acno);
  }

  pswdChange(event:any){
    this.pswd = event.target.value
    console.log(this.acno);
  }

  login(){

    if (this.loginForm.valid){
      var acno = this.loginForm.value.acno
      var pswd = this.loginForm.value.pswd
      
      let result = this.ds.login(acno,pswd)
  
      if (result){
        alert("Login successfull")
        this.router.navigateByUrl('dashboard')
      }
    }
    else{
      alert("Invalid entry")
    }
   
  }

}
