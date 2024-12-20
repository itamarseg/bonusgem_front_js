window.Webflow?.push(async () => {
  try {
    let errorDiv;
    let successDiv;

    console.log("Submission Flow");

    // 1. Remove w-form to prevent Webflow from handling it
    const emailForm = document.getElementById("email-form");

    if (emailForm && emailForm.parentElement) {
      emailForm.parentElement.classList.remove("w-form");

      // MutationObserver to watch for class changes
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === "class") {
            emailForm.parentElement.classList.remove("w-form");
          }
        });
      });

      // Configuration of the observer
      observer.observe(emailForm.parentElement, {
        attributes: true, // Configure it to listen to attribute changes
      });

      // Find select elements
      nameElement = document.getElementById("name");
      emailElement = document.getElementById("email");
      dateElement = document.querySelector(".date-field");
      if (window.innerWidth <= 768) {
        dateMobile = document.querySelector(".flatpickr-mobile");
        dateElement.style.appearance = "none";
      }

      nameElement.style.appearance = "none";
      emailElement.style.appearance = "none";
      dateElement.style.appearance = "none";

      // 2. Find the error and success divs
      errorDiv = emailForm.parentElement.querySelector(
        '[data-name-form="error"]'
      );

      successDiv = emailForm.parentElement.querySelector(
        '[data-name-form="success"]'
      );

      errorDiv.style.display = "none";
      successDiv.style.display = "none";

      // Google Sign-In button
      // google.accounts.id.initialize({
      //   client_id:
      //     "597521131034-6amd34ifc637c39bhu2dvclns4aptnna.apps.googleusercontent.com",
      //   callback: handleGoogleCredentialResponse,
      // });
      // google.accounts.id.renderButton(
      //   document.getElementById("google-signin-button"),
      //   {
      //     theme: "outline",
      //     size: "large",
      //     // width: "auto",
      //     logo_alignment: "center",
      //     // type: 'icon'
      //   }
      // );

      // Handle Google Sign-In response
      // async function handleGoogleCredentialResponse(response) {
      //   const data = jwt_decode(response.credential);
      //   const userEmail = data.email;
      //   const fullName = data.name;

      //   // Automatically fill in the email field with the user's Google email
      //   if (emailElement) {
      //     console.log(userEmail, fullName);
      //     emailElement.value = userEmail;
      //   }

      //   // Automatically fill in the name field with the user's Google full name
      //   if (nameElement) {
      //     nameElement.value = fullName;
      //   }

      //   // Optionally submit the form automatically after Google Sign-In
      //   // emailForm.dispatchEvent(new Event("submit"));
      // }

      // Function to detect the browser from user-agent string
      function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "";

        if (
          userAgent.indexOf("Chrome") > -1 &&
          userAgent.indexOf("Edg") === -1
        ) {
          browserName = "Chrome";
          browserVersion = userAgent.match(/Chrome\/([\d.]+)/)?.[1] || "";
        } else if (
          userAgent.indexOf("Safari") > -1 &&
          userAgent.indexOf("Chrome") === -1
        ) {
          browserName = "Safari";
          browserVersion = userAgent.match(/Version\/([\d.]+)/)?.[1] || "";
        } else if (userAgent.indexOf("Firefox") > -1) {
          browserName = "Firefox";
          browserVersion = userAgent.match(/Firefox\/([\d.]+)/)?.[1] || "";
        } else if (userAgent.indexOf("Edg") > -1) {
          browserName = "Edge";
          browserVersion = userAgent.match(/Edg\/([\d.]+)/)?.[1] || "";
        } else if (
          userAgent.indexOf("Opera") > -1 ||
          userAgent.indexOf("OPR") > -1
        ) {
          browserName = "Opera";
          browserVersion =
            userAgent.match(/Opera\/([\d.]+)|OPR\/([\d.]+)/)?.[1] || "";
        } else if (
          userAgent.indexOf("MSIE") > -1 ||
          !!document.documentMode === true
        ) {
          // IE
          browserName = "Internet Explorer";
          browserVersion = userAgent.match(/MSIE ([\d.]+)/)?.[1] || "";
        }

        return { browserName, browserVersion };
      }

      // 3. Add our own submit handler
      emailForm.onsubmit = async (event) => {
        try {
          event.preventDefault();

          // 4. Get the IP address
          let ip;
          try {
            const response = await fetch("https://api.ipify.org?format=json");
            const json = await response.json();
            ip = json.ip;
          } catch (err) {
            console.error(`Error getting IP Address: ${err}`);
          }

          const userAgent = navigator.userAgent;

          // 5. Detect device type
          const deviceType = /Mobi|Android/i.test(userAgent)
            ? "Mobile"
            : /Tablet/i.test(userAgent)
            ? "Tablet"
            : "Desktop";

          // 6. Detect language preference
          const language = navigator.language || navigator.userLanguage;

          // 7. Detect browser type and version
          const { browserName, browserVersion } = detectBrowser();

          function getCookieValue(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
          }

          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);

          const cid = urlParams.get("cid") || "";
          const tid = urlParams.get("ecid") || "";
          const aff = urlParams.get("aff") || "";
          const s1 = urlParams.get("s1") || "";
          const s2 = urlParams.get("s2") || "";
          const s3 = urlParams.get("s3") || "";
          const s4 = urlParams.get("s4") || "";
          const cpid = urlParams.get("cpid") || "";
          const fbid = getCookieValue("_fbc") || "";

          const formData = new FormData(emailForm);

          // 5. Get the form entries as an object
          const formObj = Object.fromEntries(formData.entries());

          const data = {
            full_name: formObj.name,
            email: formObj.email,
            birth_day: formObj.Date,
            affiliate: aff,
            transaction_id: tid,
            s1: s1,
            s2: s2,
            s3: s3,
            s4: s4,
            ip_address: ip,
            user_agent: userAgent,
            device_type: deviceType, // Device Type
            language: language, // Language
            browser_name: browserName, // Browser Name
            browser_version: browserVersion, // Browser Version
            clickid: cid,
            campaign_id: cpid,
            fb_clickid: fbid,
          };
          console.log("data to send to server:", data);
          // 6. Send the data to the server
          // https://bonusgem-api-afvof.ondigitalocean.app/v1/submission
          //http://127.0.0.1:8000/v1/submission
          const response = await fetch(
            "https://lobster-app-y7aqm.ondigitalocean.app/v1/submission",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await response.json();

          if (response.status !== 200) {
            if (responseData.detail === "Email is invalid") {
              document.getElementById("error-text").innerText =
                "Oops! Something went wrong, your email is invalid";
            }
            throw new Error("Response status is not 200");
          }

          // Hide the form and show the success message
          emailForm.style.display = "none";
          successDiv.style.display = "block";
          let smartLink;
          let params;
          if (
            cpid === "4f244fe9-6f46-4cdc-a5f3-f374de1a4b36" ||
            cpid === "f9b49d82-1a35-4ad5-91b3-278ecfa966bf"
          ) {
            const adset_id = urlParams.get("ad_id") || "";
            const campaign_id = urlParams.get("campaign_id") || "";
            const source = urlParams.get("source") || "";
            const placement = urlParams.get("placement") || "";
            params = `adset_id=${adset_id}&campaign_id=${campaign_id}&source=${source}&placement=${placement}&user_id=${cid}`;
            smartLink = `https://bgtracking.com/8786a759-e9f1-4a6d-a5b6-a2837876fc67?`;
          } else if (cpid === "d81c84e7-a589-4f90-8273-6fd6cff68457") {
            params = `aff=${aff}&s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&ecid=${tid}&s5=${cid}`;
            smartLink = "https://bgtracking.com/d81c84e7-a589-4f90-8273-6fd6cff68457"
          } else {
            params = `aff=${aff}&s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&ecid=${tid}&s5=${cid}`;
            smartLink = "https://bgtracking.com/127682d4-4160-48ce-b003-88aa443950e0?";
          }

          setTimeout(() => {
            window.location.href = `${smartLink}${params}`;
          }, 500);
        } catch (e) {
          // 8. Handle the error
          if (e instanceof Error) {
            errorDiv.style.display = "block";
            console.error(e);
          }
        }
      };
    }
  } catch (e) {
    console.error("error", e);
    // errorDiv.style.display = 'block';
  }
});
//# sourceMappingURL=main.js.map
