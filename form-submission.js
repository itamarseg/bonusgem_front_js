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
      stateElement = document.getElementById('State')
      dayElement = document.getElementById('Day')
      monthElement = document.getElementById('Month')
      yearElement = document.getElementById('Year')
      stateElement.style.appearance = 'none'; 
      dayElement.style.appearance = 'none';  
      monthElement.style.appearance = 'none';
      yearElement.style.appearance = 'none'; 

      // 2. Find the error and success divs
      errorDiv = emailForm.parentElement.querySelector(
        '[data-name-form="error"]'
      );

      successDiv = emailForm.parentElement.querySelector(
        '[data-name-form="success"]'
      );

      errorDiv.style.display = "none";
      successDiv.style.display = "none";

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

          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);

          const tid = urlParams.get("cid");
          const aff = urlParams.get("aff") || "";
          const s1 = urlParams.get("s1") || "";
          const s2 = urlParams.get("s2") || "";
          const s3 = urlParams.get("s3") || "";
          const s4 = urlParams.get("s4") || "";

          const formData = new FormData(emailForm);

          // 5. Get the form entries as an object
          const formObj = Object.fromEntries(formData.entries());

          const data = {
            full_name: formObj.name,
            email: formObj.email,
            state: formObj.State,
            birth_day: `${formObj.Year}-${formObj.Month}-${formObj.Day}`,
            affiliate: aff,
            transaction_id: tid,
            s1: s1,
            s2: s2,
            s3: s3,
            s4: s4,
            ip_address: ip,
            user_agent: userAgent,
          };
          console.log("data to send to server:", data);
          // 6. Send the data to the server
          const response = await fetch(
            "https://bonusgem-api-afvof.ondigitalocean.app/v1/submission",
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

          // Redirect to another page after a short delay (e.g., 1/2 seconds)
          const smartLink = "https://www.hevuv.com/cmp/GJRHSG88/3MQKZT/?";
          const params = `transaction_id=${tid}&source_id=${aff}&sub1=${s1}&sub2=${s2}&sub3=${s3}&sub4=${s4}&sub5=${tid}`;
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