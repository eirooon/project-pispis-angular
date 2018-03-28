import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject}    from 'rxjs/Subject';

export class AuthService{

    token: string;
    uid: string;
    private signInIndicator = new Subject<string>();
    signInIndicator$ = this.signInIndicator.asObservable();
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

    signinUser(email: string , password:string):Observable<any>{
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
         .then(
             response => {
                this.afAuth.auth.currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )              
                    console.log("Successful sign in");
                    this.router.navigate(['/home']);
             }    
         )
         .catch((err:Response) => {
            return Observable.throw(err);
         });
         this.signInIndicator.next(this.token);
         return  this.signInIndicator$;
     }

     getToken(){
         this.afAuth.auth.currentUser.getIdToken()
         .then(
            (token: string) => this.token = token
        )
        let token = localStorage.getItem( this.token);
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
         this.afAuth.auth.signOut();
         this.token = null;
     }
}