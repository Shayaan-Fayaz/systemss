import { showAlert } from "./alert.js";
import { udpateSettings } from "./updateSettings.js";

// console.log("random");

console.log("random");

const uploadForm = document.querySelector(".update_form");

// console.log(uploadForm);

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Im here");

  const form = new FormData();

  form.append("name", document.querySelector(".profile-username_input").value);
  //   console.log(form);
  //   form.append("laptopName", document.querySelector(".laptop-name_input").value);

  form.append("laptopName", document.querySelector(".laptop-name_input").value);

  console.log(document.querySelector(".laptop-name_input").value);
  //   form.append("photo", document.querySelector("t.form__upload"));

  //   console.log(document.querySelector(".form__upload").files[0]);

  form.append("photo", document.querySelector(".form__upload").files[0]);

  const result = await udpateSettings(form, "data");
  console.log(result);
  if (result === "success") {
    window.setTimeout(() => {
      location.assign("/profile");
    }, 3000);
  }
  //   if (result === "success") {
  //     window.setTimeout(() => {
  //       location.assign("/");
  //     }, 3000);
  //   }

  //   console.log(form);
});
