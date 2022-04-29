document.addEventListener("DOMContentLoaded", function (event) {
  let transactionObjArr = JSON.parse(localStorage.getItem("transaccionData"));
  transactionObjArr.forEach(function (arrayElement) {
    insertRowInTransactionTable(arrayElement);
  });
});

function getDirection(newTypeCellRef) {
  fetch(`https://randomuser.me/api/`)
    .then((response) => response.json())
    .then((data) => {
      street =
        data.results[0].location.street.name +
        " " +
        data.results[0].location.street.number;
      newTypeCellRef.textContent = street;
    });
}

function insertRowInTransactionTable(transactionObj) {
  let { Nombre, Apellido, Direccion, Documento, obraSocial, Id } =
    transactionObj;

  //Almaceno en una variable la tabla dentro del form
  let transactionTableRef = document.getElementById("transactionTable");
  //A la tabla almacenada le agrego una fila al final, y eso lo almaceno en una variable
  let newTransactionRowRef = transactionTableRef.insertRow(-1);

  //le agrego un atributo con su id unico a la fila creada
  newTransactionRowRef.setAttribute("transactionId", Id);

  //A la fila almacenada le agrego una celda en la posicion inicial, la almaceno en una variable para luego agregarle texto, el texto va a ser = al objeto elegido
  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = Nombre;

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = Apellido;

  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = Documento;

  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = obraSocial;

  newTypeCellRef = newTransactionRowRef.insertCell(4);
  getDirection(newTypeCellRef);

  let newDeleteCell = newTransactionRowRef.insertCell(5);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Estás seguro que quieres eliminar esto?",
        text: "No podrás revertirlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "Su paciente fue eliminado",
            "success"
          );
          let transactionRow = event.target.parentNode.parentNode;
          let transactionId = transactionRow.getAttribute("transactionId");
          transactionRow.remove();
          deleteTransactionObj(transactionId);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelada",
            "Su operacion fue cancelada",
            "error"
          );
        }
      });
  });
}

function deleteTransactionObj(transactionId) {
  let transactionObjArr = JSON.parse(localStorage.getItem("transaccionData"));
  let transactionIndexInArray = transactionObjArr.findIndex(
    (element) => element.Id == transactionId
  );
  transactionObjArr.splice(transactionIndexInArray, 1);
  let transactionArrayJSON = JSON.stringify(transactionObjArr);
  localStorage.setItem("transaccionData", transactionArrayJSON);
}
