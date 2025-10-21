/**
 * Lógica JavaScript para demonstrar o Trusted Types e DOMPurify.
 * Este script deve ser carregado após DOMPurify.
 */

// Elementos DOM
const outputArea = document.getElementById('output-area');
const outputConsole = document.getElementById('output-console');
const btnErro = document.getElementById('btn-erro');
const btnCorreto = document.getElementById('btn-correto');

// Payload que simula um ataque XSS (injeta uma tag <img> com um script de erro).
// O 'src=x' é intencionalmente inválido para garantir que o 'onerror' seja acionado se a defesa falhar.
const MALICIOUS_PAYLOAD = `<h1>Ataque XSS:</h1><img src=x style="border: 1px dashed red; width: 100px; height: 30px; display: block; margin-bottom: 10px;" onerror="log('XSS INJETADO! Se esta mensagem aparecer no console do browser, a proteção falhou.', 'error'); alert('XSS Ativado!')">` + 
                          `<p class="mt-2 text-red-500 font-bold">O código malicioso está no atributo 'onerror'.</p>`;


/**
 * Função para registrar mensagens no console da aplicação.
 * @param {string} message - A mensagem a ser logada.
 * @param {string} type - O tipo de mensagem ('info', 'error', 'success').
 */
const log = (message, type = 'info') => {
    const now = new Date().toLocaleTimeString('pt-BR');
    let colorClass = 'text-gray-300';
    if (type === 'error') colorClass = 'text-red-400';
    if (type === 'success') colorClass = 'text-green-400';

    // Cria o novo log e adiciona ao topo
    const newLogEntry = `<span class="${colorClass}">[${now} - ${type.toUpperCase()}]</span> ${message}`;
    // Usamos innerHTML para adicionar cores, mas DOMPurify.sanitize é desnecessário aqui por ser console de debug.
    outputConsole.innerHTML = newLogEntry + '\n' + outputConsole.innerHTML;
};

/**
 * Configura e cria a política Trusted Types.
 * @returns {TrustedTypePolicy | null} A política criada ou null se indisponível.
 */
const setupTrustedTypes = () => {
    if (typeof trustedTypes === 'undefined') {
        log("Trusted Types API INDISPONÍVEL. Verifique se o navegador suporta e se o CSP está ativo.", 'error');
        btnErro.disabled = true;
        btnCorreto.disabled = true;
        return null;
    }
    
    log("Trusted Types API detectada. Criando política 'securePolicy'...", 'info');
    
    // ----------------------------------------------------
    // CRIAÇÃO DA POLÍTICA
    // ----------------------------------------------------
    const policy = trustedTypes.createPolicy("securePolicy", {  
        
        // 1. Tratamento para createHTML (Sanitização)
        createHTML: (input) => {
            log(`Policy: createHTML chamado. Sanitizando HTML usando DOMPurify...`, 'info');
            // DOMPurify remove todos os atributos perigosos (como 'onerror')
            const cleanHtml = DOMPurify.sanitize(input, { SAFE_FOR_TEMPLATES: true, FORCE_BODY: true });
            
            // O retorno desta string será automaticamente embrulhado em TrustedHTML
            return cleanHtml;
        },
        
        // 2. Tratamento para createScript (Validação manual, como no seu exemplo)
        createScript: (input) => {
            if (input.includes("eval(") || input.includes("document.write")) {
                log(`Policy: createScript bloqueado: Função JS perigosa ('eval' ou 'document.write') detectada!`, 'error');
                throw new Error("Script não confiável: Uso de função perigosa detectado.");
            }   
            log("Policy: createScript aprovado. Retornando script confiável.", 'success');
            return input;
        },
    });
    
    log("Política 'securePolicy' criada com sucesso. innerHTML só aceitará TrustedHTML/TrustedScript.", 'success');
    return policy;
};

// Inicializa a política
const trustedPolicy = setupTrustedTypes();


// ==============================================================
// DEMONSTRAÇÃO 1: ERRO (innerHTML direto)
// ==============================================================
btnErro.addEventListener('click', () => {
    outputArea.innerHTML = '<p class="text-gray-500 italic">Tentando injetar HTML...</p>';
    log("--- Tentativa de ERRO ---", 'info');
    log("Tentando atribuir payload MALICIOSO diretamente via innerHTML...", 'info');

    try {
        // *** ESTA LINHA VAI PROVOCAR O TypeError ***
        // Se o CSP estiver ativo, o navegador lança um erro, impedindo a injeção.
        outputArea.innerHTML = MALICIOUS_PAYLOAD;

        // Se esta linha for alcançada, o Trusted Types NÃO ESTÁ ATIVO no ambiente
        log("ATENÇÃO: innerHTML foi executado com sucesso. Trusted Types não está ativo. (Vulnerável)", 'error');
        outputArea.innerHTML = MALICIOUS_PAYLOAD; // Renderiza o XSS para fins de demonstração visual se o TT estiver inativo.

    } catch (error) {
        // Bloco executado quando o Trusted Types está ativo e bloqueia a string simples.
        log(`BLOQUEIO BEM-SUCEDIDO: ${error.name} - ${error.message}`, 'error');
        outputArea.innerHTML = `<p class="text-red-600 font-bold mt-2">🛡️ BLOQUEADO! O Trusted Types impediu a atribuição insegura ao innerHTML.</p>`;
    }
});

// ==============================================================
// DEMONSTRAÇÃO 2: CORRETO (Uso da Política com Sanitização)
// ==============================================================
btnCorreto.addEventListener('click', () => {
    outputArea.innerHTML = '<p class="text-gray-500 italic">Tentando injetar HTML seguro...</p>';
    log("--- Tentativa CORRETA ---", 'info');
    log("Injetando payload MALICIOSO, mas utilizando a política 'createHTML'...", 'info');

    try {
        // 1. Chamamos a política para transformar a string insegura em TrustedHTML.
        // A função createHTML sanitiza (remove o 'onerror') e retorna uma string limpa.
        const safeHTML = trustedPolicy.createHTML(MALICIOUS_PAYLOAD);

        // 2. Atribuímos o objeto TrustedHTML ao innerHTML.
        // O Trusted Types permite esta operação, pois a origem do HTML é confiável (a política).
        outputArea.innerHTML = safeHTML;
        
        // Remove a mensagem XSS, mas mantém o visual do HTML limpo
        log("Atribuição de innerHTML realizada com sucesso. O HTML foi sanitizado e o código XSS foi removido.", 'success');
        outputArea.classList.add('bg-green-50', 'p-2', 'rounded');

    } catch (error) {
        log(`Erro ao executar a política (Estrutural): ${error.message}`, 'error');
    }
});