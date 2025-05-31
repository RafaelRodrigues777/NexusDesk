const form = document.getElementById("formChamado");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const descricao = document.getElementById("descricao").value;

  try {
    const { ref, push, set } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");

    const chamadosRef = ref(window.db, "chamados");
    const novoChamadoRef = push(chamadosRef);

    await set(novoChamadoRef, {
      nome,
      email,
      descricao,
      criadoEm: { ".sv": "timestamp" }
    });

    mensagem.textContent = "Chamado enviado com sucesso!";
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar chamado:", error);
    mensagem.textContent = "Erro ao enviar chamado. Tente novamente.";
  }
});
