// Initialize Flatpickr on the input field
flatpickr(".date-field", {
  dateFormat: "Y-m-d",
});

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#Date", {
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date

      // Get the date for the current day element
      const dayDate = new Date(dayElem.dateObj);

      if (dayDate > today) {
        dayElem.classList.add("future-day"); // Add class to days after today
        dayElem.disabled = true; // Disable the day (just to make sure)
      }
    },
  });
});
