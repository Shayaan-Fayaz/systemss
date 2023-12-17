import { showAlert } from "./alert.js";
import { udpateSettings } from "./updateSettings.js";

// console.log("random");

console.log("random");

const uploadForm = document.querySelector(".update_form");
const updateSystemBtn = document.querySelector(".update_system");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Im here");

  const form = new FormData();

  form.append("name", document.querySelector(".profile-username_input").value);

  form.append("laptopName", document.querySelector(".laptop-name_input").value);

  console.log(document.querySelector(".laptop-name_input").value);

  form.append("photo", document.querySelector(".form__upload").files[0]);

  const result = await udpateSettings(form, "data");
  console.log(result);
  if (result === "success") {
    window.setTimeout(() => {
      location.assign("/profile");
    }, 3000);
  }
});

updateSystemBtn.addEventListener("click", async () => {
  console.log("button clicked");

  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/v1/system",
    });

    console.log(res);
    showAlert("success", "System Data updated successfully!");
  } catch (err) {
    showAlert("error", "Error in updateing system. Try again later");
    console.log(err);
  }
});
