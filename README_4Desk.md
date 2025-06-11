# 4Desk Solutions

Sistema web para **gerenciamento de chamados de suporte técnico**, desenvolvido como projeto acadêmico no curso de Engenharia de Software (Prática Profissional em Programação Web).

## 👨‍💻 Equipe

- Arthur de Macedo Camers  
- Davi Ramalho de Oliveira  
- João Pedro Baggio Gonçalves  
- Rafael de Lima Rodrigues  

## 📝 Descrição

O 4Desk Solutions é uma aplicação web que permite o **registro, acompanhamento e atualização de chamados**, além de funcionalidades administrativas como **cadastro de usuários** (individual ou em massa) e gerenciamento de permissões.

O projeto utiliza tecnologias nativas como **HTML, CSS, JavaScript e PHP**, e se integra ao **Firebase Realtime Database** para armazenamento e sincronização de dados em tempo real.

## 🔐 Funcionalidades

- Autenticação com **token JWT** armazenado em **cookies com duração de 2 horas**
- Diferenciação de perfis: `cliente`, `staff` e `admin`
- Cadastro manual e **cadastro em massa via arquivos Excel (.xlsx)**
- CRUD de usuários
- Dashboard com visualização de chamados abertos, em andamento e finalizados
- Tema escuro e claro com preferência salva em `localStorage`
- Responsividade e layout leve

## 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Puro (ES6)
- PHP
- Firebase Realtime Database
- Firebase Authentication
- SweetAlert2
- SheetJS (xlsx)

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/RafaelRodrigues777/NexusDesk.git
   ```

2. Abra o projeto com um servidor local (ex: Live Server no VS Code).

3. Configure o Firebase com suas credenciais no arquivo `firebaseConfig`.

4. Certifique-se de permitir autenticação por e-mail/senha e criar a estrutura inicial no Realtime Database.

## 🔐 Autenticação com Cookies

Após o login com Firebase, o sistema gera um token de autenticação (`getIdToken()`) que é armazenado em um **cookie com validade de 2 horas**. Esse cookie é usado para manter sessões ativas e proteger páginas administrativas.

## 📥 Cadastro Massivo via Excel

Você pode subir uma planilha `.xlsx` contendo nome, email e senha de vários usuários. O sistema faz a leitura, valida os dados e cadastra automaticamente os usuários no Firebase Authentication e no Realtime Database.

## 🧪 Credenciais de Teste

```plaintext
Email: teste@teste.com
Senha: 123456
```

> Observação: usuários devem estar previamente cadastrados no Firebase Authentication.

## 📄 Licença

Projeto acadêmico sem fins lucrativos, desenvolvido para fins de aprendizado.
