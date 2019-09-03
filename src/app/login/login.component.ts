import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('Success!');
    console.log(signInSuccessData.authResult.user.uid);

  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('Error!');
    console.log(errorData);

  }

}
