(()=>{window.Webflow?.push(async()=>{try{let s,o;console.log("Submission Flow");let e=document.getElementById("email-form");e&&e.parentElement&&(e.parentElement.classList.remove("w-form"),new MutationObserver(function(a){a.forEach(function(t){t.attributeName==="class"&&e.parentElement.classList.remove("w-form")})}).observe(e.parentElement,{attributes:!0}),nameElement=document.getElementById("name"),emailElement=document.getElementById("email"),dateElement=document.querySelector(".date-field"),window.innerWidth<=768&&(dateMobile=document.querySelector(".flatpickr-mobile"),dateElement.style.appearance="none"),nameElement.style.appearance="none",emailElement.style.appearance="none",dateElement.style.appearance="none",s=e.parentElement.querySelector('[data-name-form="error"]'),o=e.parentElement.querySelector('[data-name-form="success"]'),s.style.display="none",o.style.display="none",e.onsubmit=async a=>{try{a.preventDefault();let t;try{t=(await(await fetch("https://api.ipify.org?format=json")).json()).ip}catch(g){console.error(`Error getting IP Address: ${g}`)}let w=navigator.userAgent,E=window.location.search,n=new URLSearchParams(E),i=n.get("cid")||"",c=n.get("ecid")||"",l=n.get("aff")||"",m=n.get("s1")||"",d=n.get("s2")||"",p=n.get("s3")||"",f=n.get("s4")||"",b=new FormData(e),r=Object.fromEntries(b.entries()),y={full_name:r.name,email:r.email,birth_day:r.Date,affiliate:l,transaction_id:c,s1:m,s2:d,s3:p,s4:f,ip_address:t,user_agent:w,clickid:i};console.log("data to send to server:",y);let u=await fetch("https://lobster-app-y7aqm.ondigitalocean.app/v1/submission",{method:"POST",body:JSON.stringify(y),headers:{"Content-Type":"application/json"}}),h=await u.json();if(u.status!==200)throw h.detail==="Email is invalid"&&(document.getElementById("error-text").innerText="Oops! Something went wrong, your email is invalid"),new Error("Response status is not 200");e.style.display="none",o.style.display="block";let v="https://bgtracking.com/127682d4-4160-48ce-b003-88aa443950e0?",S=`aff=${l}&s1=${m}&s2=${d}&s3=${p}&s4=${f}&ecid=${c}&cid=${i}`;setTimeout(()=>{window.location.href=`${v}${S}`},500)}catch(t){t instanceof Error&&(s.style.display="block",console.error(t))}})}catch(s){console.error("error",s)}});})();
//# sourceMappingURL=form-submission.js.map
