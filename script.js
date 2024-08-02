function hidePassword(passwrd){
    let pswd = ""
    for (let i = 0; i < passwrd.length; i++) {
        pswd += "#"  
    }
    return pswd
}






function copyText(txt) {
  navigator.clipboard
    .writeText(txt)
    .then(() => {
      
      const alertElement = document.querySelector(".alert");
      alertElement.classList.remove("alert");
      alertElement.style.display = "block"; 

      setTimeout(() => {
        alertElement.style.display = "none";
        alertElement.classList.add("alert"); 
      }, 2000); 
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}





// Function to delete a password entry based on the website
window.deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let my_data = JSON.parse(data);
  let my_data_new = my_data.filter((e) => e.website !== website);
  localStorage.setItem("passwords", JSON.stringify(my_data_new));

  alert(`Deleted successfully ${website} website details`);
  ShowPasswords();
};




// Function to display saved passwords in a table
const ShowPasswords = () => {
  let myTable = document.querySelector("table");
  let data = localStorage.getItem("passwords");

  if (data == null || JSON.parse(data).length === 0) {
    myTable.innerHTML = `<tr><td colspan="4">Add your passwords</td></tr>`;
  } else {
    myTable.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;

    let my_data = JSON.parse(data);
    let str = "";
    for (let i = 0; i < my_data.length; i++) {
      const ele = my_data[i];

      str += `<tr>
                <td>${ele.website} <img class="copy-btn" data-text="${ele.website}" src="copyBtn.svg" alt="Copy" width="23" height="25"></td>
                <td>${ele.username} <img class="copy-btn" data-text="${ele.username}" src="copyBtn.svg" alt="Copy" width="23" height="25"></td>
                <td>${hidePassword(ele.password)} <img class="copy-btn" data-text="${ele.password}" src="copyBtn.svg" alt="Copy" width="23" height="25"></td>
                <td><button class="btn2" onclick="deletePassword('${ele.website}')">Delete</button></td>
            </tr>`;
    }

    myTable.innerHTML += str;
    addCopyEventListeners();
  }

  // Clear form fields after updating table
  document.getElementById("website").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};



// Function to add click event listeners to copy buttons
function addCopyEventListeners() {
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.getAttribute("data-text");
      copyText(text);
    });
  });
}




// Event listener for the form submit button
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");

  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(website, username, password);

  let passwords = localStorage.getItem("passwords");

  if (passwords == null) {
    let json = [];
    json.push({ website: website, username: username, password: password });

    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(passwords);
    json.push({
      website: website,
      username: username,
      password: password,
    });

    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }

  ShowPasswords();
});


ShowPasswords();
