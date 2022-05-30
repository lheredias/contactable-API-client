import { getContacts } from "./services/contacts-service.js"

async function fetchContacts() {
  const contacts = await getContacts()
  contacts.sort((a,b)=>(a.name.toLowerCase() < b.name.toLowerCase()) ? -1:1) // Sorted in alphabetical order
  this.favoriteContacts = contacts.filter( contact => contact.favorite == true);
  this.normalContacts = contacts.filter( contact => contact.favorite == false);
}

async function getContactDetail(id) {
  let [contact] = this.normalContacts.filter(contact => contact.id == id)
  if (contact==undefined) {
    [contact] = this.favoriteContacts.filter(contact => contact.id == id)
  }
  this.contactDetail = contact
}

async function removeContact(id) {
  let [contact] = this.normalContacts.filter(contact => contact.id == id)
  if (contact==undefined) {
    [contact] = this.favoriteContacts.filter(contact => contact.id == id)
    this.favoriteContacts = this.favoriteContacts.filter(contact => contact.id != id)
  } else {
    this.normalContacts = this.normalContacts.filter(contact => contact.id != id)
  }
}

function updateFavoriteContacts(id) {
  
  let [contact] = this.normalContacts.filter(contact => contact.id == id)
  if (contact==undefined) {
    [contact] = this.favoriteContacts.filter(contact => contact.id == id)
    this.favoriteContacts = this.favoriteContacts.filter(contact => contact.id != id)
    this.normalContacts.push(contact)
    contact.favorite = false
  } else {
    this.normalContacts = this.normalContacts.filter(contact => contact.id != id)
    this.favoriteContacts.push(contact)
    contact.favorite = true
  }
}
  

const STORE = {
  user: null,
  contactDetail: null,
  favoriteContacts:[],
  normalContacts:[],
  fetchContacts,
  updateFavoriteContacts,
  getContactDetail,
  removeContact,
};

export default STORE;