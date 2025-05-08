// script.js
// Redireciona para a página selecionada no select de login
document.getElementById('loginSelect').addEventListener('change', function() {
  if (this.value) {
    window.location.href = this.value;
  }
});
