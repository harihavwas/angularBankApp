import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  aim = "Your perfect banking partner"
  uname = ""
  acno = ""
  email = ""
  phone = ""
  pswd = ""

  registerForm = this.fb.group(
    {
      uname: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      pswd: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    }
  )
  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {

    if (this.registerForm.valid) {
      var uname = this.registerForm.value.uname
      var acno = this.registerForm.value.acno
      var email = this.registerForm.value.email
      var phone = this.registerForm.value.phone
      var pswd = this.registerForm.value.pswd

      let result = this.ds.register(uname, acno, email, phone, pswd)
      if (result) {
        alert("Account registered Successfully")
        this.router.navigateByUrl("")
      }
      else {
        alert("Account alerady exist")
      }
    }
    else {
      alert("Invalid entry")
    }





  }

}
