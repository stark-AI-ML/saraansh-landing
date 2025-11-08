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

function triggerDownload() {
  const link = document.createElement("a");
  link.href = "/assets/dist.zip"; //
  link.download = "saraansh.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("document loaded");
  const auth = await GetAuth();
  if (auth) {
    console.log("looged in do your stuff");
  } else {
    const signIn = document.getElementById("SignINWithGoogle");
    signIn.addEventListener("click", async () => {
      GetAuth();
      await signInGoogle();
      triggerDownload();
    });
  }
});
