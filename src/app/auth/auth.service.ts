import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject}    from 'rxjs/Subject';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{

    public hasError: boolean = false; 
    token: string;
    uid: string;
    
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
        firebase.auth().signInWithEmailAndPassword(email, password)
         .then(
             response => {
                this.afAuth.auth.currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    ) 
                    this.router.navigate(['/home']);             
             }    
         )
         .catch(function(error) {
            console.log("Error from Auth Service: " + error);
            this.hasError = true;
            //throw Observable.throw(error);
         });
     }

     getToken(){
         firebase.auth().currentUser.getIdToken()
         .then(
            (token: string) => this.token = token
        )
        //let token = localStorage.getItem( this.token);
        return this.token;
     }
     
     isAuthenticated(){
        console.log( "Token from firebase: " + this.token);
        const userKey = Object.keys(window.localStorage)
                .filter(it => it.startsWith('firebase:authUser'))[0];
        const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
        console.log( "Token from storage: " + user);
        if(user!= undefined)
            return true;
        else
            return false;
     }

     logout(){
         //localStorage.removeItem('firebase:authUser');
         firebase.auth().signOut();
         this.token = null;
     }

     getUidOfCurrentDoctor(){
        console.log("getUidOfCurrentDoctor");
        if (this.afAuth.auth.currentUser!=null) {
            console.log(this.afAuth.auth.currentUser.uid);
            return this.afAuth.auth.currentUser.uid;
        }
        else{
            console.log("null user");
            return null;
        }
     }
}