import apiFetch from "./api-fetch.js";
import STORE from "../store.js"

export function getContacts() {
  return apiFetch("contacts")
}

export function favoriteContact(id) {
  const [contact] = STORE.normalContacts.filter(contact => contact.id == id)
  let updatedContact = { "favorite":true }
  if (contact==undefined) {
    updatedContact = { "favorite":false }
  } 
  return apiFetch("contacts/" + id, { method: "PATCH", body: updatedContact });
}

export function editContact(id,updatedContact) {
  console.log(updatedContact)
  return apiFetch("contacts/" + id, { method: "PATCH", body: updatedContact });
}

export function createContact(newContact = { name, email, number, relation }){
  console.log(newContact)
  return apiFetch("contacts", { body: newContact })
}

export function contactDetail(id) {
  return apiFetch("contacts/" + id);
}

export function deleteContact(id) {
  return apiFetch("contacts/" + id, { method: "DELETE" });
}