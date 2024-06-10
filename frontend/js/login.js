document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Get the values from the input fields
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    // Create an object with the data to send to the API
    var data = {
      email,
      password,
      method: "email",
    };
  
    const response = await fetch("http://localhost:4500/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const res = await response.json();
    console.log('res', res);
  
    localStorage.setItem("token", res.data.token);
    localStorage.setItem('fullname', res.data.user.NOMBRE_COMPLETO);
    localStorage.setItem('email', res.data.user.CORREO);
    localStorage.setItem('id', res.data.user.ID_USUARIO);
    localStorage.setItem('role', res.data.user.ID_ROL);
    localStorage.setItem('phone', res.data.user.TELEFONO);
  
    if (res.data.token) {
      window.location.href = `http://127.0.0.1:5500/dashboard/home.html?id=${res.data.user.ID_USUARIO}`;
    }
  } catch (error) {
    console.log('error: ', error);
    alert('Error al iniciar sesión:', error);
  }
  
});
