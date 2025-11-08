import { AuthHandler } from "../src/firebaseLogin";

async function signInGoogle() {
  console.log("SignIn Working");
  const auth = new AuthHandler();
  await auth.signInWithGoogle();
  return "signed IN";
}

async function GetAuth() {
  console.log("running getAuth");

  const auth = new AuthHandler();
  const result = await auth.GetAuth();
  console.log(result);
  if (result) {
    console.log("hello", result);
    triggerDownload();
    return true;
  }
  return false;
}


document.addEventListener("DOMContentLoaded", async () => {
  console.log("document loaded");
  const auth = await GetAuth();
  if (auth) {
     window.location.href ="downloadZip.html"; 
  } else {
    const signIn = document.getElementById("SignINWithGoogle");
    signIn.addEventListener("click", async () => {
      GetAuth();
      await signInGoogle();
      
      window.location.href ="downloadZip.html"; 
    });
  }
});
