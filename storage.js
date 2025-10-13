// mapear-main/storage.js

const defaultState = () => ({
  progress: {
    padroes: { completed: false, attempts: 0 },
    abstracao: { completed: false, attempts: 0 },
    decomposicao: { completed: false, attempts: 0 },
    algoritmo: { completed: false, attempts: 0 },
    generalizacao: { completed: false, attempts: 0 },
    robotica: { completed: false, attempts: 0 }
  },
  reflections: {
    padroes: '',
    abstracao: '',
    decomposicao: '',
    algoritmo: '',
    generalizacao: '',
    robotica: ''
  },
  scores: {
    padroes: null,
    abstracao: null,
    decomposicao: null,
    algoritmo: null,
    generalizacao: null,
    robotica: null
  },
  achievements: [],
  events: []
});

// Função para salvar o estado no Firestore
async function saveState(next) {
  const user = MapearAuth.getCurrentUser();
  if (!user) {
    console.warn("Nenhum usuário logado. O progresso não será salvo na nuvem.");
    // Fallback para localStorage se não houver usuário
    localStorage.setItem('mapear_state_v1_local', JSON.stringify(next));
    return;
  }

  const docRef = db.collection('userProgress').doc(user.uid);
  try {
    await docRef.set(next);
    console.log("Progresso salvo no Firestore!");
  } catch (error) {
    console.error("Erro ao salvar progresso no Firestore:", error);
  }
}

// Função para obter o estado do Firestore
async function getState() {
  const user = MapearAuth.getCurrentUser();
  if (!user) {
    console.warn("Nenhum usuário logado. Carregando progresso local (se houver).");
    // Fallback para localStorage
    const localData = localStorage.getItem('mapear_state_v1_local');
    return localData ? JSON.parse(localData) : defaultState();
  }

  const docRef = db.collection('userProgress').doc(user.uid);
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("Progresso carregado do Firestore!");
      // Mescla o estado padrão com os dados do Firestore para garantir que todas as chaves existam
      const def = defaultState();
      const firestoreData = doc.data();
      return {
        ...def,
        ...firestoreData,
        progress: { ...def.progress, ...(firestoreData.progress || {}) },
        reflections: { ...def.reflections, ...(firestoreData.reflections || {}) },
        scores: { ...def.scores, ...(firestoreData.scores || {}) }
      };
    } else {
      console.log("Nenhum progresso encontrado no Firestore. Usando estado padrão.");
      return defaultState();
    }
  } catch (error) {
    console.error("Erro ao carregar progresso do Firestore:", error);
    return defaultState();
  }
}

// Objeto Storage com funções assíncronas
const Storage = {
  _currentState: null,

  // Carrega o estado inicial uma vez para evitar múltiplas leituras
  async initialize() {
    this._currentState = await getState();
    return this._currentState;
  },

  // Retorna o estado já carregado
  getCurrentState() {
    return this._currentState || defaultState();
  },

  // Atualiza o estado local e salva na nuvem
  async update(updater) {
    if (!this._currentState) await this.initialize();
    const next = updater({ ...this._currentState });
    this._currentState = next;
    await saveState(next);
    return next;
  },

  record: function(type, payload) {
    return this.update(s => {
      if (!s.events) s.events = [];
      s.events.push({ type, payload, ts: Date.now() });
      return s;
    });
  },
  reflect: function(key, text) {
    return this.update(s => { s.reflections[key] = text; return s; });
  },
  score: function(key, score) {
    return this.update(s => { s.scores[key] = score; return s; });
  },
  complete: function(key) {
    return this.update(s => { s.progress[key].completed = true; return s; });
  },
  attempt: function(key) {
    return this.update(s => { s.progress[key].attempts = (s.progress[key].attempts || 0) + 1; return s; });
  },
  achieve: function(text) {
    return this.update(s => {
      if (!s.achievements) s.achievements = [];
      if (!s.achievements.includes(text)) s.achievements.push(text);
      return s;
    });
  },
  reset: async function() {
    const newState = defaultState();
    this._currentState = newState;
    await saveState(newState);
    console.log("Progresso resetado.");
  }
};