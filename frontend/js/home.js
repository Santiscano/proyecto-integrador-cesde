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
      const row = document.getElementById("row-proyects");
      
      data.data.forEach((proyect) => {
        const col = document.createElement("div");
        col.classList.add("col-sm-6", "mt-3");

        const card = document.createElement("div");
        card.classList.add("card");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        
        const title = document.createElement("h5");
        title.classList.add("card-title");

        const ubicacion = document.createElement("p");
        ubicacion.innerHTML = `<strong>UBICACION:</strong> ${proyect.UBICACION_PROYECTO}`;

        const metraje = document.createElement("p");
        metraje.innerHTML = `<strong>TAMAÑO:</strong> ${proyect.METRAJE_APARTAMENTO} MT2`;

        const piso = document.createElement("p");
        piso.innerHTML = `<strong>PISO:</strong> ${proyect.PISO_APARTAMENTO} `;

        const valor = document.createElement("p");
        valor.innerHTML = `<strong>PRECIO:</strong> $${formatNumberAsCurrency(Number(proyect.PRECIO_APARTAMENTO))}`;

        const tipo = document.createElement("p");
        tipo.innerHTML = `<strong>TIPO DE APARTAMENTO:</strong> ${proyect.TIPO_APARTAMENTO}`;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "mt-2");
        button.textContent = "Ver estado del proyecto";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#modalTracking");

        cardBody.appendChild(title);
        cardBody.appendChild(ubicacion);
        cardBody.appendChild(metraje);
        cardBody.appendChild(piso);
        cardBody.appendChild(valor);
        cardBody.appendChild(tipo);
        cardBody.appendChild(button);


        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    });
});
