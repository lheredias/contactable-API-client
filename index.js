import DOMHandler from "./scripts/dom-handler.js";
import LoginPage from "./scripts/pages/login-page.js";
import HomePage from "./scripts/pages/home-page.js";

import { createUser } from "./scripts/services/users-service.js";
import { tokenKey, userEmail } from "./scripts/config.js";
import STORE from "./scripts/store.js";

async function init() {
  try{
    let token = sessionStorage.getItem(tokenKey)
    if(!token) throw new Error()
    STORE.user = sessionStorage.getItem(userEmail)

    // STORE.user = sessionStorage.getItem(userEmail)

    // console.log(STORE.user.email)
    // const user = await getUser()
    // STORE.user = user

    await STORE.fetchContacts();
    DOMHandler.load(HomePage)
  } catch(error) {
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(userEmail);
    DOMHandler.load(LoginPage)
  }
}

init()
