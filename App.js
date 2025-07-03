//! fetching users data:

let fetchData = async () => {
    let data = await window.fetch("http://localhost:3000/users");
    let finalData = await data.json();
    let tbody = document.querySelector("tbody");
    finalData.forEach((v,i) => {
        let { id, username,name, phone, email } = v;
        tbody.innerHTML +=`
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
              <button onclick="getData(event,${id})">Read</button>
              <button onclick="updateData(${id})">Update</button>
              <button onclick="deleteData(${id})">Delete</button>
            </td>
        </tr>
        `;
    });
};

fetchData();

//! display and hide Add users form:

let d1 = document.querySelector(".form-container-add");
let s1 = document.querySelector(".add-user");
let closeBtn= document.querySelector(".fa-x");

s1.addEventListener("click", (e) => (d1.style.display = "block"));

closeBtn.addEventListener("click", (e) => (d1.style.display = "none"));

//! Add the user data into the table:

let addUserForm = document.querySelector(".add-user-data");
addUserForm .addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(addUserForm));
    try {
        await window.fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        window.location.reload();
    } catch (error) {
        console.log("error");
    }
});

//!Read the data:

var displayData = document.querySelector(".display-data");

let getData = async (e, id) => {
    try {
        let d = await fetch(`http://localhost:3000/users/${id}`);
        let { id: uId, username, phone, name, email } = await d.json();
        displayData.innerHTML = `
        <i class="fa-solid fa-x"></i>
        <div class="sub-display">
           <h1>USER DETAILS</h1>
           <h2>name: ${name}</h2>
           <p>username: ${username}</p>
           <p>email: ${email}</p>
           <p>phone: ${phone}</p>
        </div>
        `;
      } catch(error) {
        console.log("err");
      }
};

//! show and hide the update form:

let containerUpdate = document.querySelector(".form-container-update");
let closeBtn2 = document.querySelector(".close-btn");

let updateForm = document.querySelector("#update-form");

let updateName = document.querySelector("#name-update");
let updateUsername = document.querySelector("#update");
let updateEmail= document.querySelector("#email-update");
let updatePhone = document.querySelector("#phone-update");

let updateData = async (id) => {
    try {
        containerUpdate.style.display = "block";
        let data = await fetch(`http://localhost:3000/users/${id}`);
        let { name, id: uId, email,phone,username } = await data.json();
        updateName.value = name;
        updateEmail.value = email;
        updatePhone.value = phone;
        updateUsername.value = username;

        updateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            let FormDataValue = Object.fromEntries(new FormData(updateForm));
            try {
                await window.fetch(`http://localhost:3000/users/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(FormDataValue),
                });
                window.location.reload();
            } catch (error) {
                console.log("err");
            }
        });
    } catch (error) {
        console.log("err");
    }
};
closeBtn2.addEventListener("click", async (e) => {
    containerUpdate.style.display = "none";
});

//!deleteData:

let deleteData = async (id) => {
    let confirmMessage = window.confirm("Are you sure? Do you want to delete?");
    if (confirmMessage) {
        await window.fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        });
        Window.location.reload();
    }
};

