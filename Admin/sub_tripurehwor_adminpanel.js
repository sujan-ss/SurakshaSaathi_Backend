function submitData() {
  const selectedPoliceName = document.querySelector(
    'select[name="police_name"]'
  ).value;
  const selectedTaskStatus = document.querySelector(
    'select[name="task_status"]'
  ).value;

  // You can now send the selected data to your backend for processing
  console.log("Selected Police Name:", selectedPoliceName);
  console.log("Selected Task Status:", selectedTaskStatus);

  // Add logic to send the data to the backend and update the user notice page
  // This could involve making an AJAX request to your server
}
