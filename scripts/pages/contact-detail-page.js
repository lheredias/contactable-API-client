import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";
import HomePage from "./home-page.js"
import EditContactPage from "./edit-contact-page.js"

import { deleteContact } from "../services/contacts-service.js";

function render() {
  const contact = STORE.contactDetail
  return `
    <main >
      <section>
        <div class="header">
          <h1 class="title-page font-size-20 gray-9">Contact Detail</h1>
          <a class="button-signup blue font-size-12" href="#" data-action="logout">Logout</a>
        </div>
        <div class="details-container js-contact-detail">
          <img src="/assets/icon-contact.png" alt="" class="icon-contact-detail center">
          <h3 class="font-size-16 gray-9 center name">${contact.name}</h3>
          <h5 class="font-size-12 ag center relation">${contact.relation}</h5>
          <p class="font-size-12 ag center number">Number: ${contact.number}</p>
          <p class="font-size-12 ag center email">Email: ${contact.email}</p>
        </div>
        <div class="js-actions footer">
          <a class="button-signup blue font-size-12" href="#" data-action="back">Back</a>
          <a class="button-signup blue font-size-12" href="#" data-delete_id=${contact.id}>Delete</a>
          <a class="button-signup blue font-size-12" href="#" data-action="edit">Edit</a>
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

function listenBack() {
  const logoutLink = document.querySelector('[data-action="back"]')
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault()
    DOMHandler.load(HomePage)
  })
}

function listenEdit() {
  const editLink = document.querySelector('[data-action="edit"]')
  editLink.addEventListener("click", (event) => {
    event.preventDefault()
    DOMHandler.load(EditContactPage)
  })
}

function listenDelete() {
  const actionLinks = document.querySelector(".js-actions")

  actionLinks.addEventListener("click", async (event) => {
    try {
      const deleteLink = event.target.closest("[data-delete_id]")
      if(!deleteLink) return;
      const id = deleteLink.dataset.delete_id
      event.preventDefault()
      await deleteContact(id)
      STORE.removeContact(id)
      alert("Contact successfully deleted")
      DOMHandler.load(HomePage)
    } catch(error) {
      let errorDetail = JSON.parse(error.message)
      console.log(errorDetail)
      DOMHandler.reload()
    }
  })
}

const ContactDetailPage = {
  toString() {
    return render()
  },
  addListeners() {
    listenLogout()
    listenBack()
    listenDelete()
    listenEdit()
    // Contacts.addListeners()
  }
}

export default ContactDetailPage;