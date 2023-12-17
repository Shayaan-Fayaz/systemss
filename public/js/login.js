// import { loadavg } from "os-utils";
import { showAlert } from "./alert.js";

const loginForm = document
  .querySelector(".login__form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/user/login",
        data: {
          email: email,
          password: password,
        },
      });

      showAlert("success", "You are logged in!");
      window.setTimeout(() => {
        location.assign("/cpu");
      }, 3000);
    } catch (err) {
      showAlert("error", "Incorrect email or password");
    }
  });
