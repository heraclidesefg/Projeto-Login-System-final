/* ==================================
   MODAL GLOBAL DE NOTIFICAÇÕES
================================== */

const customAlert =
    document.getElementById("customAlert");

const alertMessage =
    document.getElementById("alertMessage");

const btnAlertConfirm =
    document.getElementById("btnAlertConfirm");

let acaoConfirmacao = null;


/* ==================================
   MOSTRAR MODAL
================================== */

function mostrarAlerta(
    mensagem,
    elementoFoco = null,
    tipo = "erro",
    acao = null
) {

    alertMessage.textContent = mensagem;

    const alertCard =
        customAlert.querySelector(".alert-box");


    // Remove classes anteriores

    alertCard.classList.remove(
        "success",
        "error"
    );


    // Define o tipo da mensagem

    if (tipo === "sucesso") {

        alertCard.classList.add("success");

        alertCard.querySelector("h3")
            .textContent = "Sucesso!";

    } else {

        alertCard.classList.add("error");

        alertCard.querySelector("h3")
            .textContent = "Aviso Importante!";
    }


    // Guarda o elemento que receberá foco

    if (elementoFoco) {

        customAlert.dataset.focus =
            elementoFoco.id;

    } else {

        customAlert.dataset.focus = "";
    }


    // Guarda a ação que será executada
    // depois que o usuário clicar em OK

    acaoConfirmacao = acao;


    // Mostra o modal

    customAlert.style.display = "flex";
}


/* ==================================
   FECHAR MODAL
================================== */

btnAlertConfirm.addEventListener(
    "click",
    () => {

        customAlert.style.display = "none";


        // Recupera elemento para foco

        const id =
            customAlert.dataset.focus;

        if (id) {

            const elemento =
                document.getElementById(id);

            if (elemento) {
                elemento.focus();
            }
        }


        // Executa ação após confirmação

        if (acaoConfirmacao) {

            acaoConfirmacao();

            acaoConfirmacao = null;
        }

    }
);