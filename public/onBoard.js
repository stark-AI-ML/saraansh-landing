import { AuthHandler } from "./firebaseLogin";

async function signInGoogle() {
  console.log("SignIn Working");
  const auth = new AuthHandler();
  await auth.signInWithGoogle();
  return "signed IN";
}

document.addEventListener("DOMContentLoaded", async () => {

  console.log("document loaded");

  const signIn = document.getElementById("SignINWithGoogle");
  signIn.addEventListener("click", async () => {
    await signInGoogle();
    window.location.href = "./downloadZip.html";
  });
});
