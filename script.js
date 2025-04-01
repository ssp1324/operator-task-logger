// Add an event listener to handle form submission
document.getElementById("taskForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form data
  var operator = document.getElementById('operator').value;
  var drawing = document.getElementById('drawing').value;
  var operation = document.getElementById('operation').value;
  var time = document.getElementById('time').value;

  // Prepare the data to be sent to Google Apps Script
  var formData = new URLSearchParams({
    'operator': operator,
    'drawing': drawing,
    'operation': operation,
    'time': time
  });

  // Make a POST request to the Google Apps Script Web App
  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.json()) // Handle JSON response
  .then(data => {
    console.log(data);
    if (data.message === "Data saved successfully!") {
      alert("Task logged successfully!");
    } else {
      alert("Error: " + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error logging the task.");
  });
});
