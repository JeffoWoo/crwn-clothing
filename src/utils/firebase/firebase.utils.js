import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDfpxnALOXlGmVh_oG-11IX7UDJlBznB0o",
    authDomain: "crwn-clothing-db-ab1ca.firebaseapp.com",
    projectId: "crwn-clothing-db-ab1ca",
    storageBucket: "crwn-clothing-db-ab1ca.appspot.com",
    messagingSenderId: "673056521306",
    appId: "1:673056521306:web:6309ad3f60500fd9102c63"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account",
  });

  export const auth = getAuth();
  export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  
 export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { 
                displayName, 
                email, 
                createdAt 
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
  }