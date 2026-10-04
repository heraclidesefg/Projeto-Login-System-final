const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;


    try {

        const resposta = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );


        const json =
            await resposta.json();


        /* ============================
           LOGIN REALIZADO
        ============================ */

        if (resposta.ok) {

            localStorage.setItem(
                "token",
                json.token
            );


            mostrarAlerta(
                json.message,
                null,
                "sucesso",

                () => {

                    window.location.href =
                        "../home.html";

                }
            );


        } else {


            /* ============================
               ERRO NO LOGIN
            ============================ */

            mostrarAlerta(
                json.message,
                null,
                "erro"
            );

        }

    } catch (error) {

        console.error(
            "Erro ao conectar com servidor:",
            error
        );

        mostrarAlerta(
            "Não foi possível conectar ao servidor.",
            null,
            "erro"
        );

    }

});