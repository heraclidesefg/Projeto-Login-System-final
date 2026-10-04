/* ==================================
   GERENCIADOR DE TEMA GLOBAL (theme.js)
================================== */
function inicializarTema() {
    const btnThemeToggle = document.querySelector(".theme-toggle-btn");
    const body = document.body;

    // 1. Aplica o tema salvo assim que a página carrega
    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "light") {
        body.classList.add("light");
        if (btnThemeToggle) btnThemeToggle.textContent = "🌙";
    } else {
        body.classList.remove("light");
        if (btnThemeToggle) btnThemeToggle.textContent = "☀️";
    }

    // 2. Ouve o clique do botão (se existir na página atual)
    if (btnThemeToggle) {
        btnThemeToggle.addEventListener("click", () => {
            body.classList.toggle("light");
            
            if (body.classList.contains("light")) {
                btnThemeToggle.textContent = "🌙";
                localStorage.setItem("theme", "light");
            } else {
                btnThemeToggle.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            }
        });
    }
}

// Executa a verificação imediatamente
inicializarTema();