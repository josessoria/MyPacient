const form = document.getElementById("transactionForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let transactionFormData = new FormData(form);
    let transactionObj = covertFormDataToTransactionObj(transactionFormData);
    saveTransactionObj(transactionObj);
    notificacion(transactionObj);
    form.reset();
  });

function notificacion(transactionObj) {
  Swal.fire({
    title: "Se Inscribió correctamente el paciente "+transactionObj.Apellido,

    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("id") || "-1";
    let NewTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("id", JSON.stringify(NewTransactionId));
    return NewTransactionId;
  }
  
function covertFormDataToTransactionObj(transactionFormData) {
  let transactionName = transactionFormData.get("transactionName");
  let transactionLastname = transactionFormData.get("transactionLastname");
  let transactionSocial = transactionFormData.get("transactionSocial");
  let transactionDocument = parseInt(
    transactionFormData.get("transactionDocument")
  );
  let transactionID = getNewTransactionId();
  return {
    Nombre: transactionName,
    Apellido: transactionLastname,
    obraSocial: transactionSocial,
    Documento: transactionDocument,
    Id: transactionID,
  };
}

function saveTransactionObj(transactionObj) {
  //Convierto la informacion del Json, Guardo en el array la informacion del Storage, si no hay nada en el storage devuelve un array vacio
  let myTransactionArray =
    JSON.parse(localStorage.getItem("transaccionData")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi array de transaccion a json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //Agrego a mi storage el json
  localStorage.setItem("transaccionData", transactionArrayJSON);
}
