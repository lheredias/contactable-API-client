import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";
import { createContact } from "../services/contacts-service.js";
import { input, select } from "../components/input.js";
import HomePage from "./home-page.js"

function render() {
  const { emailError, numberError } = CreatePage.state;

  return `
    <main >
      <section>
        <div class="header">
          <h1 class="title-page font-size-20 gray-9">Create New Contact</h1>
          <a class="button-signup blue font-size-12" href="#" data-action="logout">Logout</a>
        </div>
        <form class="js-create-form">
          ${input({
            id: "name",
            type: "text",
            placeholder: "Name",
            required: true,
            value: ""
          })}

          ${input({
            id: "number",
            type: "text",
            placeholder: "Number",
            required: true,
            value: ""
          })}

          ${numberError ? 
            `<p class="input-container" style="color:red;">${numberError}</p>`: ''
          }

          ${input({
            id: "email",
            type: "email",
            placeholder: "Email",
            required: true,
            value: ""
          })}

          ${emailError ? 
            `<p class="input-container" style="color:red;">${emailError}</p>`: ''
          }

          ${select({
            id: "relation",
            required: true,
          })}

          <div class="footer">
            <button class="button-login blue font-size-12">Create</button>
            <button class="button-login blue font-size-12" data-action="cancel">Cancel</button>
          </div>
        </form>
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

function listenCancel() {
  const logoutLink = document.querySelector('[data-action="cancel"]')
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault()
    DOMHandler.load(HomePage)
  })
}

function listenCreateNewContact() {
  const form = document.querySelector('.js-create-form')
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault()
      const { name, number, email, relation } = event.target;
      const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (validRegex.test(email.value)==false) {
        console.log("entered here")
        throw new Error(JSON.stringify({"email":["is not a valid email"]}))
      }
      const body = {
        name: name.value,
        number: number.value,
        email:email.value,
        relation:relation.value
      }
      await createContact(body)
      // throw new Error()
      await STORE.fetchContacts()
      alert("Contact successfully created")
      // ============== VERY USEFUL LINE ==============
      // await new Promise(resolve => setTimeout(resolve, 2000))
      // ============== VERY USEFUL LINE ==============
      DOMHandler.load(HomePage)
    } catch(error) {
      console.log(error)
      let errorDetail = JSON.parse(error.message)
      if (errorDetail.number) {
        CreatePage.state.numberError = number.value +" "+ errorDetail.number
      }
      if (errorDetail.email) {
        CreatePage.state.emailError = email.value +" "+ errorDetail.email
      }
      DOMHandler.reload()
    } 
  })
}

const CreatePage = {
  toString() {
    return render()
  },
  addListeners() {
    listenLogout()
    listenCancel()
    listenCreateNewContact()
  },
  state: {
    emailError: null,
    numberError: null,
  }
}

export default CreatePage;