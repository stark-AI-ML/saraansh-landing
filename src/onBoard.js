

import { AuthHandler } from "./firebaseLogin";

function signINGoogle(){
    console.log("SignIn Working"); 
    const signIn  = new AuthHandler(); 
    signIn.signInWithGoogle(); 
}


const signIn = document.getElementById("SignINWithGoogle"); 
signIn.addEventListener('click',()=>{
    signINGoogle(); 
}); 