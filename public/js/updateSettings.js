import { showAlert } from "./alert.js";

export const udpateSettings = async (data, type) => {
  try {
    const url = "http://127.0.0.1:3000/api/v1/user/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
    }

    const result = "success";

    return result;
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
