let pessoaA = "";
let pessoaB = "";
let etapaAtual = 1;

const etapaDiv = document.getElementById("etapa");
const resultadoDiv = document.getElementById("resultado");

renderEtapa();

function renderEtapa() {
    if (etapaAtual === 1) {
        etapaDiv.innerHTML = `
            <div class="input-group">
                <label>Primeiro relato</label>
                <textarea id="inputA" placeholder="Descreva o que aconteceu..."></textarea>
                <button onclick="salvarPessoaA()">Continuar</button>
            </div>
        `;
    }

    if (etapaAtual === 2) {
        etapaDiv.innerHTML = `
            <div class="status-box">
                Primeiro relato salvo com segurança
            </div>

            <div class="input-group">
                <label>Segundo relato</label>
                <textarea id="inputB" placeholder="Agora descreva o seu ponto de vista..."></textarea>
                <button onclick="salvarPessoaB()">Analisar</button>
            </div>
        `;
    }
}

function salvarPessoaA() {
    const input = document.getElementById("inputA").value;

    if (!input) {
        alert("Preencha o primeiro relato.");
        return;
    }

    pessoaA = input;
    etapaAtual = 2;
    renderEtapa();
}

function salvarPessoaB() {
    const input = document.getElementById("inputB").value;

    if (!input) {
        alert("Preencha o segundo relato.");
        return;
    }

    pessoaB = input;
    analisar();
}

async function analisar() {
    etapaDiv.innerHTML = `
        <div class="status-box">
            Analisando a situação...
        </div>
    `;

    resultadoDiv.classList.remove("hidden");

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

        // remove o "analisando..."
        etapaDiv.innerHTML = "";

        resultadoDiv.innerHTML = `
            <h3>Decisão da análise</h3>

            <div class="card">
                <strong>Análise da Pessoa A:</strong>
                <p>${data.errosA}</p>
            </div>

            <div class="card">
                <strong>Análise da Pessoa B:</strong>
                <p>${data.errosB}</p>
            </div>

            <div class="card destaque">
                <strong>Responsabilidade:</strong>
                <p>${data.responsabilidade}</p>
            </div>

            <div class="card">
                <strong>Conclusão:</strong>
                <p>${data.resumo}</p>
            </div>

            <div class="card sugestao">
                <strong>Recomendação:</strong>
                <p>${data.sugestao}</p>
            </div>

            <button onclick="resetar()">Nova análise</button>
        `;

    } catch (error) {
        etapaDiv.innerHTML = "";
        resultadoDiv.innerHTML = "Erro ao conectar com o servidor.";
    }
}

function resetar() {
    pessoaA = "";
    pessoaB = "";
    etapaAtual = 1;
    resultadoDiv.classList.add("hidden");
    renderEtapa();
}