document.addEventListener("DOMContentLoaded", function () {
  // 1. Remove w-form to prevent Webflow from handling it
  const emailForm = document.getElementById("email-form");

  if (emailForm && emailForm.parentElement) {
    emailForm.parentElement.classList.remove("w-form");
  }

  const ipFormInput = document.getElementById("ip-address");
  const userAgentInput = document.getElementById("User-Agent");
  const userAgent = navigator.userAgent;

  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const tid = urlParams.get("cid");

  if (userAgentInput) {
    userAgentInput.value = userAgent;
  } else {
    console.error("User-Agent input element not found.");
  }
  console.log(userAgent);

  fetch("https://api.ipify.org?format=json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const ip = json.ip;
      if (ipFormInput) {
        ipFormInput.value = ip;
      } else {
        console.error("IP address input element not found.");
      }
    })
    .catch((err) => {
      console.error(`Error getting IP Address: ${err}`);
    });
});
