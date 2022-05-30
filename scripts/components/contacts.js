import DOMHandler from "../dom-handler.js";
import { contactDetail, favoriteContact } from "../services/contacts-service.js";
import STORE from "../store.js"
import ContactDetailPage from "../pages/contact-detail-page.js";

function countNormalContacts() {
  const normalContacts = STORE.normalContacts
  return normalContacts.length
}

function renderContact(contact) {
  let button = "favorite"
  if (contact.favorite==true) button = "unfavorite"
  return `
    <li class="">
      <div class="contact">
        <div class="contact">
          <div class="contact-name">
            <img src="/assets/icon-contact.png" alt="" class="icon-contact">
          </div>
          <div class="contact-name">
            <a class="contact-home-page font-size-12 gray-9" href="#" data-detail_id=${contact.id}>${contact.name}</a>
          </div>
        </div>
        <div class="contact-name">
          <button class=${button} data-favorite_id=${contact.id}></button>
        </div>
      </div>
    </li>`;
}

function render() {
  const favoriteContacts = STORE.favoriteContacts
  const normalContacts = STORE.normalContacts
  let favorites = `
    <div>
      <h2 class="h2-home-page font-size-12 ag">FAVORITES</h2>
      ${favoriteContacts.map(renderContact).join("")}
    </div>
    `
  if (favoriteContacts.length==0) favorites=""
  return `
    <ul class="js-contact-list contact-list">
      ${favorites}
      <div>
        <h2 class="h2-home-page font-size-12 ag">CONTACTS (${countNormalContacts()})</h2>
        ${normalContacts.map(renderContact).join("")}
      </div>
    </ul>
  `
}

function listenContactDetail() {
  const ul = document.querySelector(".js-contact-list")

  ul.addEventListener("click", async (event) => {
    event.preventDefault()
    
    const detailLink = event.target.closest("[data-detail_id]")
    if(!detailLink) return;
    const id = detailLink.dataset.detail_id
    let detail = await contactDetail(id)
    // TO DO
    STORE.getContactDetail(id)
    DOMHandler.load(ContactDetailPage)
  })
}

function listenContactFavorite() {
  const ul = document.querySelector(".js-contact-list")

  ul.addEventListener("click", async (event) => {
    try {
      event.preventDefault()
      const favoriteLink = event.target.closest("[data-favorite_id]")
      if(!favoriteLink) return;
      const id = favoriteLink.dataset.favorite_id
      let favorite = await favoriteContact(id)
      STORE.updateFavoriteContacts(id)
      // console.log(STORE.normalContacts)
      // await STORE.fetchContacts()
      DOMHandler.reload()
    } catch(error) {
      console.log(error)
    }
    
  })
}

const Contacts = {
  toString() {
    return render();
  },
  addListeners(){
    listenContactDetail()
    listenContactFavorite()
  }
}

export default Contacts;