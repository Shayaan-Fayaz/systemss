import { showAlert } from "./alert.js";

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/user/logout",
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged Out Successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    }
  } catch (err) {
    showAlert("error", "Error in logging out. Please try again later.");
  }
});
