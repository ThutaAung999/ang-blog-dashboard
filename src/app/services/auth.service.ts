import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean> (false)
  isLoggedInGuard:boolean=false;

  constructor(private afAuth:AngularFireAuth,
              private toastr:ToastrService,
              private router:Router) { }

  login(email:string , password:string){
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef=>{
      this.toastr.success('Login successflly');
      this.loadUser();

      this.loggedIn.next(true)
      this.isLoggedInGuard=true;

      this.router.navigate(['/'])
    }).catch(e=>{
      this.toastr.warning(e)
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      /*console.log(JSON.parse(JSON.stringify(user)))*/
      localStorage.setItem('user',JSON.stringify(user))

    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success('User logout successfully')
      localStorage.removeItem('user')

      this.loggedIn.next(false)
      this.isLoggedInGuard=false;

      this.router.navigate(['/login'])
    })
  }

  isLoggedIn( ) {
    return this.loggedIn.asObservable()
  }
}
