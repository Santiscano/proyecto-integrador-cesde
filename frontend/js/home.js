function formatNumberAsCurrency(number) {
  // Convert the number to a string with thousands separators
  return number.toLocaleString('es-CL', { style: 'decimal' });
}

document.addEventListener("DOMContentLoaded", () => {
  // traer el id de la url
  const urlParams = new URLSearchParams(window.location.search);
  const iduser = urlParams.get("id");

  const proyectList = document.getElementById("list-proyects");

  fetch(`http://localhost:4500/api/v1/apartaments/${iduser}`)
    .then((res) => res.json())
    .then(({ data }) => {
      console.log('data apartaments: ', data);
      const row = document.getElementById("row-proyects");
      
      data.data.forEach((proyect) => {
        const col = document.createElement("div");
        col.classList.add("col-md-12", "mt-3");

        const card = document.createElement("div");
        card.classList.add("card");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        

        const projectName = document.createElement("p");
        projectName.innerHTML = `<strong>PROYECTO:</strong> ${proyect.NOMBRE_PROYECTO}`;

        const ubicacion = document.createElement("p");
        ubicacion.innerHTML = `<strong>UBICACION:</strong> ${proyect.UBICACION_PROYECTO}`;

        const metraje = document.createElement("p");
        metraje.innerHTML = `<strong>TAMAÑO:</strong> ${proyect.METRAJE_APARTAMENTO} MT2`;

        const piso = document.createElement("p");
        piso.innerHTML = `<strong>PISO:</strong> ${proyect.PISO_APARTAMENTO} `;

        const valor = document.createElement("p");
        valor.innerHTML = `<strong>PRECIO:</strong> $${formatNumberAsCurrency(Number(proyect.PRECIO_APARTAMENTO))}`;

        const abonado = document.createElement("p");
        abonado.innerHTML = `<strong>ABONADO:</strong> $${formatNumberAsCurrency(Number(proyect.ABONO_ACTUAL))}`;

        const tipo = document.createElement("p");
        tipo.innerHTML = `<strong>TIPO DE APARTAMENTO:</strong> ${proyect.TIPO_APARTAMENTO}`;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "mt-2");
        button.textContent = "Ver estado del proyecto";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#modalTracking");
        button.addEventListener("click", () => getTracking(proyect.ID_PROYECTO));

        cardBody.appendChild(projectName);
        cardBody.appendChild(ubicacion);
        cardBody.appendChild(metraje);
        cardBody.appendChild(piso);
        cardBody.appendChild(valor);
        cardBody.appendChild(abonado);
        cardBody.appendChild(tipo);
        cardBody.appendChild(button);


        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    });
});


function getTracking(id) {
  const title = document.getElementById("tracking-titulo");
  const ubicacion = document.getElementById("tracking-ubicacion");
  const direccion = document.getElementById("tracking-direccion");
  const body = document.getElementById("tracking-content");

  fetch(`http://localhost:4500/api/v1/apartaments/tracking/${id}`)
    .then((res) => res.json())
    .then(({ data }) => {
      console.log('tracking', data.data);

      title.innerHTML = `<strong>Proyecto:</strong> ${data.data[0].NOMBRE_PROYECTO}`;
      ubicacion.innerHTML = `<strong>Ubicación:</strong> ${data.data[0].UBICACION_PROYECTO}`;
      direccion.innerHTML = `<strong>Dirección:</strong> ${data.data[0].DIRECCION_PROYECTO}`;

      data.data.forEach((tracking) => {
        const card = document.createElement("div");
        card.classList.add("card", "mt-3");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = tracking.IMAGEN_TRACKING;
        img.alt = "Imagen de tracking";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const fecha = document.createElement("p");
        fecha.innerHTML = `<strong>Fecha:</strong> ${formaterDMH(tracking.FECHA_TRACKING)}`;

        const observacion = document.createElement("p");
        observacion.innerHTML = `<strong>Observación:</strong> ${tracking.OBSERVACION_TRACKING}`;

        cardBody.appendChild(fecha);
        cardBody.appendChild(observacion);

        card.appendChild(img);
        card.appendChild(cardBody);
        body.appendChild(card);
      });
    });
}

function formaterDMH(fecha) {
  const fecha_dt = new Date(fecha);
  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  // @ts-ignore
  const fecha_formateada = fecha_dt.toLocaleString('es-ES', opciones);
  return fecha_formateada;
}
