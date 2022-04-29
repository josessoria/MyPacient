let buttonbusqueda = document.getElementById("buscar");
buttonbusqueda.addEventListener("click", function (event) {
  let getArrayFromStorage = JSON.parse(localStorage.getItem("transaccionData"));
  let documentofind = parseInt(document.getElementById("documentofind").value);

  //si en el array  hay un documento igual (=) al introducido por el usuario...
  if (
    getArrayFromStorage.find(
      (element) => element.Documento == `${documentofind}`
    )
  ) {
    //almacenar en una variable el numero del array donde se encontró
    const resultado = getArrayFromStorage.findIndex(
      (element) => element.Documento == `${documentofind}`
    );

    resultadoAfimativo();
    function resultadoAfimativo() {
      Swal.fire({
        title:
          "Se encontró al paciente " +
          getArrayFromStorage[resultado]["Apellido"],
        icon: "info",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Okay",
        confirmButtonAriaLabel: "Thumbs up, great!",
      });
    }
    insertartableishan(resultado);
  } else {
    resultadoNegativo();
    function resultadoNegativo() {
      Swal.fire({
        title: "no se pudo encontrar al paciente ",
        icon: "error",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Okay",
        confirmButtonAriaLabel: "Thumbs up, great!",
      });
    }
  }

  function getDirection(celdabusqueda) {
    fetch(`https://randomuser.me/api/`)
      .then((response) => response.json())
      .then((data) => {
        street =
          data.results[0].location.street.name +
          " " +
          data.results[0].location.street.number;
        celdabusqueda.textContent = street;
      });
  }

  function insertartableishan(resultado) {
    let tablabusqueda = document.getElementById("busquedaTable");
    let nuevafila = tablabusqueda.insertRow(1);

    let celdabusqueda = nuevafila.insertCell(0);
    celdabusqueda.textContent = getArrayFromStorage[resultado]["Nombre"];

    celdabusqueda = nuevafila.insertCell(1);
    celdabusqueda.textContent = getArrayFromStorage[resultado]["Apellido"];

    celdabusqueda = nuevafila.insertCell(2);
    celdabusqueda.textContent = getArrayFromStorage[resultado]["Documento"];

    celdabusqueda = nuevafila.insertCell(3);
    celdabusqueda.textContent = getArrayFromStorage[resultado]["obraSocial"];
    celdabusqueda = nuevafila.insertCell(4);
    getDirection(celdabusqueda);
  }
});
