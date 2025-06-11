
    function enviarAvaliacao(event) {
      event.preventDefault();
      const nota = document.getElementById('nota').value;
      const comentario = document.getElementById('comentario').value;

      alert(`Avaliação enviada com nota ${nota}!\nComentário: ${comentario}`);
      window.location.href = '../pds/pds1.html';
    }
