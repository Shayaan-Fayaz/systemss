// const { updateLaptopName } = require("../../controllers/systemController");
import { showAlert } from "./alert.js";

console.log("im here");

document
  .querySelector(".machine-name_form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const laptopName = document.querySelector(".laptop-name_input").value;
    if (!laptopName) {
      console.log(laptopName);
      showAlert("error", "Please type in a name for your machine");
      console.log("enter a laptop name");
    } else {
      try {
        const res = await axios({
          method: "PATCH",
          url: "http://127.0.0.1:3000/api/v1/system/laptop-name",
          data: {
            laptopName: laptopName,
          },
        });

        //   console.log(res);
        showAlert("success", "Machine Alias updated successfully");
      } catch (err) {
        console.log(err);
      }
    }
  });

document.querySelector(".change_user-photo").addEventListener("click", (e) => {
  const selectedFiles = e.target.files;
  console.log(selectedFiles);
});
