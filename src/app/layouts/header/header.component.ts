import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userEmail!:string;

  isLoggedIn$! : Observable<boolean>

  constructor(private authService:AuthService) {}

  ngOnInit() {
//    console.log( JSON.parse(localStorage.getItem('user') as  string).email)
    this.userEmail=JSON.parse(localStorage.getItem('user')  as string).email!
    console.log('this.userEmail:',this.userEmail)

    this.isLoggedIn$=this.authService.isLoggedIn()
  }

onLogOut(){
  this.authService.logout()
}

}
