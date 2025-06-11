// Importações do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"; 
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Sua configuração do Firebase (Mantenha a mesma do seu projeto)
const firebaseConfig = {
    apiKey: "AIzaSyDswRLlrpFGieUPCQyTpsTkN8kWZmyIje8",
    authDomain: "desksolutions-204dd.firebaseapp.com",
    databaseURL: "https://desksolutions-204dd-default-rtdb.firebaseio.com",
    projectId: "desksolutions-204dd",
    storageBucket: "desksolutions-204dd.appspot.com",
    messagingSenderId: "169920163822",
    appId: "1:169920163822:web:47f6b28c136922ac85e8ff"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// --- SENHA DE ACESSO SECRETA (ATENÇÃO: MANTER SENHAS NO CLIENT-SIDE NÃO É SEGURO PARA PRODUÇÃO) ---
const ADMIN_ACCESS_PASSWORD = 'Admin777'; 
// --- FIM DA SENHA DE ACESSO ---

// Elementos do DOM
const companyRegistrationForm = document.getElementById('companyRegistrationForm');
const companyNameInput = document.getElementById('companyName');
const companyCnpjInput = document.getElementById('companyCnpj');
const companyAddressInput = document.getElementById('companyAddress');
const companyContactEmailInput = document.getElementById('companyContactEmail');
const companyContactPhoneInput = document.getElementById('companyContactPhone');
const registrationMessage = document.getElementById('registrationMessage');

// Elementos do DOM (Modal de Acesso)
const loginModal = document.getElementById('loginModal');
const closeButton = document.querySelector('.modal-content .close-button');
const adminAccessFormModal = document.getElementById('adminAccessFormModal');
const accessPasswordModalInput = document.getElementById('accessPasswordModal');
const modalLoginErrorModal = document.getElementById('modalLoginErrorModal');

// --- Funções de Controle de UI ---
function enablePageUI() {
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.sidebar').style.display = 'flex'; // ou 'block'
}

function disablePageUI() {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none'; 
}

// --- Funções do Modal de Acesso ---
function showAccessModal(errorMessage = '') {
    disablePageUI();
    loginModal.style.display = 'flex';
    modalLoginErrorModal.textContent = errorMessage;
    accessPasswordModalInput.focus();
}

function hideAccessModal() {
    loginModal.style.display = 'none';
    modalLoginErrorModal.textContent = '';
    adminAccessFormModal.reset();
}

async function handleAdminAccess(event) {
    event.preventDefault();

    const enteredPassword = accessPasswordModalInput.value.trim();
    modalLoginErrorModal.textContent = '';

    if (enteredPassword !== ADMIN_ACCESS_PASSWORD) {
        modalLoginErrorModal.textContent = 'Senha de acesso incorreta.';
        console.warn("AVISO: Tentativa de acesso com senha incorreta na página de cadastro de empresas.");
        return;
    }

    const user = auth.currentUser; 
    if (!user) {
        modalLoginErrorModal.textContent = 'Erro: Nenhum usuário logado no Firebase. Por favor, recarregue a página ou faça login normal primeiro.';
        console.error("ERRO: handleAdminAccess - Senha correta, mas sem usuário autenticado no Firebase.");
        return;
    }

    console.log("Acesso concedido pela senha de acesso para o usuário:", user.email, "na página de cadastro de empresas.");
    hideAccessModal();
    enablePageUI(); 
}
// --- Fim das Funções do Modal de Acesso ---


// Ouve o estado de autenticação do usuário
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDoc = await getDoc(doc(firestore, "usuarios", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.tipo === 'admin' || userData.tipo === 'empresa') {
                    console.log("Usuário logado e verificado (Admin ou Empresa - acesso direto) na página de cadastro de empresas:", user.email);
                    hideAccessModal();
                    enablePageUI();
                } else {
                    console.warn("AVISO: Usuário logado é do tipo '" + userData.tipo + "'. Solicitando senha de acesso para cadastro de empresas.");
                    showAccessModal('Sua conta não tem permissão direta. Digite a senha de acesso para esta área.');
                }
            } else {
                console.error("ERRO: Usuário logado, mas perfil não encontrado no Firestore. Solicitando senha de acesso.");
                showAccessModal('Seu perfil não foi encontrado. Insira a senha de acesso se for administrador/empresa.');
            }
        } catch (e) {
            console.error("Erro ao buscar dados do usuário na inicialização da página de cadastro de empresas:", e);
            showAccessModal('Erro ao carregar dados do usuário. Tente novamente.');
        }
    } else {
        console.log("Nenhum usuário Firebase autenticado. Solicitando senha de acesso para cadastro de empresas.");
        showAccessModal('Você precisa estar logado e inserir a senha de acesso para esta área.');
    }
});


// Função para exibir mensagens na UI
function showMessage(message, type) {
    registrationMessage.textContent = message;
    registrationMessage.className = `message ${type}`;
    registrationMessage.style.display = 'block';
    setTimeout(() => {
        registrationMessage.style.display = 'none';
    }, 5000); // Esconde a mensagem após 5 segundos
}

// --- Funções de Máscara de Input Aprimoradas ---

// Máscara para CNPJ (00.000.000/0000-00)
function formatCnpj(value) {
    // Remove tudo que não for dígito
    value = value.replace(/\D/g, ''); 
    // Limita a 14 dígitos
    value = value.substring(0, 14); 

    // Aplica a máscara enquanto digita
    if (value.length > 12) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5');
    } else if (value.length > 8) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
    }
    return value;
}

// Máscara para Telefone (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
function formatPhone(value) {
    // Remove tudo que não for dígito
    value = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos para celular)
    value = value.substring(0, 11);

    // Aplica a máscara enquanto digita
    if (value.length >= 11) { // Para DDD + 9 dígitos (celular)
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) { // Para DDD + 8 dígitos (fixo ou celular antigo)
        value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 2) { // Apenas DDD
        value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else { // Menos de 3 dígitos (apenas o primeiro dígito do DDD, ou vazio)
        value = value.replace(/^(\d*)/, '($1');
    }
    return value;
}

// Adiciona event listeners para as máscaras nos inputs
companyCnpjInput.addEventListener('input', (e) => {
    e.target.value = formatCnpj(e.target.value);
});

companyContactPhoneInput.addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
});
// --- Fim das Funções de Máscara Aprimoradas ---


// Event Listener para o formulário de cadastro de empresas
companyRegistrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const nome = companyNameInput.value.trim();
    // Limpa a máscara para salvar apenas os dígitos
    const cnpj = companyCnpjInput.value.replace(/\D/g, ''); 
    const endereco = companyAddressInput.value.trim();
    const contato = companyContactEmailInput.value.trim();
    // Limpa a máscara para salvar apenas os dígitos
    const telefone = companyContactPhoneInput.value.replace(/\D/g, ''); 

    if (!nome || !cnpj || !endereco || !contato || !telefone) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Validação de formato final para CNPJ (14 dígitos) e Telefone (10 ou 11 dígitos)
    if (cnpj.length !== 14) {
        showMessage('Por favor, insira um CNPJ válido (14 dígitos numéricos).', 'error');
        return;
    }

    // Telefone: Aceita 10 dígitos (DDD + 8) ou 11 dígitos (DDD + 9)
    if (telefone.length < 10 || telefone.length > 11) { 
        showMessage('Por favor, insira um telefone válido (DDD + 8 ou 9 dígitos).', 'error');
        return;
    }

    try {
        await addDoc(collection(firestore, "empresas"), {
            nome: nome,
            cnpj: cnpj, // Salva sem formatação
            endereco: endereco,
            contato: contato,
            telefone: telefone, // Salva sem formatação
            criadoEm: serverTimestamp()
        });

        showMessage('Empresa cadastrada com sucesso!', 'success');
        companyRegistrationForm.reset(); 
        console.log("DEBUG: Empresa cadastrada no Firestore:", nome);

    } catch (error) {
        console.error("ERRO: Erro ao cadastrar empresa:", error);
        showMessage('Erro ao cadastrar empresa: ' + error.message, 'error');
    }
});


// Event Listeners do Modal de Acesso
closeButton.addEventListener('click', () => {
    hideAccessModal();
});
window.addEventListener('click', (event) => {
    if (event.target == loginModal) {
        hideAccessModal();
    }
});
adminAccessFormModal.addEventListener('submit', handleAdminAccess);