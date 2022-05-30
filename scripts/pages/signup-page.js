import { input } from "../components/input.js";
import { createUser } from "../services/users-service.js"
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js"
import LoginPage from "./login-page.js"

import STORE from "../store.js";

function render() {
  // const { loginError } = this.state;
  const { SignupError } = SignupPage.state;
  return `
    <main>
      <section>
        <h1 class="title-page font-size-20 gray-9">Signup</h1>
        <form class="js-signup-form">

          ${input({
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
            value: ""
          })}

          ${input({
            id: "password",
            type: "password",
            placeholder: "password",
            required: true,
            value: ""
          })}

          ${SignupError ? 
            `<p>${SignupError}</p>`: ''
          }

          <div class="footer">
            <button class="button-login blue font-size-12">Create account</button>
            <a href="#" class="button-signup blue font-size-12 block text-center js-login-link">Login</a>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form =  document.querySelector(".js-signup-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      await createUser(credentials)
      // STORE.user = sessionStorage.getItem(userEmail)
      // console.log(user)
      // STORE.user = user

      await STORE.fetchCategories()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      let errorDetail = JSON.parse(error.message)
      SignupPage.state.SignupError = errorDetail.errors
      DOMHandler.reload()
    }
  })
}

function GoToLogin() {
  const signin =  document.querySelector(".js-login-link")
  signin.addEventListener("click", (event) => {
    event.preventDefault()
    DOMHandler.load(LoginPage)
  })
}

const SignupPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSubmitForm()
    GoToLogin()
  },
  state: {
    SignupError: null,
  }
}

export default SignupPage;