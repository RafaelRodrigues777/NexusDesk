

    const firebaseConfig = {
      apiKey: "AIzaSyDswRLlrpFGieUPCQyTpsTkN8kWZmyIje8",
      authDomain: "desksolutions-204dd.firebaseapp.com",
      databaseURL: "https://desksolutions-204dd-default-rtdb.firebaseio.com",
      projectId: "desksolutions-204dd",
      storageBucket: "desksolutions-204dd.appspot.com",
      messagingSenderId: "169920163822",
      appId: "1:169920163822:web:47f6b28c136922ac85e8ff",
      measurementId: "G-MER6JEHRSH"
    };

    // Inicialização
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const auth = firebase.auth();
    const db = firebase.firestore();


// Função para verificar se o elemento está visível na tela
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Função para verificar a visibilidade dos elementos
function handleScroll() {
  const features = document.querySelectorAll('.feature');
  features.forEach((feature) => {
    if (isInViewport(feature)) {
      feature.classList.add('visible'); // Adiciona a classe 'visible' quando o elemento entra na tela
    } else {
      feature.classList.remove('visible'); // Remove a classe 'visible' se o elemento sair da tela
    }
  });
}

// Adiciona o evento de scroll na janela para monitorar a rolagem
window.addEventListener('scroll', handleScroll);

// Chama a função uma vez para verificar a visibilidade inicial dos elementos
handleScroll();

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  auth.signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const user = userCredential.user;

      db.collection("usuarios").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const tipo = doc.data().tipo;
            if (tipo === "usuario") {
              window.location.href = "../html/externo_front.html";
            } else if (tipo === "empresa" || tipo === "tecnico") {
              window.location.href = "../html/interno_chamados.html";
            } else {
              alert("Tipo de usuário inválido.");
            }
          } else {
            alert("Usuário não encontrado no Firestore.");
          }
        })
        .catch((erro) => {
          console.error("Erro ao buscar tipo:", erro);
          alert("Erro ao buscar dados do usuário.");
        });
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Email ou senha inválidos.");
    });
}

// Alternância de tema
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleBtn.textContent = 'Modo Escuro';
  } else {
    body.classList.remove('light-theme');
    themeToggleBtn.textContent = 'Modo Claro';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();

  // Enter no campo de senha = login
  const senhaInput = document.getElementById('senha');
  senhaInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      login();
    }
  });

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggleBtn.textContent = isLight ? 'Modo Escuro' : 'Modo Claro';
  });
});

// const themeToggleBtn = document.getElementById('theme-toggle');
//     const body = document.body;

//     // Função para aplicar o tema salvo no localStorage
//     function applySavedTheme() {
//       const savedTheme = localStorage.getItem('theme');
//       if (savedTheme === 'light') {
//         body.classList.add('light-theme');
//         themeToggleBtn.textContent = 'Modo Escuro';
//       } else {
//         body.classList.remove('light-theme');
//         themeToggleBtn.textContent = 'Modo Claro';
//       }
//     }

    // Aplica o tema salvo assim que a página carrega
    document.addEventListener('DOMContentLoaded', applySavedTheme);

    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-theme'); // Alterna a classe 'light-theme' no <body>

      if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light'); // Salva a preferência
        themeToggleBtn.textContent = 'Modo Escuro';
      } else {
        localStorage.setItem('theme', 'dark'); // Salva a preferência
        themeToggleBtn.textContent = 'Modo Claro';
      }
    });