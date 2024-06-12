document.addEventListener("DOMContentLoaded", async () => {
  const roles = document.getElementById("roles");

  const select = document.createElement("select");
  select.setAttribute("class", "form-control");
  select.setAttribute("id", `rol`);
  select.setAttribute("placeholder", `seleccione un rol`);

  const optionDefault = document.createElement("option");
  optionDefault.setAttribute("value", "");
  optionDefault.innerText = "Seleccione un rol";

  const label = document.createElement("label");
  label.setAttribute("for", "rol");
  label.setAttribute("class", "form-label");
  label.innerText = "Rol";

  select.appendChild(optionDefault);

  await fetch("http://localhost:4500/api/v1/roles")
    .then((response) => {
      console.log('response: ', response);
      return response.json()
    })
    .then((data) => {
      console.log('data: ', data);
      data.data.forEach((role) => {
        const option = document.createElement("option");
        option.setAttribute("value", role.ID_ROLES);
        option.innerText = role.NOMBRE_ROL;
        select.appendChild(option);
      });
      roles.appendChild(select);
    })

  roles.appendChild(label);
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Get the values from the input fields
  var fullname = document.getElementById("fullname").value;
  var cellphone = document.getElementById("cellphone").value;
  var rol = document.getElementById("rol").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Create an object with the data to send to the API
  var data = {
    fullname,
    cellphone,
    rol,
    email,
    password,
  };

  const response = await fetch("http://localhost:4500/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (result.message === "SUCCESS"){
    window.location.href = "login.html";
  } else {
    alert(result.message);
  }

});
