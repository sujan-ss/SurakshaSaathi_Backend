// adminpanel.js

document.addEventListener("DOMContentLoaded", function () {
  const verifyButtons = document.querySelectorAll(".verify-btn");

  // Add event listener to each verify button
  verifyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Send verification logic here
      alert("Verification sent!"); // Replace with actual verification logic
    });
  });

  // Function to add user data to the table
  function addUserToTable(userData) {
    const tableBody = document.querySelector(".user-table tbody");
    const newRow = tableBody.insertRow();

    // Insert user data into table cells
    newRow.innerHTML = `
      <td>${userData.userId}</td>
      <td>${userData.firstName}</td>
      <td>${userData.lastName}</td>
      <td>${userData.email}</td>
      <td>${userData.number}</td>
      <td><img src="${userData.photo}" alt="User Photo" /></td>
       <td><img src="${userData.passport}" alt="User Passport" /></td>
      <td><button class="verify-btn">Verify</button></td>
    `;

    // Add event listener to the new verify button
    const newVerifyButton = newRow.querySelector(".verify-btn");
    newVerifyButton.addEventListener("click", function () {
      // Send verification logic here
      alert("Verification sent for user ID: " + userData.userId); // Replace with actual verification logic
    });
  }

  // Example of adding user data to the table
  const newUser = {
    userId: "123456",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    number: "123-456-7890",
    photo: "C:SurakshaSaathi_BackendImagespassport.jpg",
    passport: "passport.jpg",
  };
  addUserToTable(newUser);
});
