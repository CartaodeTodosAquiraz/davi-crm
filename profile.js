// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyASoR9O0ZEyb0OaznSm-7f8KezBw4HxAP8",
  authDomain: "crm-davi.firebaseapp.com",
  projectId: "crm-davi",
  storageBucket: "crm-davi.appspot.com",
  messagingSenderId: "475034855713",
  appId: "1:475034855713:web:5002ad57b4e4b7547db660"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const tipoCadastro = document.getElementById("tipoCadastro");
const formArea = document.getElementById("formArea");

tipoCadastro.addEventListener("change", () => {
  const tipo = tipoCadastro.value;
  formArea.innerHTML = ""; // Limpa o conteúdo anterior
  if (!tipo) return;

  let html = `<div class="form-wrapper"><form id="formulario">`;

  if (tipo === "tarefas") {
    html += `
      <label>Nome da Tarefa:</label>
      <input name="nome" required />
      <label>É Consulta?</label>
      <select name="consulta">
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </select>
    `;
  } else if (tipo === "pendencias") {
    html += `
      <label>Nome da Pendência:</label>
      <input name="nome" required />
    `;
  } else if (tipo === "indicacoes" || tipo === "trafego") {
    html += `
      <label>Nome:</label>
      <input name="nome" required />
      <label>Telefone:</label>
      <input name="telefone" required />
      <label>Data de Recebimento:</label>
      <input name="data" type="date" required />
    `;
  } else if (tipo === "prospeccoes") {
    html += `
      <label>Nome:</label>
      <input name="nome" required />
      <label>Telefone:</label>
      <input name="telefone" required />
      <label>Planilha:</label>
      <input name="planilha" required />
      <label>Data de Contato:</label>
      <input name="data" type="date" required />
    `;
  } else if (tipo === "ligacoes") {
    html += `
      <label>Quantas ligações você fez?</label>
      <input name="quantidade" type="number" required />
    `;
  }

  html += `<button type="submit">Adicionar</button></form></div>`;
  formArea.innerHTML = html;

  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(formulario).entries());
    const refNode = ref(db, tipo);
    const novaEntrada = push(refNode);
    set(novaEntrada, dados).then(() => {
      alert("✅ Adicionado com sucesso!");
      formulario.reset();
    }).catch(err => {
      console.error("Erro ao salvar:", err);
      alert("❌ Erro ao salvar!");
    });
  });
});
