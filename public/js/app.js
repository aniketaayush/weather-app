const weatherForm = document.querySelector("form");
const inputField = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let location = inputField.value;
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = "";
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
});
