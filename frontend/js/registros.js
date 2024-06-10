

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const iduser = urlParams.get("id");

  document.getElementById("mis-proyectos")
    .addEventListener("click", () => {
      window.location.href = `./home.html?id=${iduser}`;
    });

  document.getElementById("administracion")
    .addEventListener("click", () => {
      window.location.href = `./administracion.html?id=${iduser}`;
    });

  if (!iduser) {
    window.location.href = "../index.html";
  }
});

// *========================== API'S ====================== //
const URL_API = "http://localhost:4500/api/v1/created";
const TOAST = document.getElementById("liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(TOAST);
const TOAST_ERROR = document.getElementById("liveToastError");
const toasErrorMsg = document.getElementById("toast-error-msg");
const toastBootstrapError = bootstrap.Toast.getOrCreateInstance(TOAST_ERROR);
// *========================== API'S ====================== //

// *========================== Constructoras ====================== //
const TRADE_NAME = document.getElementById("nombre-comercial");
const BUSINESS_NAME = document.getElementById("razon-social");
const NIT = document.getElementById("nit");
const BTN_CREATE_CONSTRUCTOR = document.getElementById("create-constructora");

function viewToast(error, message = "Ocurrio un error.") {
  if (error) {
    toasErrorMsg.textContent = message;
    toastBootstrapError.show();
  } else {
    toastBootstrap.show();
  }
}

function sendNewConstructora() {
  BTN_CREATE_CONSTRUCTOR.disabled = true;
  BTN_CREATE_CONSTRUCTOR.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_CONSTRUCTOR.textContent = "Enviando...";

  const data = {
    NOMBRE_COMERCIAL: TRADE_NAME.value,
    RAZON_SOCIAL: BUSINESS_NAME.value,
    NIT_CONSTRUCTORA: NIT.value,
  };

  fetch(`${URL_API}/constructora`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      viewToast(data.error);
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_CONSTRUCTOR.disabled = false;
      BTN_CREATE_CONSTRUCTOR.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_CONSTRUCTOR.textContent = "Crear Constructora";
    });
}
BTN_CREATE_CONSTRUCTOR.addEventListener("click", sendNewConstructora);
// *========================== Constructoras ====================== //


// *========================== Proyectos ====================== //
const GET_CONSTRUCTORA = document.getElementById("get-constructora");
const PROJECT_NAME = document.getElementById("nombre-proyecto");
const PROJECT_LOCATION = document.getElementById("ubicacion");
const PROJECT_ADDRESS = document.getElementById("direccion");
const BTN_CREATE_PROJECT = document.getElementById("create-proyect");

function createSelectConstructoras() {
  fetch(`${URL_API}/constructoras`)
    .then((res) => res.json())
    .then((resData) => {
      resData.data.data.forEach((constructora) => {
        const option = document.createElement("option");
        option.textContent = constructora.NOMBRE_COMERCIAL;
        option.value = constructora.ID_CONSTRUCTORA;
        GET_CONSTRUCTORA.appendChild(option);
      });
    });
}
createSelectConstructoras();

function sendNewProject() {
  BTN_CREATE_PROJECT.disabled = true;
  BTN_CREATE_PROJECT.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_PROJECT.textContent = "Enviando...";

  const data = {
    ID_CONSTRUCTORA: GET_CONSTRUCTORA.value,
    NOMBRE_PROYECTO: PROJECT_NAME.value,
    UBICACION_PROYECTO: PROJECT_LOCATION.value,
    DIRECCION_PROYECTO: PROJECT_ADDRESS.value,
  };

  fetch(`${URL_API}/proyecto`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      viewToast(data.error);
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_PROJECT.disabled = false;
      BTN_CREATE_PROJECT.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_PROJECT.textContent = "Crear Proyecto";
    });
}
BTN_CREATE_PROJECT.addEventListener("click", sendNewProject);
// *========================== Proyectos ====================== //


// *========================== Tracking ====================== //
const GET_PROJECT_TRACK = document.getElementById("get-proyecto-tracking");
const IMAGE_TRACKING = document.getElementById("image-tracking");
const OBSERVATION = document.getElementById("observation");
const BTN_CREATE_TRACKING = document.getElementById("create-tracking");

function createSelectProjects() {
  fetch(`${URL_API}/proyectos`)
    .then((res) => res.json())
    .then((resData) => {
      resData.data.data.forEach((project) => {
        const option = document.createElement("option");
        option.textContent = project.NOMBRE_PROYECTO;
        option.value = project.ID_PROYECTO;

        GET_PROJECT_TRACK.appendChild(option);
      });
    });
}
createSelectProjects();

function sendNewTracking() {
  BTN_CREATE_TRACKING.disabled = true;
  BTN_CREATE_TRACKING.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_TRACKING.textContent = "Enviando...";

  const formData = new FormData();
  formData.append("ID_PROYECTO", GET_PROJECT_TRACK.value);
  formData.append("file", IMAGE_TRACKING.files[0]);
  formData.append("OBSERVACION_TRACKING", OBSERVATION.value);

  fetch(`${URL_API}/tracking`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('data: ', data);
      viewToast(data.error);
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_TRACKING.disabled = false;
      BTN_CREATE_TRACKING.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_TRACKING.textContent = "Crear Tracking";
    });
}
BTN_CREATE_TRACKING.addEventListener("click", sendNewTracking);
// *========================== Tracking ====================== //

// *========================== Apartamento ====================== //
const GET_COMPRADOR = document.getElementById("get-comprador");
const GET_PROYECTO_APART = document.getElementById("get-proyecto-apartamento");
const NUMBER_APARTAMENT = document.getElementById("numero-apartamento");
const TAMANO = document.getElementById("tamaño");
const PISO = document.getElementById("piso");
const TIPO_APARTAMENTO = document.getElementById("type-apartament");
const PRICE = document.getElementById("precio");
const ABONO_ACTUAL = document.getElementById("abono-actual");
const CUOTAS_ACORDADAS = document.getElementById("cuotas-acordadas");
const BTN_CREATE_APARTAMENT = document.getElementById("create-apartament");

function createSelectProjectsApart() {
  fetch(`${URL_API}/proyectos`)
    .then((res) => res.json())
    .then((resData) => {
      resData.data.data.forEach((project) => {
        const option = document.createElement("option");
        option.textContent = project.NOMBRE_PROYECTO;
        option.value = project.ID_PROYECTO;

        GET_PROYECTO_APART.appendChild(option);
      });
    });
}
createSelectProjectsApart();

function createSelectBuyers() {
  fetch(`${URL_API}/users`)
    .then((res) => res.json())
    .then((resData) => {
      resData.data.data.forEach((buyer) => {
        const option = document.createElement("option");
        option.textContent = buyer.NOMBRE_COMPLETO;
        option.value = buyer.ID_USUARIO;

        GET_COMPRADOR.appendChild(option);
      });
    });
}
createSelectBuyers();

function sendNewApartament() {
  BTN_CREATE_APARTAMENT.disabled = true;
  BTN_CREATE_APARTAMENT.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_APARTAMENT.textContent = "Enviando...";

  const data = {
    ID_COMPRADOR: GET_COMPRADOR.value,
    ID_PROYECTO: GET_PROYECTO_APART.value,
    ID_ASESOR: new URLSearchParams(window.location.search).get("id"),
    NUMERO_APARTAMENTO: `${NUMBER_APARTAMENT.value}-${GET_PROYECTO_APART.value}`,
    METRAJE_APARTAMENTO: TAMANO.value,
    PISO_APARTAMENTO: PISO.value,
    TIPO_APARTAMENTO: TIPO_APARTAMENTO.value,
    PRECIO_APARTAMENTO: PRICE.value,
    ABONO_ACTUAL: ABONO_ACTUAL.value,
    CUOTAS_ACORDADAS: CUOTAS_ACORDADAS.value,
  };

  fetch(`${URL_API}/apartamento`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        if (data.typeError.message.includes("Duplicate entry")) {
          console.log('duplicate entry');
          viewToast(true, "El apartamento ya existe.");
        }
      } else {
        viewToast(false);
        console.log('sucess');
      }
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_APARTAMENT.disabled = false;
      BTN_CREATE_APARTAMENT.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_APARTAMENT.textContent = "Crear Apartamento";
    });
}
BTN_CREATE_APARTAMENT.addEventListener("click", sendNewApartament);
// *========================== Apartamento ====================== //

// *========================== Roles ====================== //
const NOMBRE_ROL = document.getElementById("nombre-rol");
const DEESCRIPCION_ROL = document.getElementById("descripcion-rol");
const BTN_CREATE_ROL = document.getElementById("create-rol");

function sendNewRol() {
  BTN_CREATE_ROL.disabled = true;
  BTN_CREATE_ROL.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_ROL.textContent = "Enviando...";

  const data = {
    NOMBRE_ROL: NOMBRE_ROL.value,
    DESCRIPCION_ROL: DEESCRIPCION_ROL.value,
  };

  fetch(`${URL_API}/rol`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      viewToast(data.error);
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_ROL.disabled = false;
      BTN_CREATE_ROL.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_ROL.textContent = "Crear Rol";
    });
}
// *========================== Roles ====================== //

// *========================== Coutas ====================== //
const GET_CARTERA = document.getElementById("get-cartera");
const VALOR_ABONO = document.getElementById("valor-abono");
const FECHA_ABONO = document.getElementById("fecha-abono");
const BTN_CREATE_SHARE = document.getElementById("create-share");

function formatNumberAsCurrency(number) {
  // Convert the number to a string with thousands separators
  return number.toLocaleString('es-CL', { style: 'decimal' });
}

function createSelectCarteras() {
  fetch(`${URL_API}/carteras`)
    .then((res) => res.json())
    .then((resData) => {
      console.log('carteras', resData.data);
      resData.data.forEach((cartera) => {
        const option = document.createElement("option");
        option.textContent = `${cartera.NOMBRE_COMPLETO} - $${formatNumberAsCurrency(Number(cartera.PRECIO_TOTAL))}`;
        option.value = cartera.ID_CARTERA;

        GET_CARTERA.appendChild(option);
      });
    });
}
createSelectCarteras();

function sendAbono() {
  BTN_CREATE_SHARE.disabled = true;
  BTN_CREATE_SHARE.classList.replace("btn-primary", "btn-secondary");
  BTN_CREATE_SHARE.textContent = "Enviando...";

  const data = {
    ID_CARTERA: GET_CARTERA.value,
    VALOR_ABONO: VALOR_ABONO.value,
    FECHA_ABONO: FECHA_ABONO.value,
  };

  fetch(`${URL_API}/cuota`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      viewToast(data.error);
    })
    .catch((err) => {
      console.error(err);
      viewToast(true);
    })
    .finally(() => {
      BTN_CREATE_SHARE.disabled = false;
      BTN_CREATE_SHARE.classList.replace("btn-secondary", "btn-primary");
      BTN_CREATE_SHARE.textContent = "Crear Cuota";
    });
}
BTN_CREATE_SHARE.addEventListener("click", sendAbono);
// *========================== Coutas ====================== //
