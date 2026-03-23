let pessoaA = "";
let pessoaB = "";
let nomeA = "";
let nomeB = "";
let etapaAtual = 1;

const etapaDiv = document.getElementById("etapa");
const resultadoDiv = document.getElementById("resultado");

renderEtapa();

function formatarNome(nome) {
    if (!nome) return "";

    return nome
        .trim()
        .toLowerCase()
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
}

function renderEtapa() {

    resultadoDiv.innerHTML = "";
    resultadoDiv.classList.add("hidden");

    if (etapaAtual === 1) {
        etapaDiv.innerHTML = `
            <div class="input-group">
                <label>Seu nome</label>
                <input id="nomeA" placeholder="Digite seu nome..." />

                <label>Descreva a situação</label>
                <textarea id="inputA" placeholder="Explique o que aconteceu e como você se sentiu..."></textarea>

                <button onclick="salvarPessoaA()">Continuar</button>
            </div>
        `;
    }

    if (etapaAtual === 2) {
        etapaDiv.innerHTML = `
            <div class="status-box">
                Relato salvo com segurança
            </div>

            <div class="input-group">
                <label>Nome da outra pessoa</label>
                <input id="nomeB" placeholder="Digite o nome..." />

                <label>Outro ponto de vista</label>
                <textarea id="inputB" placeholder="Descreva como a outra pessoa pode ter percebido a situação..."></textarea>

                <button onclick="salvarPessoaB()">Analisar</button>
            </div>
        `;
    }
}

function salvarPessoaA() {
    const input = document.getElementById("inputA").value;
    const nome = document.getElementById("nomeA").value;

    if (!input || !nome) {
        alert("Preencha o nome e o relato.");
        return;
    }

    pessoaA = input;
    nomeA = formatarNome(nome);

    etapaAtual = 2;
    renderEtapa();
}

function salvarPessoaB() {
    const input = document.getElementById("inputB").value;
    const nome = document.getElementById("nomeB").value;

    if (!input || !nome) {
        alert("Preencha o nome e o relato.");
        return;
    }

    pessoaB = input;
    nomeB = formatarNome(nome);

    analisar();
}

async function analisar() {

    resultadoDiv.innerHTML = "";
    resultadoDiv.classList.remove("hidden");

    let mensagens = [
        "Analisando os relatos...",
        "Identificando padrões de comportamento...",
        "Avaliando responsabilidades...",
        "Gerando decisão..."
    ];

    let i = 0;

    etapaDiv.innerHTML = `<div class="status-box" id="loadingText">${mensagens[0]}</div>`;

    const interval = setInterval(() => {
        i = (i + 1) % mensagens.length;
        const el = document.getElementById("loadingText");
        if (el) el.innerText = mensagens[i];
    }, 1500);

    try {
        const response = await fetch("/analisar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pessoaA: pessoaA,
                pessoaB: pessoaB,
                nomeA: nomeA,
                nomeB: nomeB
            })
        });

        const data = await response.json();

        clearInterval(interval);
        etapaDiv.innerHTML = "";

        let match = data.responsabilidade.match(/(\d+)%.*?(\d+)%/);

        let valorA = match ? parseInt(match[1]) : 50;
        let valorB = match ? parseInt(match[2]) : 50;

        let veredito = "";

        if (valorA > valorB) {
            veredito = `${nomeA} possui maior responsabilidade na situação`;
        } else if (valorB > valorA) {
            veredito = `${nomeB} possui maior responsabilidade na situação`;
        } else {
            veredito = `Responsabilidade equilibrada entre as partes`;
        }

        resultadoDiv.innerHTML = `
            <h3>Decisão da análise</h3>

            <div class="card destaque">
                <strong>Veredito final</strong>
                <p>${veredito}</p>
                <p>${nomeA}: ${valorA}% | ${nomeB}: ${valorB}%</p>
            </div>

            <div class="card">
                <strong>Análise de ${nomeA}</strong>
                <p>${data.errosA}</p>
            </div>

            <div class="card">
                <strong>Análise de ${nomeB}</strong>
                <p>${data.errosB}</p>
            </div>

            <div class="card">
                <strong>Conclusão</strong>
                <p>${data.resumo}</p>
            </div>

            <div class="card sugestao">
                <strong>Recomendação</strong>
                <p>${data.sugestao}</p>
            </div>

            <button onclick="resetar()">Nova análise</button>
        `;
    } catch (error) {
        clearInterval(interval);
        etapaDiv.innerHTML = "";
        resultadoDiv.innerHTML = "Erro ao conectar com o servidor.";
    }
}

function resetar() {
    pessoaA = "";
    pessoaB = "";
    nomeA = "";
    nomeB = "";
    etapaAtual = 1;

    resultadoDiv.innerHTML = "";
    resultadoDiv.classList.add("hidden");

    renderEtapa();
}