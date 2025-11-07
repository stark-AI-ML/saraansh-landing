import { AuthHandler } from "./firebaseLogin";

function signINGoogle() {
  console.log("SignIn Working");
  const auth = new AuthHandler();
  auth.signInWithGoogle();
}

function GetAuth() {
  const auth = new AuthHandler();
  const result = auth.GetAuth();
  if (result) {
    triggerDownload();
    return true;
  } else return false;
}

function triggerDownload() {
  const link = document.createElement("a");


  link.href = "../public/assets/dist.zip";

  link.download = "dist.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const signIn = document.getElementById("SignINWithGoogle");
signIn.addEventListener("click", () => {
  const auth = GetAuth();
  if (auth) {
    console.log("Auth exisits already logged in");
  } else {
    signINGoogle();
  }
});
