async function analisar() {
    const pessoaA = document.getElementById("pessoaA").value;
    const pessoaB = document.getElementById("pessoaB").value;
    const resultadoDiv = document.getElementById("resultado");

    if (!pessoaA || !pessoaB) {
        alert("Preencha as duas versões da discussão.");
        return;
    }

    resultadoDiv.classList.remove("hidden");
    resultadoDiv.innerHTML = "Analisando...";

    try {
        const response = await fetch("/analisar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pessoaA: pessoaA,
                pessoaB: pessoaB
            })
        });

        const data = await response.json();

        resultadoDiv.innerHTML = `
            <h3>Análise da DR</h3>

            <p><strong>Pessoa A:</strong><br>${data.errosA}</p>

            <p><strong>Pessoa B:</strong><br>${data.errosB}</p>

            <p><strong>Responsabilidade:</strong><br>${data.responsabilidade}</p>

            <p><strong>Resumo:</strong><br>${data.resumo}</p>

            <p><strong>Sugestão:</strong><br>${data.sugestao}</p>
        `;

    } catch (error) {
        resultadoDiv.innerHTML = "Erro ao conectar com o servidor.";
    }
}