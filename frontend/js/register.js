const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    const resposta = await fetch("http://localhost:3000/api/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome,
            email,
            senha
        })

    });

    const json = await resposta.json();

    alert(json.message);

    if (resposta.ok) {
        window.location.href = "index.html";
    }

});