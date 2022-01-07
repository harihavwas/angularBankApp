import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users:any = {
    1000:{uname:"User1",acno:1000,email:"user1@gmail.com",phone:9876543210,password:"0000",balance:5000},
    1001:{uname:"User2",acno:1001,email:"user2@gmail.com",phone:9876543210,password:"0000",balance:5000},
    1002:{uname:"User3",acno:1002,email:"user3@gmail.com",phone:9876543210,password:"0000",balance:5000},
    1003:{uname:"User4",acno:1003,email:"user4@gmail.com",phone:9876543210,password:"0000",balance:5000}
  }

  constructor() { }

  register(uname:any,acno:any,email:any,phone:any,password:any){
    let db = this.users
    if (acno in db){
      return false
      
    }
    else
    {
      db[acno]={
        uname,
        acno,
        email,
        phone,
        password,
        balance:0
      }
      return true
      
    }
  }

  login(acno:any,password:any){
    let database = this.users
     if(acno in database){
       if (password == database[acno]["password"]){
         return true
       }
       else{
         
         alert("Incorrect password")
         return false
       }
     }
     else{
       alert("Invalid Input")
       return false
     }
  }

  deposite(d_acno:any,d_amount:any,d_pswd:any){
    let db = this.users
    if (d_acno in db){
      if (d_pswd == db[d_acno]["password"]){
        db[d_acno]["balance"] = db[d_acno]["balance"] + d_amount
        return db[d_acno]["balance"]
      }
      else{
        alert("Incorrect password")
        return false
      }
    }
    else{
      alert("Account doesn't exist !")
      return false
    }
  }

  withdraw(w_acno:any,w_amount:any,w_pswd:any){
    let db = this.users
    if (w_acno in db){
      if (w_pswd == db[w_acno]["password"]){
        db[w_acno]["balance"] = db[w_acno]["balance"] - w_amount
        return db[w_acno]["balance"]
      }
      else{
        alert("Password Incorrect")
        return false
      }
    }
    else{
      alert("Account doesn't exist")
      return false
    }
  }
}
