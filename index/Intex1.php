<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NexusDesk - Início</title>
  <style>
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0d1117;
      color: #c9d1d9;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      padding-bottom: 120px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 0;
    }

    .logo-text {
      font-size: 32px;
      font-weight: bold;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .logo-text .first {
      color: #58a6ff;
    }

    .logo-text .second {
      background-color: #238636;
      color: #ffffff;
      padding: 4px 10px;
      margin-left: 6px;
      border-radius: 4px;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    nav ul {
      list-style: none;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    nav ul li a {
      text-decoration: none;
      color: #c9d1d9;
      padding: 8px 14px;
      font-size: 16px;
      transition: background 0.3s ease;
      border-radius: 4px;
    }

    nav ul li a:hover {
      background: #58a6ff;
      color: #0d1117;
    }

    .login-select {
      background: #21262d;
      color: #c9d1d9;
      border: 1px solid #30363d;
      border-radius: 5px;
      padding: 8px 12px;
      font-size: 16px;
      cursor: pointer;
    }

    .login-select option {
      background: #ffffff;
      color: #000000;
    }

    .search-section {
      text-align: center;
      margin: 60px 0 40px;
    }

    .search-section h1 {
      font-size: 28px;
      margin-bottom: 20px;
    }

    .search-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .search-box input[type="text"] {
      flex: 1;
      min-width: 250px;
      padding: 12px;
      border: none;
      border-radius: 6px;
      outline: none;
      background-color: #161b22;
      color: #ffffff;
    }

    .search-box button {
      padding: 12px 20px;
      border: none;
      background: #58a6ff;
      color: #0d1117;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .search-box button:hover {
      background: #1f6feb;
    }

    .quick-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .quick-links a {
      flex: 1 1 220px;
      max-width: 260px;
      text-align: center;
      text-decoration: none;
      color: #c9d1d9;
      background: #21262d;
      padding: 24px 16px;
      border-radius: 10px;
      font-size: 16px;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .quick-links a:hover {
      background: #58a6ff;
      color: #0d1117;
      transform: translateY(-4px);
    }

    .support-info {
      background-color: #21262d;
      padding: 50px 20px;
      margin-top: 50px;
      border-radius: 10px;
    }

    .support-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 30px;
    }

    .support-image img {
      max-width: 400px;
      width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    }

    .support-text {
      flex: 1;
      text-align: center;
    }

    .support-text h2 {
      font-size: 28px;
      color: #c9d1d9;
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #0d1117;
      color: #8b949e;
      text-align: center;
      padding: 15px 10px;
      font-size: 14px;
      z-index: 10;
    }

    .footer-links {
      margin-top: 8px;
    }

    .footer-links a {
      color: #8b949e;
      text-decoration: none;
      margin: 0 12px;
      font-size: 13px;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .logo-text {
        font-size: 26px;
      }

      nav ul {
        justify-content: center;
      }

      .search-section h1 {
        font-size: 24px;
      }

      .quick-links a {
        flex: 1 1 100%;
        max-width: none;
      }

      .support-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <a href="#" style="text-decoration: none;">
        <div class="logo-text">
          <span class="first">4desk</span><span class="second">Solutions</span>
        </div>
      </a>
      <nav>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Chamados</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
        <select class="login-select" onchange="location = this.value">
          <option selected disabled>Login</option>
          <option value="externo_login.html">Usuário</option>
          <option value="interno_login.html">Interno</option>
        </select>
      </nav>
    </header>

    <section class="search-section">
      <h1>Como podemos te ajudar?</h1>
      <div class="search-box">
        <input type="text" placeholder="Descreva seu problema ou dúvida">
        <button>Buscar</button>
      </div>
    </section>

    <section class="quick-links">
      <a href="#">Abrir Chamado</a>
      <a href="#">Área Interna</a>
      <a href="#">Base de Conhecimento</a>
      <a href="#">Status do Sistema</a>
    </section>

    <section class="support-info">
      <div class="support-content">
        <div class="support-image">
          <img src="ChatGPT Image Apr 8, 2025, 11_31_24 PM.png" alt="Imagem de Suporte">
        </div>
        <div class="support-text">
          <h2>Nossa missão,<br>SOBRE SUPORTE</h2>
        </div>
      </div>
    </section>
  </div>

  <footer>
    <div>© 2025 NexusDesk - Todos os direitos reservados</div>
    <div class="footer-links">
      <a href="#">Política de Privacidade</a>
      <a href="#">Termos de Uso</a>
      <a href="#">Ajuda</a>
    </div>
  </footer>
</body>
</html>
