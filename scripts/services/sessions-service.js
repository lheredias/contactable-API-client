import { tokenKey, userEmail } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function login(credentials = { email, password }) {
  const {token, ...user} = await apiFetch("login", { body: credentials })
  sessionStorage.setItem(tokenKey, token)
  sessionStorage.setItem(userEmail, user.email)
  return user;
}

export async function logout(){
  const data = await apiFetch("logout", { method: "DELETE" })
  sessionStorage.removeItem(tokenKey)
  sessionStorage.removeItem(userEmail)
  return data
}