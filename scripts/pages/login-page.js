import { input } from "../components/input.js";
import { login } from "../services/sessions-service.js"
import DOMHandler from "../dom-handler.js";
import SignupPage from "./signup-page.js"
import HomePage from "./home-page.js"
import STORE from "../store.js";
import { userEmail } from "../config.js"

function render() {
  // const { loginError } = this.state;
  const { loginError } = LoginPage.state;
  return `
    <main>
      <section >
        <h1 class="title-page font-size-20 gray-9">Login</h1>
        <form class="js-login-form">

          ${input({
            label: "",
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
            value: ""
          })}

          ${input({
            label: "",
            id: "password",
            type: "password",
            placeholder: "password",
            required: true,
            value: ""
          })}

          ${loginError ? 
            `<p>${loginError}</p>`: ''
          }

          <div class="footer">
            <button class="button-login blue font-size-12">Login</button>
            <a href="#" class="button-signup blue font-size-12 js-signup-link">Signup</a>
          </div>
        </form>
        
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form =  document.querySelector(".js-login-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      await login(credentials)
      STORE.user = sessionStorage.getItem(userEmail)
      // sessionStorage.setItem("user_email", user.email)
      // STORE.user = user
      // console.log(user)
      await STORE.fetchContacts()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      let errorDetail = JSON.parse(error.message)
      LoginPage.state.loginError = errorDetail.errors
      DOMHandler.reload()
    }
  })
}

function GoToSignup() {
  const signup =  document.querySelector(".js-signup-link")
  signup.addEventListener("click", (event) => {
    event.preventDefault()
    STORE.currenTab = "signup"
    DOMHandler.load(SignupPage)
  })
}

const LoginPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSubmitForm()
    GoToSignup()
  },
  state: {
    loginError: null,
  }
}

export default LoginPage;