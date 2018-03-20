import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';

export class AuthService{

    token: string;
    constructor(private router: Router, private afAuth: AngularFireAuth,
        private afs: AngularFirestore){
    }

    signupUser(email: string , password:string){
     console.log(email);
       this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch(
            error=> console.log(error)
        )
    }

    signinUser(email: string , password:string){
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
         .then(
             response => {
                this.afAuth.auth.currentUser.getToken()
                    .then(
                        (token: string) => this.token = token
                    )
                    this.router.navigate(['/home']); //if successfuly logged-in, redirect to Home page
             }    
         ).catch(
             error=> console.log(error)
         );
         
     }

     getToken(){
         this.afAuth.auth.currentUser.getIdToken()
         .then(
            (token: string) => this.token = token
        )
        return this.token;
     }
     
     isAuthenticated(){
         return this.token! = null;
     }

     logout(){
         this.afAuth.auth.signOut();
         this.token = null;
     }
}