import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  d_acno = ""
  d_amount = ""
  d_pswd = ""

  w_acno = ""
  w_amount = ""
  w_pswd = ""

  depositeForm = this.fb.group(
    {
      d_acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      d_amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      d_pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    }
  )
  withdrawForm = this.fb.group(
    {
      w_acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      w_amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      w_pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    }
  )
  user = this.ds.curentUserName
  bal = this.ds.currentBalance
  

  constructor(private ds: DataService, private fb: FormBuilder) { 
  }

  

  
  ngOnInit(): void {
  }

  deposite() {

    if (this.depositeForm.valid) {
      var d_acno = this.depositeForm.value.d_acno
      var d_amount = this.depositeForm.value.d_amount
      var d_pswd = this.depositeForm.value.d_pswd
      let result = this.ds.deposite(d_acno, d_amount, d_pswd)

      if (result) {
        alert(`Amount credited. Your new balance is : ${result}`)
      }
    }
    else {
      alert("Wrong entry")
    }
  }

  withdraw() {
    if (this.withdrawForm.valid) {
      var w_acno = this.withdrawForm.value.w_acno
      var w_amount = this.withdrawForm.value.w_amount
      var w_pswd = this.withdrawForm.value.w_pswd

      let result = this.ds.withdraw(w_acno, w_amount, w_pswd)

      if (result) {
        alert(`Rs. ${w_amount} have been debited from your account. Your new balance is : ${result}`)
      }
    }
    else {
      alert("Wrong entry")
    }
  }

}
