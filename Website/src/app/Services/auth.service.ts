import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>; 

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.user = this.afAuth.authState;
  }

  async SignIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async SignUp(user: User, password: string) : Promise<User> {
    let uid: string;
    let error: string;

    await this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
    .then(res => {
      uid = res.user.uid;
      user.uid = uid;
      this.CreateOrUpdateUser(user);
    })
    .catch(err => error = err.message);

    return new Promise((resolve, reject) => {
      if (error != undefined) reject(error);
      resolve(user);
    });
  }

  async SignOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  IsLoggedIn(): boolean {
    return this.afAuth.auth.currentUser == null ? false : true;
  }

  GetCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  CreateOrUpdateUser(user: User) {
    let docRef = this.afs.collection('users').doc(user.uid);
    docRef.set({
      email: user.email,
      name: user.name,
      firstname: user.firstname,
      company: user.company,
      adres: user.adres,
      postalcode: user.postalcode,
      creditcard: user.creditcard,
      cvc: user.cvc
    });
  }

  async GetCurrentUserData(): Promise<User> {
    let uid = this.GetCurrentUser().uid;
    let result: User;
    
    await this.afs.collection('users').doc(uid).get().toPromise()
    .then(snapshot => {
      let data: any = snapshot.data();
      result = {
        uid: uid,
        email: data.email,
        name: data.name,
        firstname: data.firstname,
        company: data.company,
        adres: data.adres,
        postalcode: data.postalcode,
        creditcard: data.creditcard,
        cvc: data.cvc
      };
    });

    return new Promise<User>(resolve => {
      resolve(result);
    })
  }
}

export interface User {
  uid?: string,
  email: string,
  name: string,
  firstname: string,
  company: string,
  adres: string,
  postalcode: string,
  creditcard: string,
  cvc: string
}