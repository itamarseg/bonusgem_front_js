(()=>{window.Webflow?.push(async()=>{try{let o,i;console.log("Submission Flow");let e=document.getElementById("email-form");if(e&&e.parentElement){e.parentElement.classList.remove("w-form"),new MutationObserver(function(s){s.forEach(function(t){t.attributeName==="class"&&e.parentElement.classList.remove("w-form")})}).observe(e.parentElement,{attributes:!0}),nameElement=document.getElementById("name"),emailElement=document.getElementById("email"),dateElement=document.getElementById("Date"),nameElement.style.appearance="none",emailElement.style.appearance="none",dateElement.style.appearance="none",o=e.parentElement.querySelector('[data-name-form="error"]'),i=e.parentElement.querySelector('[data-name-form="success"]'),o.style.display="none",i.style.display="none",google.accounts.id.initialize({client_id:"597521131034-6amd34ifc637c39bhu2dvclns4aptnna.apps.googleusercontent.com",callback:w}),google.accounts.id.renderButton(document.getElementById("google-signin-button"),{theme:"outline",size:"large",width:"400",logo_alignment:"center"});async function w(s){let t=jwt_decode(s.credential),a=t.email,r=t.name;console.log(a,r),emailElement&&(console.log(a,r),emailElement.value=a),nameElement&&(nameElement.value=r)}e.onsubmit=async s=>{try{s.preventDefault();let t;try{t=(await(await fetch("https://api.ipify.org?format=json")).json()).ip}catch(E){console.error(`Error getting IP Address: ${E}`)}let a=navigator.userAgent,r=window.location.search,n=new URLSearchParams(r),l=n.get("cid"),m=n.get("aff")||"",d=n.get("s1")||"",u=n.get("s2")||"",p=n.get("s3")||"",g=n.get("s4")||"",b=new FormData(e),c=Object.fromEntries(b.entries()),f={full_name:c.name,email:c.email,birth_day:c.Date,affiliate:m,transaction_id:l,s1:d,s2:u,s3:p,s4:g,ip_address:t,user_agent:a};console.log("data to send to server:",f);let y=await fetch("http://127.0.0.1:8000/v1/submission",{method:"POST",body:JSON.stringify(f),headers:{"Content-Type":"application/json"}}),h=await y.json();if(y.status!==200)throw h.detail==="Email is invalid"&&(document.getElementById("error-text").innerText="Oops! Something went wrong, your email is invalid"),new Error("Response status is not 200");e.style.display="none",i.style.display="block";let v="https://www.hevuv.com/cmp/GJRHSG88/3MQKZT/?",_=`transaction_id=${l}&source_id=${m}&sub1=${d}&sub2=${u}&sub3=${p}&sub4=${g}&sub5=${l}`;setTimeout(()=>{window.location.href=`${v}${_}`},500)}catch(t){t instanceof Error&&(o.style.display="block",console.error(t))}}}}catch(o){console.error("error",o)}});})();
//# sourceMappingURL=form-submission.js.map
