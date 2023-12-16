// // const { updateLaptopName } = require("../../controllers/systemController");
// import {} from "./../../controllers/systemController";
// import { showAlert } from "./alert.js";
// import { udpateSettings } from "./updateSettings.js";

// // console.log("im here");
// console.log("daa");
// console.log(document.querySelector(".update_form"));

// (function random() {
//   console.log("random");
// })();

// document
//   .querySelector(".machine-name_form")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const laptopName = document.querySelector(".laptop-name_input").value;
//     if (!laptopName) {
//       console.log(laptopName);
//       showAlert("error", "Please type in a name for your machine");
//       console.log("enter a laptop name");
//     } else {
//       try {
//         const res = await axios({
//           method: "PATCH",
//           url: "http://127.0.0.1:3000/api/v1/system/laptop-name",
//           data: {
//             laptopName: laptopName,
//           },
//         });

//         //   console.log(res);
//         showAlert("success", "Machine Alias updated successfully");
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   });

// document.querySelector(".change_user-photo").addEventListener("click", (e) => {
//   const selectedFiles = e.target.files;
//   console.log(selectedFiles);
// });
// console.log("daa");
// console.log(document.querySelector(".update_form"));

// const userForm = document
//   .querySelector(".update_form")
//   .addEventListener("submit", (e) => {
//     alert("submitted");
//     e.preventDefault();
//     const form = new FormData();

//     const fileData = document.querySelector(".form__upload");

//     form.append(
//       "name",
//       document.querySelector(".profile-username_input").value
//     );
//     form.append(
//       "laptopName",
//       document.querySelector(".save_laptop-name").value
//     );
//     form.append("photo", document.querySelector(".form__upload"));

//     console.log(form);
//     console.log(fileData);

//     udpateSettings(form, "data");
//   });

// console.log(userForm);

// // import { }

import { defaultFormatUtc } from "moment";
import { showAlert } from "./alert.js";
import { udpateSettings } from "./updateSettings.js";

const updateForm = document.querySelector(".update_form");

// (function random() {
//   console.log("radom");
// })();

(() => {
  console.log("hi");
})();
