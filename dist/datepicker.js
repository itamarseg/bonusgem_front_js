(()=>{flatpickr(".date-field",{dateFormat:"Y-m-d",disableMobile:!0});document.addEventListener("DOMContentLoaded",function(){flatpickr(".date-field",{onDayCreate:function(a,d,n,t){let e=new Date;e.setHours(0,0,0,0),new Date(t.dateObj)>e&&(t.classList.add("future-day"),t.disabled=!0)}})});})();
//# sourceMappingURL=datepicker.js.map
