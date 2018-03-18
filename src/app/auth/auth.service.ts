
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

export class AuthService{

    private afAuth: AngularFireAuth;
    /*constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore){

    }*/

    signupUser(email: string , password:string){
       this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch(
            error=> console.log(error)
        )
    }
    signinUser(email: string , password:string){
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
         .then(
             response => console.log(response)
         ).catch(
             error=> console.log(error)
         )
     }


}