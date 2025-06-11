        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
        import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

        // Sua configuração do Firebase
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
        const storage = getStorage(app);

        // --- Funções de Lógica de Perfil ---

        // Função para carregar e preencher os dados do perfil do usuário
        async function loadUserProfile() {
            console.log("loadUserProfile() iniciado.");
            const user = auth.currentUser;
            if (!user) {
                console.warn("loadUserProfile: Nenhum usuário autenticado. Redirecionando...");
                window.location.href = "../html/externo_login.html";
                return;
            }

            const email = user.email;

            document.getElementById("profileEmail").innerText = email;
            document.getElementById("editEmail").value = email;
            document.getElementById("editEmail").disabled = true;

            try {
                const userDocRef = doc(firestore, 'usuarios', user.uid);
                const userDoc = await getDoc(userDocRef);

                const userData = userDoc.exists() ? userDoc.data() : {};
                const nome = userData?.nome || user.displayName || "Usuário";
                const fotoUrlFirestore = userData?.profileImageUrl || null;

                document.getElementById("profileName").innerText = "Hi, " + nome + "!";
                document.getElementById("profileAvatar").innerText = nome.charAt(0).toUpperCase();
                document.getElementById("editNome").value = nome;
                document.getElementById("editNome").disabled = true;

                const avatar = document.getElementById("profileAvatar");
                if (fotoUrlFirestore) {
                    avatar.style.backgroundImage = `url('${fotoUrlFirestore}')`;
                    avatar.style.backgroundSize = "cover";
                    avatar.style.backgroundPosition = "center";
                    avatar.innerText = "";
                } else if (user.photoURL) {
                    avatar.style.backgroundImage = `url('${user.photoURL}')`;
                    avatar.style.backgroundSize = "cover";
                    avatar.style.backgroundPosition = "center";
                    avatar.innerText = "";
                } else {
                    avatar.style.backgroundImage = "none";
                    avatar.innerText = nome.charAt(0).toUpperCase();
                }

                const previewFoto = document.getElementById("previewFoto");
                if (fotoUrlFirestore || user.photoURL) {
                    previewFoto.src = fotoUrlFirestore || user.photoURL;
                    previewFoto.style.display = "block";
                } else {
                    previewFoto.style.display = "none";
                    previewFoto.src = "";
                }
                console.log("loadUserProfile() concluído com sucesso.");

            } catch (error) {
                console.error("Erro em loadUserProfile (Firestore/UI update):", error);
                document.getElementById("profileName").innerText = "Hi, " + (user.displayName || "Usuário") + "!";
                document.getElementById("profileEmail").innerText = user.email;
                document.getElementById("profileAvatar").innerText = (user.displayName || "U").charAt(0).toUpperCase();
                document.getElementById("editNome").value = user.displayName || "Usuário";
                document.getElementById("editNome").disabled = true;
                document.getElementById("editEmail").value = user.email;
            }
        }

        // --- Funções de Manipulação do DOM e Eventos ---

        // Executa quando o DOM estiver completamente carregado
        document.addEventListener('DOMContentLoaded', () => {
            console.log("DOM completamente carregado. Configurando listeners.");

            // Listener para o estado de autenticação do Firebase
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("onAuthStateChanged: Usuário autenticado:", user.email);
                    loadUserProfile(); // Carrega o perfil se o usuário estiver logado
                } else {
                    console.warn("onAuthStateChanged: Nenhum usuário autenticado. Redirecionando para login.");
                    // Redireciona para a página de login se não houver usuário logado
                    window.location.href = "../html/externo_login.html";
                }
            });

            // Adiciona listeners para os botões do modal
            const closeButton = document.querySelector("#configModal .close");
            if (closeButton) {
                closeButton.addEventListener('click', fecharModal);
            } else {
                console.error("Erro: Botão de fechar modal não encontrado.");
            }

            // Listener para fechar o modal ao clicar fora dele
            window.addEventListener('click', (event) => {
                const modal = document.getElementById("configModal");
                if (modal && event.target === modal) {
                    fecharModal();
                }
            });

            // Listener para o botão de Sair
            const signOutButton = document.querySelector(".signout");
            if (signOutButton) {
                signOutButton.addEventListener("click", async () => {
                    try {
                        await signOut(auth);
                        alert("Você foi desconectado.");
                        window.location.href = "../html/externo_login.html";
                    } catch (error) {
                        console.error("Erro ao fazer logout:", error);
                        alert("Erro ao tentar sair: " + error.message);
                    }
                });
            } else {
                console.error("Erro: Botão de sair não encontrado.");
            }

            // Adicionar event listeners para os cards
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('click', (event) => {
                    // Pega o tipo de chamado do atributo onclick no HTML e extrai o valor
                    const onclickAttr = card.getAttribute('onclick');
                    const tipo = onclickAttr.match(/'([^']+)'/)[1];
                    window.location.href = `../html/aberto.html?tipo=${tipo}`;
                });
            });
        }); // Fim do DOMContentLoaded

        // Funções auxiliares (globalmente acessíveis se chamadas via onclick no HTML)
        // Tornando abrirChamado globalmente acessível
        window.abrirChamado = function(tipo) {
            window.location.href = `../html/aberto.html?tipo=${tipo}`;
        }

        window.toggleSidebar = function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            } else {
                console.error("Erro: Sidebar não encontrada.");
            }
        }

        window.fecharModal = function() {
            const configModal = document.getElementById("configModal");
            if (configModal) {
                configModal.style.display = "none";
                // Limpa a preview da foto ao fechar o modal
                document.getElementById("previewFoto").style.display = "none";
                document.getElementById("previewFoto").src = "";
                document.getElementById("editFoto").value = ""; 
            }
        }

        // Função para abrir o modal de configurações
        window.abrirModal = function() { // Expor para o escopo global para onclick no HTML
            console.log("abrirModal() chamado por clique.");
            const configModal = document.getElementById("configModal");
            const mainView = document.getElementById("mainView");
            const editView = document.getElementById("editView");

            if (configModal && mainView && editView) {
                configModal.style.display = "block";
                mainView.style.display = "block";
                editView.style.display = "none";
                
                // Recarrega o perfil para garantir dados atualizados ao abrir o modal
                loadUserProfile(); 
            } else {
                console.error("Erro: Elementos do modal de configuração não encontrados. Verifique IDs e estrutura HTML.");
            }
        }

        window.abrirEdicao = async function() { // Expor para o escopo global
            console.log("abrirEdicao() chamado.");
            document.getElementById("mainView").style.display = "none";
            document.getElementById("editView").style.display = "block";
            await loadUserProfile(); 
        }

        window.voltar = function() { // Expor para o escopo global
            console.log("voltar() chamado.");
            document.getElementById("mainView").style.display = "block";
            document.getElementById("editView").style.display = "none";
            // Ao voltar, é bom garantir que a preview seja resetada ou escondida
            document.getElementById("previewFoto").style.display = "none";
            document.getElementById("previewFoto").src = "";
            document.getElementById("editFoto").value = ""; 
        }

        window.salvarFoto = async function() { // Expor para o escopo global
            console.log("salvarFoto() iniciado.");
            const user = auth.currentUser;
            if (!user) {
                alert("Nenhum usuário logado.");
                return;
            }

            const fileInput = document.getElementById("editFoto");
            const file = fileInput ? fileInput.files[0] : null;

            if (!file) {
                alert("Nenhuma imagem selecionada para upload.");
                return;
            }

            const photoRef = storageRef(storage, 'users/' + user.uid + '/profile.jpg');

            try {
                const snapshot = await uploadBytes(photoRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const userDocRef = doc(firestore, 'usuarios', user.uid);
                await updateDoc(userDocRef, {
                    profileImageUrl: downloadURL
                });

                const avatar = document.getElementById("profileAvatar");
                if (avatar) {
                    avatar.style.backgroundImage = `url('${downloadURL}')`;
                    avatar.style.backgroundSize = "cover";
                    avatar.style.backgroundPosition = "center";
                    avatar.innerText = "";
                }

                alert("Foto de perfil atualizada com sucesso!");
                voltar(); 
                console.log("salvarFoto() concluído com sucesso.");
            } catch (error) {
                console.error("Erro ao fazer upload ou salvar foto:", error);
                alert("Erro ao atualizar a foto: " + error.message);
            }
        }

        window.atualizarPreview = function(event) { // Expor para o escopo global
            console.log("atualizarPreview() chamado.");
            const reader = new FileReader();
            reader.onload = function(){
                const img = document.getElementById("previewFoto");
                if (img) {
                    img.src = reader.result;
                    img.style.display = "block";
                } else {
                    console.error("Erro: Elemento previewFoto não encontrado.");
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
