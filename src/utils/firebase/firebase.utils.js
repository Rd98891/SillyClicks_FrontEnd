import {
    initializeApp
} from "firebase/app";
import {
    getAuth, // get auth instance
    GoogleAuthProvider, // essentially a class for Google provider
    signInWithPopup, // a method
    signInWithRedirect, // a method
    createUserWithEmailAndPassword, // create email with user and password
    signInWithEmailAndPassword, // Sign the user with user and password
    signOut, // singns out the actual user which is signed in
    onAuthStateChanged, // This will listen for a change in state and 
} from 'firebase/auth';
import {
    getFirestore, // get firestore instance
    doc, // to actually get the document from firestore database
    getDoc, // to get the data from firestore document
    setDoc, // to set the data in firestore documnet
    collection, // allows us to get collection reference same as userDoc
    writeBatch, // 
    query, //
    getDocs, //

} from 'firebase/firestore';


// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO7KQEzyK-nfBIhs8EMPOaq3ubvMkZxlk",
  authDomain: "sillyclicks.firebaseapp.com",
  projectId: "sillyclicks",
  storageBucket: "sillyclicks.appspot.com",
  messagingSenderId: "515485109677",
  appId: "1:515485109677:web:27aaba1d0f417407842524"
};


// Initialize Firebase
const SCfirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // provider =>  this is esentially a class

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);


    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('Task Done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {
            title,
            items
        } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}




export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            console.log('Error in setting user', err.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callbackFn) => onAuthStateChanged(auth, callbackFn);