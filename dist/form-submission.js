(()=>{window.Webflow?.push(async()=>{try{let s,a;console.log("Submission Flow");let e=document.getElementById("email-form");e&&e.parentElement&&(e.parentElement.classList.remove("w-form"),new MutationObserver(function(r){r.forEach(function(t){t.attributeName==="class"&&e.parentElement.classList.remove("w-form")})}).observe(e.parentElement,{attributes:!0}),nameElement=document.getElementById("name"),emailElement=document.getElementById("email"),dateElement=document.querySelector(".date-field"),window.innerWidth<=768&&(dateMobile=document.querySelector(".flatpickr-mobile"),dateElement.style.appearance="none"),nameElement.style.appearance="none",emailElement.style.appearance="none",dateElement.style.appearance="none",s=e.parentElement.querySelector('[data-name-form="error"]'),a=e.parentElement.querySelector('[data-name-form="success"]'),s.style.display="none",a.style.display="none",e.onsubmit=async r=>{try{r.preventDefault();let t;try{t=(await(await fetch("https://api.ipify.org?format=json")).json()).ip}catch(g){console.error(`Error getting IP Address: ${g}`)}let b=navigator.userAgent,w=window.location.search,n=new URLSearchParams(w),i=n.get("cid"),o=n.get("ecid"),l=n.get("aff")||"",m=n.get("s1")||"",d=n.get("s2")||"",p=n.get("s3")||"",u=n.get("s4")||"",E=new FormData(e),c=Object.fromEntries(E.entries()),f={full_name:c.name,email:c.email,birth_day:c.Date,affiliate:l,transaction_id:o,s1:m,s2:d,s3:p,s4:u,ip_address:t,user_agent:b,clickid:i};console.log("data to send to server:",f);let y=await fetch("https://lobster-app-y7aqm.ondigitalocean.app/v1/submission",{method:"POST",body:JSON.stringify(f),headers:{"Content-Type":"application/json"}}),h=await y.json();if(y.status!==200)throw h.detail==="Email is invalid"&&(document.getElementById("error-text").innerText="Oops! Something went wrong, your email is invalid"),new Error("Response status is not 200");let v=`https://bgtracking.com/conversion.gif?cid=${i}&txid=${o}&et=signup`;await fetch(v,{method:"GET",mode:"no-cors"}),e.style.display="none",a.style.display="block";let $="https://bgtracking.com/click/?",S=`transaction_id=${o}&source_id=${l}&sub1=${m}&sub2=${d}&sub3=${p}&sub4=${u}&sub5=${o}&cid=${i}`;setTimeout(()=>{window.location.href=`${$}${S}`},500)}catch(t){t instanceof Error&&(s.style.display="block",console.error(t))}})}catch(s){console.error("error",s)}});})();
//# sourceMappingURL=form-submission.js.map
