4Desk Solutions – Sistema de Gerenciamento de Chamados
📌 Sobre o Projeto
O 4Desk Solutions é um sistema web para gerenciamento de chamados de suporte técnico, desenvolvido como projeto acadêmico no curso de Engenharia de Software. O principal objetivo é oferecer uma solução simples, funcional e acessível para empresas organizarem e acompanharem solicitações de suporte técnico, promovendo uma comunicação mais eficiente entre clientes e técnicos.

Este projeto foi construído sem uso de frameworks, utilizando apenas HTML, CSS, JavaScript e PHP puro, e integrado ao Firebase para autenticação e armazenamento em tempo real.

🎯 Funcionalidades
Para o cliente:
Abertura e acompanhamento de chamados

Perfil com edição de dados

Área de FAQ e notícias

Pesquisa de satisfação pós-atendimento

Para o técnico:
Visualização e atribuição de chamados

Comunicação com clientes dentro da plataforma

Alteração do status do chamado

Histórico de atendimentos e painel administrativo

🛠️ Tecnologias Utilizadas
Front-end: HTML5, CSS3, JavaScript (puro)

Back-end: PHP (inicialmente com XAMPP), posteriormente migrado para Firebase

Banco de Dados: Firebase Firestore & Realtime Database

Autenticação: Firebase Authentication

Envio de E-mails: Formsubmit (substituindo PHPMailer)

Hospedagem: Google Cloud Platform

Arquitetura: MVC (Model-View-Controller)

Controle de versão: Git

🧭 Manual de Uso
🔑 Acesso Inicial
Acesse o site e solicite uma simulação de plano ou preencha o formulário na área "Planos".

Técnicos da 4Desk entrarão em contato após o envio.

👤 Login e Acesso ao Sistema
Clique no botão "Acesso" no canto superior direito.

Apenas usuários cadastrados pela 4Desk conseguem acessar.

Após o login, o usuário é redirecionado ao painel principal.

🧾 Funcionalidades para Clientes
Perfil: Configuração de foto e edição de dados pessoais.

Abertura de Chamados: Escolha da área (redes, computadores, etc.) e envio de formulário detalhado.

Notícias: Informações da empresa exibidas no topo da página.

Sidebar:

Notícias rápidas

FAQ

Pesquisa de satisfação (após encerramento de chamados)

Lista de chamados abertos/encerrados

🛠️ Funcionalidades para Técnicos
Visualização de todos os chamados de empresas associadas

Atribuição de chamados para si ou colegas

Comunicação interna com clientes

Alteração do status dos chamados (em andamento, pausado, fechado, etc.)

Acesso ao histórico completo de chamados

Acesso administrativo para gerenciamento global

Edição de dados do próprio perfil

🗂️ Estrutura do Sistema
Model: Firebase Firestore (dados estruturados em coleções/documentos)

View: HTML + CSS (login, painel do cliente, painel técnico, etc.)

Controller: JavaScript (formulários, banco de dados, autenticação, navegação)

👨‍💻 Equipe
Rafael de Lima Rodrigues – Full Stack Developer

Davi Ramalho de Oliveira – Arquiteto de Sistema & Suporte Técnico

João Pedro Baggio Gonçalves – Interface & Qualidade

Arthur de Macedo Camers – Banco de Dados & Lógica de Negócio
