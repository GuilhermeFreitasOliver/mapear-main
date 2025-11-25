import React from "react";

export type DeckCard = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

export const deckData: DeckCard[] = [
    {
        title: "Orientação",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <line x1="10" y1="90" x2="140" y2="90" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="140,90 130,85 130,95" fill="#eaf0ff" />
                <line x1="20" y1="100" x2="20" y2="20" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="20,20 15,30 25,30" fill="#eaf0ff" />
                <text x="95" y="105" fontSize="10" fill="#aab3d1">Você está aqui</text>
            </svg>
        ),
        description: "Forneça uma pista ou caminho inicial para orientar os alunos.",
    },
    {
        title: "Motivação",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="80" cy="55" r="38" fill="#f59e0b33" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="68" cy="47" r="4" fill="#0b1020" />
                <circle cx="92" cy="47" r="4" fill="#0b1020" />
                <path d="M62 65 Q80 78 98 65" fill="none" stroke="#0b1020" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
        description: "Incentive os estudantes a persistirem diante de desafios.",
    },
    {
        title: "Colaboração Forçada",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="60" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="100" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="80" cy="35" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
            </svg>
        ),
        description: "Membros da equipe devem trabalhar juntos",
    },
    {
        title: "Dica Estratégica",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <polygon points="50,80 80,30 110,80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="70" y1="62" x2="90" y2="62" stroke="#eaf0ff" strokeWidth="3" />
            </svg>
        ),
        description: "Ofereça uma dica que poupe tempo, sem entregar a solução.",
    },
    {
        title: "Reflexão",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <ellipse cx="70" cy="55" rx="40" ry="24" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="60" y="60" fontSize="16" fill="#eaf0ff">…</text>
                <path d="M112 58 C130 48, 142 38, 148 28" fill="none" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="148,28 144,35 152,33" fill="#eaf0ff" />
            </svg>
        ),
        description: "Peça que os alunos parem e reflitam sobre sua estratégia.",
    },
    {
        title: "Erro Produtivo",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <line x1="50" y1="40" x2="110" y2="100" stroke="#eaf0ff" strokeWidth="3" />
                <line x1="110" y1="40" x2="50" y2="100" stroke="#eaf0ff" strokeWidth="3" />
                <text x="72" y="30" fontSize="16" fill="#aab3d1">?</text>
            </svg>
        ),
        description: "Valorize os erros como oportunidade de aprendizado.",
    },
    {
        title: "Exploração Livre",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="30" width="80" height="50" fill="none" stroke="#eaf0ff" strokeDasharray="6 6" strokeWidth="2" />
                <text x="75" y="60" fontSize="18" fill="#eaf0ff">?</text>
            </svg>
        ),
        description: "Permita que os alunos experimentem sem regras.",
    },
    {
        title: "Rotatividade",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <path d="M60 90 A35 35 0 1 1 95 55" fill="none" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="95,55 85,55 90,65" fill="#eaf0ff" />
                <text x="20" y="60" fontSize="16" fill="#eaf0ff">⇌</text>
            </svg>
        ),
        description: "Troque papéis entre os membros da equipe.",
    },
    {
        title: "Abstração",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="55" cy="60" r="22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="78" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <text x="125" y="62" fontSize="16" fill="#eaf0ff">…</text>
            </svg>
        ),
        description: "Simplifique o problema, ignorando detalhes irrelevantes.",
    },
    {
        title: "Padrões",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="50" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="80" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="110" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
            </svg>
        ),
        description: "Encontre repetições e semelhanças para resolver mais rápido.",
    },
    {
        title: "Algoritmo",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <line x1="30" y1="60" x2="70" y2="60" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="70,60 60,55 60,65" fill="#eaf0ff" />
                <line x1="80" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="120,60 110,55 110,65" fill="#eaf0ff" />
            </svg>
        ),
        description: "Crie uma sequência de passos lógicos para alcançar o objetivo.",
    },
    {
        title: "Generalização",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="30" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <rect x="68" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <rect x="106" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <text x="76" y="90" fontSize="16" fill="#eaf0ff">…</text>
            </svg>
        ),
        description: "Use a mesma lógica em diferentes situações.",
    },
    {
        title: "Decomposição",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="35" y="35" width="90" height="50" fill="none" stroke="#eaf0ff" />
                <line x1="35" y1="60" x2="125" y2="60" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="80" y1="35" x2="80" y2="85" stroke="#eaf0ff" strokeDasharray="6 6" />
            </svg>
        ),
        description: "Divida problemas grandes em partes menores.",
    },
    {
        title: "Depuração",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="70" cy="60" r="22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="64" y="64" fontSize="16" fill="#eaf0ff">?</text>
                <path d="M100 60 A28 28 0 1 1 72 32" fill="none" stroke="#ef4444" strokeWidth="3" />
            </svg>
        ),
        description: "Identifique e corrija erros no raciocínio ou código.",
    },
    {
        title: "Sequência Lógica",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="70" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="100" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Siga uma ordem clara de ações para alcançar o objetivo.",
    },
    {
        title: "Pensamento Crítico",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <polygon points="80,30 110,60 80,90 50,60" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="75" y="65" fontSize="16" fill="#eaf0ff">X</text>
            </svg>
        ),
        description: "Avalie alternativas e escolha a melhor solução.",
    },
    {
        title: "Sensores",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="55" cy="60" r="10" fill="none" stroke="#eaf0ff" />
                <circle cx="85" cy="60" r="10" fill="none" stroke="#eaf0ff" />
                <line x1="105" y1="60" x2="135" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="135,60 125,55 125,65" fill="#eaf0ff" />
            </svg>
        ),
        description: "Detecte informações do ambiente (luz, distância, som).",
    },
    {
        title: "Atuadores",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="80" cy="60" r="26" fill="none" stroke="#eaf0ff" />
                <line x1="80" y1="60" x2="110" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="80" y1="60" x2="50" y2="30" stroke="#eaf0ff" strokeWidth="2" />
            </svg>
        ),
        description: "Produza ações: motores, LEDs, braços robóticos.",
    },
    {
        title: "Engrenagens",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <g stroke="#eaf0ff">
                    <circle cx="80" cy="60" r="14" fill="none" />
                    <g>
                        <line x1="80" y1="28" x2="80" y2="44" />
                        <line x1="80" y1="76" x2="80" y2="92" />
                        <line x1="48" y1="60" x2="64" y2="60" />
                        <line x1="96" y1="60" x2="112" y2="60" />
                        <line x1="60" y1="40" x2="70" y2="50" />
                        <line x1="90" y1="70" x2="100" y2="80" />
                        <line x1="60" y1="80" x2="70" y2="70" />
                        <line x1="90" y1="50" x2="100" y2="40" />
                    </g>
                </g>
            </svg>
        ),
        description: "Partes mecânicas podem multiplicar força e movimento.",
    },
    {
        title: "Programação de Robôs",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="30" y="40" width="40" height="26" fill="none" stroke="#eaf0ff" />
                <text x="45" y="57" fontSize="12" fill="#eaf0ff">IF</text>
                <rect x="90" y="40" width="40" height="26" fill="none" stroke="#eaf0ff" />
                <text x="103" y="57" fontSize="12" fill="#eaf0ff">DO</text>
                <line x1="70" y1="53" x2="90" y2="53" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="90,53 82,49 82,57" fill="#eaf0ff" />
            </svg>
        ),
        description: "Crie comandos que dizem ao robô como agir.",
    },
    {
        title: "Modularização",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="35" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="70" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="105" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Monte projetos dividindo em módulos reutilizáveis.",
    },
    {
        title: "Controle e Feedback",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <line x1="30" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="120" y1="60" x2="120" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="120" y1="30" x2="30" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="30" y1="30" x2="30" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="30,60 38,56 38,64" fill="#eaf0ff" />
            </svg>
        ),
        description: "Robôs ajustam suas ações de acordo com os resultados.",
    },
    {
        title: "Colaboração",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="60" cy="55" r="24" fill="none" stroke="#eaf0ff" />
                <circle cx="100" cy="55" r="24" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="35" r="24" fill="none" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Trabalhe em equipe para criar soluções mais criativas.",
    },
    {
        title: "Criatividade",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <polygon points="60,80 80,40 100,80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="70" y1="62" x2="90" y2="62" stroke="#eaf0ff" strokeWidth="3" />
            </svg>
        ),
        description: "Inove combinando ideias e criando projetos originais.",
    },
    {
        title: "Sensor Ultrassônico",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="40" width="70" height="28" fill="none" stroke="#eaf0ff" />
                <circle cx="58" cy="54" r="8" fill="none" stroke="#eaf0ff" />
                <circle cx="90" cy="54" r="8" fill="none" stroke="#eaf0ff" />
                <line x1="112" y1="54" x2="140" y2="48" stroke="#eaf0ff" />
                <line x1="112" y1="54" x2="140" y2="60" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Mede distância por eco. Útil para desviar de obstáculos e mapear o ambiente.",
    },
    {
        title: "Sensor de Linha",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="35" y="40" width="90" height="28" fill="none" stroke="#eaf0ff" />
                <rect x="55" y="48" width="12" height="12" fill="#eaf0ff" />
                <rect x="85" y="48" width="12" height="12" fill="#eaf0ff" />
                <line x1="30" y1="78" x2="130" y2="78" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="61" y1="78" x2="61" y2="92" stroke="#eaf0ff" />
                <line x1="91" y1="78" x2="91" y2="92" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Detecta contraste claro/escuro para seguir trilhas. Base para seguidores de linha.",
    },
    {
        title: "Motor DC",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="50" cy="60" r="14" fill="none" stroke="#eaf0ff" />
                <rect x="64" y="50" width="56" height="20" fill="none" stroke="#eaf0ff" />
                <path d="M58 34 A20 20 0 1 0 58 86" fill="none" stroke="#eaf0ff" strokeWidth="3" />
            </svg>
        ),
        description: "Gira continuamente. Controle de velocidade via PWM e sentido via ponte H.",
    },
    {
        title: "Servo Motor",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="45" y="48" width="70" height="34" fill="none" stroke="#eaf0ff" />
                <line x1="80" y1="48" x2="80" y2="30" stroke="#eaf0ff" strokeWidth="3" />
                <line x1="60" y1="30" x2="100" y2="30" stroke="#eaf0ff" strokeWidth="3" />
                <path d="M80 30 A20 20 0 0 1 65 22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
            </svg>
        ),
        description: "Controle de posição angular. Ideal para braços, garras e direções precisas.",
    },
    {
        title: "Ponte H",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="38" width="80" height="34" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="30" r="6" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="88" r="6" fill="none" stroke="#eaf0ff" />
                <line x1="40" y1="55" x2="20" y2="55" stroke="#eaf0ff" />
                <line x1="120" y1="55" x2="140" y2="55" stroke="#eaf0ff" />
                <line x1="80" y1="36" x2="80" y2="38" stroke="#eaf0ff" />
                <line x1="80" y1="72" x2="80" y2="74" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Controla sentido de rotação do motor invertendo polaridade (frente/ré).",
    },
    {
        title: "PWM",
        icon: (
            <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full h-auto">
                <line x1="20" y1="80" x2="140" y2="80" stroke="#eaf0ff" />
                <path d="M20 80 V50 H44 V80 M60 80 V50 H84 V80 M100 80 V50 H124 V80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="70" y="95" fontSize="10" fill="#aab3d1">largura do pulso</text>
            </svg>
        ),
        description: "Modulação por largura de pulso para controlar potência: velocidade e brilho.",
    },
    {
        title: "PID Simples",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <circle cx="40" cy="60" r="12" fill="none" stroke="#eaf0ff" />
                <text x="36" y="64" fontSize="12" fill="#eaf0ff">e</text>
                <line x1="52" y1="60" x2="84" y2="60" stroke="#eaf0ff" />
                <rect x="84" y="44" width="60" height="32" fill="none" stroke="#eaf0ff" />
                <text x="98" y="64" fontSize="12" fill="#eaf0ff">P + I + D</text>
                <line x1="144" y1="60" x2="172" y2="60" stroke="#eaf0ff" />
                <text x="176" y="64" fontSize="12" fill="#eaf0ff">u</text>
                <line x1="160" y1="58" x2="84" y2="58" stroke="#eaf0ff" strokeDasharray="6 6" />
            </svg>
        ),
        description: "Controle com proporcional, integral e derivativo para correções mais estáveis.",
    },
    {
        title: "Chassi e Transmissão",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="50" y="44" width="100" height="28" fill="none" stroke="#eaf0ff" />
                <circle cx="70" cy="80" r="10" fill="none" stroke="#eaf0ff" />
                <circle cx="130" cy="80" r="10" fill="none" stroke="#eaf0ff" />
                <line x1="100" y1="44" x2="100" y2="24" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="88" y1="24" x2="112" y2="24" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Estrutura mecânica, rodas e eixos. Pensa-se em peso, atrito e estabilidade.",
    },
    {
        title: "Energia e Bateria",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="60" y="44" width="80" height="28" fill="none" stroke="#eaf0ff" />
                <line x1="66" y1="58" x2="90" y2="58" stroke="#eaf0ff" />
                <line x1="78" y1="52" x2="78" y2="64" stroke="#eaf0ff" />
                <line x1="110" y1="58" x2="134" y2="58" stroke="#eaf0ff" />
                <line x1="122" y1="54" x2="122" y2="62" stroke="#eaf0ff" />
                <text x="95" y="90" fontSize="12" fill="#aab3d1">5–9 V</text>
            </svg>
        ),
        description: "Gestão de energia, autonomia e segurança. Dimensione tensão e corrente.",
    },
    {
        title: "Comunicação Serial/Bluetooth",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="46" width="50" height="24" fill="none" stroke="#eaf0ff" />
                <text x="60" y="62" fontSize="10" fill="#eaf0ff" textAnchor="middle">TX</text>
                <rect x="110" y="46" width="50" height="24" fill="none" stroke="#eaf0ff" />
                <text x="135" y="62" fontSize="10" fill="#eaf0ff" textAnchor="middle">RX</text>
                <line x1="90" y1="52" x2="110" y2="52" stroke="#eaf0ff" />
                <line x1="90" y1="58" x2="110" y2="58" stroke="#eaf0ff" />
                <line x1="90" y1="64" x2="110" y2="64" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Troca de dados entre placas e celular. Útil para telemetria e comandos.",
    },
    {
        title: "Modularização (Funções)",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="40" width="70" height="24" fill="none" stroke="#eaf0ff" />
                <text x="75" y="56" fontSize="10" fill="#eaf0ff" textAnchor="middle">lerSensor()</text>
                <rect x="40" y="76" width="70" height="24" fill="none" stroke="#eaf0ff" />
                <text x="75" y="92" fontSize="10" fill="#eaf0ff" textAnchor="middle">atuarMotor()</text>
                <path d="M110 52 H150 V88 H110" fill="none" stroke="#eaf0ff" />
                <polygon points="110,88 118,84 118,92" fill="#eaf0ff" />
            </svg>
        ),
        description: "Separe tarefas em funções reutilizáveis para simplificar e testar melhor.",
    },
    {
        title: "Teste e Depuração",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="34" width="120" height="60" fill="none" stroke="#eaf0ff" />
                <line x1="50" y1="46" x2="150" y2="46" stroke="#eaf0ff" />
                <line x1="60" y1="58" x2="150" y2="58" stroke="#eaf0ff" />
                <line x1="70" y1="70" x2="150" y2="70" stroke="#eaf0ff" />
                <circle cx="70" cy="70" r="4" fill="#ef4444" />
                <line x1="70" y1="74" x2="70" y2="88" stroke="#ef4444" />
            </svg>
        ),
        description: "Use monitor serial, casos de teste e logs para achar e corrigir erros.",
    },
    {
        title: "Segurança",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <polygon points="80,30 120,30 120,70 100,90 80,70" fill="none" stroke="#eaf0ff" />
                <polygon points="95,50 105,50 100,60" fill="none" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Proteja olhos e mãos, isole fios, verifique curto-circuitos e aquecimento.",
    },
    {
        title: "Documentação",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="70" y="28" width="60" height="80" fill="none" stroke="#eaf0ff" />
                <line x1="78" y1="46" x2="122" y2="46" stroke="#eaf0ff" />
                <line x1="78" y1="58" x2="122" y2="58" stroke="#eaf0ff" />
                <line x1="78" y1="70" x2="122" y2="70" stroke="#eaf0ff" />
                <line x1="78" y1="82" x2="110" y2="82" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Registre versões, esquemas e decisões. Facilita colaboração e manutenção.",
    },
    {
        title: "Protoboard e Fiação",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="50" y="34" width="120" height="60" fill="none" stroke="#eaf0ff" />
                <g stroke="#eaf0ff">
                    <line x1="60" y1="44" x2="60" y2="84" />
                    <line x1="66" y1="44" x2="66" y2="84" />
                    <line x1="72" y1="44" x2="72" y2="84" />
                    <line x1="78" y1="44" x2="78" y2="84" />
                    <line x1="84" y1="44" x2="84" y2="84" />
                    <line x1="90" y1="44" x2="90" y2="84" />
                    <line x1="96" y1="44" x2="96" y2="84" />
                    <line x1="102" y1="44" x2="102" y2="84" />
                </g>
                <line x1="172" y1="64" x2="150" y2="64" stroke="#eaf0ff" />
                <polygon points="150,64 158,60 158,68" fill="#eaf0ff" />
            </svg>
        ),
        description: "Monte circuitos sem solda, organize fios e alimente corretamente os trilhos.",
    },
    {
        title: "Peças 3D e Reciclagem",
        icon: (
            <svg viewBox="0 0 200 110" aria-hidden="true" className="w-full h-auto">
                <rect x="40" y="52" width="60" height="28" fill="none" stroke="#eaf0ff" />
                <rect x="110" y="52" width="60" height="28" fill="none" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="70" y1="52" x2="70" y2="32" stroke="#eaf0ff" />
                <polygon points="60,32 80,32 70,18" fill="none" stroke="#eaf0ff" />
            </svg>
        ),
        description: "Estruture com impressora 3D ou materiais recicláveis: leve, forte e barato.",
    },
];
