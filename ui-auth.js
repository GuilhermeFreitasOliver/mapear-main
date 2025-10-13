document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos do DOM ---
  const authModal = document.getElementById('auth-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const userStatusDiv = document.getElementById('user-status');

  // Views
  const loginView = document.getElementById('login-view');
  const registerView = document.getElementById('register-view');

  // Links para trocar de view
  const showRegisterLink = document.getElementById('show-register-view');
  const showLoginLink = document.getElementById('show-login-view');

  // Forms
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // Botões
  const googleSignInBtn = document.getElementById('google-signin-btn');
  const authError = document.getElementById('auth-error');

  // --- Funções da UI ---

  const showModal = () => authModal.style.display = 'block';
  const hideModal = () => authModal.style.display = 'none';

  const showLoginView = () => {
    registerView.style.display = 'none';
    loginView.style.display = 'block';
    authError.style.display = 'none';
  };

  const showRegisterView = () => {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
    authError.style.display = 'none';
  };

  const displayError = (message) => {
    authError.textContent = message;
    authError.style.display = 'block';
  };

  const updateUI = async (user) => {
    if (user) {
      const userProfile = await MapearAuth.getUserProfile(user.uid);
      const name = userProfile?.name || user.email;
      userStatusDiv.innerHTML = `
        <span class="muted">Olá, ${name}</span>
        <button id="logout-btn" class="btn ghost">Sair</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', () => {
        MapearAuth.signOut();
      });
      hideModal();
    } else {
      userStatusDiv.innerHTML = `
        <button id="login-btn" class="btn primary">Entrar</button>
      `;
      document.getElementById('login-btn').addEventListener('click', showModal);
    }
  };

  // --- Event Listeners ---

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (showRegisterLink) showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showRegisterView(); });
  if (showLoginLink) showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLoginView(); });

  // Login com Email
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      try {
        await MapearAuth.loginWithEmail(email, password);
        // O onAuthStateChanged vai cuidar de atualizar a UI
      } catch (error) {
        displayError('Falha no login. Verifique seu email e senha.');
        console.error("Erro de login:", error);
      }
    });
  }

  // Registro com Email
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const age = document.getElementById('register-age').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      try {
        const userCredential = await MapearAuth.registerWithEmail(email, password);
        const user = userCredential.user;
        // Salva os dados extras no Firestore
        await MapearAuth.createUserProfile(user.uid, name, age, email);
        // O onAuthStateChanged vai cuidar de atualizar a UI
      } catch (error) {
        displayError('Erro ao registrar. Verifique os dados e tente novamente.');
        console.error("Erro de registro:", error);
      }
    });
  }


  // Login com Google
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', () => {
      MapearAuth.signInWithGoogle().catch(error => {
        displayError('Não foi possível fazer login com o Google.');
        console.error("Erro Google Sign-In:", error);
      });
    });
  }

  // --- Observador de Estado de Autenticação ---
  MapearAuth.onAuthStateChanged(user => {
    updateUI(user);
    // Adicional: se o usuário for resultado de um redirect do Google,
    // podemos querer salvar o perfil dele caso seja a primeira vez.
    if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        firebase.auth().getRedirectResult().then(async (result) => {
            if (result.user && result.additionalUserInfo.isNewUser) {
                const { uid, displayName, email } = result.user;
                // Tenta buscar o perfil. Se não existir, cria um.
                const profile = await MapearAuth.getUserProfile(uid);
                if (!profile) {
                    await MapearAuth.createUserProfile(uid, displayName, null, email);
                    updateUI(result.user); // Re-renderiza com o nome
                }
            }
        }).catch(error => {
            console.error("Erro ao obter resultado do redirect:", error);
        });
    }
  });

});

