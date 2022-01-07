import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  curentUserName:any
  currentAcno:any
  currentBalance:any

  users:any = {
    1000:{uname:"User1",acno:1000,email:"user1@gmail.com",phone:9876543210,password:"0000",balance:5000,transaction:[]},
    1001:{uname:"User2",acno:1001,email:"user2@gmail.com",phone:9876543210,password:"0000",balance:5000,transaction:[]},
    1002:{uname:"User3",acno:1002,email:"user3@gmail.com",phone:9876543210,password:"0000",balance:5000,transaction:[]},
    1003:{uname:"User4",acno:1003,email:"user4@gmail.com",phone:9876543210,password:"0000",balance:5000,transaction:[]}
  }
  constructor() {
    this.getDetails()
  }

  // save details to local storage
  saveDetails(){
    if (this.users){
      localStorage.setItem("userDB",JSON.stringify(this.users))
    }
    if(this.curentUserName){
      localStorage.setItem("curentUserName",JSON.stringify(this.curentUserName))
    }
    if (this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if (this.currentBalance){
      localStorage.setItem("curentBalance",JSON.stringify(this.currentBalance))
    }
  }

  // Get details from local storage
  getDetails(){
    if (localStorage.getItem("userDB")){
      this.users = JSON.parse(localStorage.getItem("userDB") || '')
    }
    if (localStorage.getItem("curentUserName")){
      this.curentUserName = JSON.parse(localStorage.getItem("curentUserName") || '')
    }
    if (this.currentAcno){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentBalance")){
      this.currentBalance = JSON.parse(localStorage.getItem("currentBalance") || '')
    }
  }
  getTransaction(){
    return this.users[this.currentAcno]["balance"]
  }

  getBalance(){
    return this.curentUserName = this.users[this.currentBalance]
  }

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
        balance:0,
        transaction:[]
      }
      this.saveDetails()
      return true
      
    }
  }

  login(acno:any,password:any){
    let database = this.users
     if(acno in database){
       if (password == database[acno]["password"]){
         this.currentAcno = acno
         this.curentUserName = database[acno]["uname"]
         this.saveDetails()
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

  deposite(d_acno:any,d_amt:any,d_pswd:any){
    var d_amount = parseInt(d_amt)
    let db = this.users
    if (d_acno in db){
      if (d_pswd == db[d_acno]["password"]){
        db[d_acno]["balance"] = db[d_acno]["balance"] + d_amount
        db[d_acno].transaction.push({
          amount:d_amount,
          type:'Credit'
        })
        this.saveDetails()
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
        db[w_acno].transaction.push({
          amount:w_amount,
          type:'Debit'
        })
        this.saveDetails()
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
