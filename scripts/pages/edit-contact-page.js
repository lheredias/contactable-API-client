import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";
import { editContact } from "../services/contacts-service.js";
import { input, select } from "../components/input.js";
import ContactDetailPage from "./contact-detail-page.js";

function render() {
  const { emailError, numberError } = EditContactPage.state;

  return `
    <main >
      <section>
        <div class="header">
          <h1 class="title-page font-size-20 gray-9">Edit contact</h1>
          <a class="button-signup blue font-size-12" href="#" data-action="logout">Logout</a>
        </div>
        <form class="js-edit-form">
          ${input({
            id: "name",
            type: "text",
            placeholder: "Name",
            required: true,
            value: STORE.contactDetail.name
          })}

          ${input({
            id: "number",
            type: "text",
            placeholder: "Number",
            required: true,
            value: STORE.contactDetail.number
          })}

          ${numberError ? 
            `<p class="input-container" style="color:red;">${numberError}</p>`: ''
          }

          ${input({
            id: "email",
            type: "email",
            placeholder: "Email",
            required: true,
            value: STORE.contactDetail.email
          })}

          ${emailError ? 
            `<p class="input-container" style="color:red;">${emailError}</p>`: ''
          }

          ${select({
            id: "relation",
            value: STORE.contactDetail.relation
          })}

          <div class="footer">
            <button class="button-login blue font-size-12">Save</button>
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
    DOMHandler.load(ContactDetailPage)
  })
}

function listenEditContact() {
  const form = document.querySelector('.js-edit-form')
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault()
      const { name, number, email, relation } = event.target;
      const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (validRegex.test(email.value)==false) {
        throw new Error(JSON.stringify({"email":["is not a valid email"]}))
      }
      const body = {
        name: name.value,
        number: number.value,
        email:email.value,
        relation:relation.value
      }
      const id = STORE.contactDetail.id
      await editContact(id,body)
      await STORE.fetchContacts()
      STORE.getContactDetail(id)
      alert("Contact successfully edited")
      DOMHandler.load(ContactDetailPage)
    } catch(error) {
      let errorDetail = JSON.parse(error.message)
      if (errorDetail.number) {
        EditContactPage.state.numberError = number.value +" "+ errorDetail.number
      }
      if (errorDetail.email) {
        EditContactPage.state.emailError = email.value +" "+ errorDetail.email
      }
      DOMHandler.reload()
    } 
  })
}

const EditContactPage = {
  toString() {
    return render()
  },
  addListeners() {
    listenLogout()
    listenCancel()
    listenEditContact()
  },
  state: {
    emailError: null,
    numberError: null,
  }
}

export default EditContactPage;