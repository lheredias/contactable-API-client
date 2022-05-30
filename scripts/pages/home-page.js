import Contacts from "../components/contacts.js";
import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";
import CreatePage from "./create-page.js";

function render() {
  return `
    <main >
      <section>
        <div class="header border-none">
          <h1 class="title-page font-size-20 gray-9 border-none">Contactable</h1>
          <a class="button-signup blue font-size-12" href="#" data-action="logout">Logout</a>
        </div>
        <div class="js-navigation contacts-container">
          ${Contacts}
        </div>
        <div class="button-container">
          <div class="button-holder">
            <button class="button-add-contact" href="#" data-action="new"></button>
          </div>
            
        </div>
      </section>
    </main>
  `;
}

function listenLogout() {
  const logoutLink = document.querySelector('[data-action="logout"]')
  logoutLink.addEventListener("click", async (event) => {
    try {
      event.preventDefault()
      await logout()
      DOMHandler.load(LoginPage)
    } catch(error) {
      console.log(error)
      DOMHandler.reload()
    }
  })
}

function listenNewContact() {
  const newContactLink = document.querySelector('[data-action="new"]')
  newContactLink.addEventListener("click", (event) => {
    event.preventDefault()
    DOMHandler.load(CreatePage)
    // TO DO
    // DOMHandler.load(LoginPage)
  })
}

const HomePage = {
  toString() {
    return render()
  },
  addListeners() {
    listenLogout()
    listenNewContact()
    Contacts.addListeners()
  }
}

export default HomePage;