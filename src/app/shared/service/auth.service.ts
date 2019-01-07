import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Logger } from './logger.service';

@Injectable()
export class AuthService {

    CLASSNAME: string = this.constructor.name;
    token: string;
    uid: string;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private logger: Logger
    ) {
    }

    /**
     * Method: signupUser
     * Description: Signs up new user
     * @param email 
     * @param password
     * @return void
     */
    signupUser(email: string, password: string) {
        this.logger.info(this.CLASSNAME, "signupUser", "Email: " + email + "] Password: [" + password + "]");
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.logger.error(this.CLASSNAME, "signupUser", error);
                throw error
            })
    }

    /**
     * Method: signupUser
     * Description: Process sign in of user
     * @param email 
     * @param password 
     * @return void
     */
    signinUser(email: string, password: string) {
        this.logger.info(this.CLASSNAME, "signinUser", "Email: " + email + "] Password: [" + password + "]");
        this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.afAuth.auth.currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                    this.logger.info(this.CLASSNAME, "signinUser", "Token: " + this.token);
                }
            )
            .catch(error => {
                this.logger.error(this.CLASSNAME, "signinUser", error);
                throw error
            });
    }

    /**
     * Method: getToken
     * Description: Retrieve ID token of current user
     * @return token
     */
    getToken() {
        this.afAuth.auth.currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            )
        this.logger.info(this.CLASSNAME, "getToken", "Token: " + this.token);
        return this.token;
    }

    /**
     * Method: isAuthenticated
     * Description: Check if user is Authenticated
     * @return boolean
     */
    isAuthenticated() {
        this.logger.info(this.CLASSNAME, "isAuthenticated", "Authenticated");
        // const userKey = Object.keys(window.localStorage)
        //     .filter(it => it.startsWith('firebase:authUser'))[0];
        // const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
        // console.log("Token from storage: " + user);
        // if (user != undefined)
        //     return true;
        // else
        //     return false;

        //check if user is already logged in
        return this.afAuth.authState
            .take(1)
            .map(user => !!user)
            .do(loggedIn => {
                if (!loggedIn) {
                    return false;
                }
                else {
                    return true;
                }
            })
    }

    /**
     * Method: logout
     * Description: Process user logout
     * @return void
     */
    logout() {
        this.logger.info(this.CLASSNAME, "logout", "Logout");
        localStorage.removeItem('firebase:authUser');
        localStorage.removeItem('ptID');
        this.afAuth.auth.signOut();
        this.token = null;
    }

    /**
     * Method: getUidOfCurrentDoctor
     * Description: Retrieves UID of current doctor
     * @return userUid
     */
    getUidOfCurrentDoctor() {
        this.logger.info(this.CLASSNAME, "getUidOfCurrentDoctor", "Get UID of Current Doctor");
        if (this.afAuth.auth.currentUser != null) {
            console.log(this.afAuth.auth.currentUser.uid);
            return this.afAuth.auth.currentUser.uid;
        }
        else {
            this.logger.error(this.CLASSNAME, "getUidOfCurrentDoctor", "User is NULL");
            return null;
        }
    }
}