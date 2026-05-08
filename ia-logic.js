/**
 * LÓGICA DEL CHAT IA - ia-logic.js
 * 
 * Este archivo contiene:
 * - Clase IAChat: controla todo el funcionamiento del chat
 * - Detección de crisis automática
 * - Generación de respuestas contextuales
 * - Manejo de eventos (enviar, abrir, cerrar)
 */

class IAChat {
  constructor() {
    // Variables para los elementos del DOM
    this.modal = document.getElementById('ia-modal');
    this.toggleBtn = document.getElementById('ia-toggle-btn');
    this.closeBtn = document.getElementById('ia-close-btn');
    this.messagesContainer = document.getElementById('ia-messages');
    this.inputField = document.getElementById('ia-input');
    this.sendBtn = document.getElementById('ia-send-btn');
    this.countrySelect = document.getElementById('ia-country');
    this.crisisAlert = document.getElementById('ia-crisis-alert');
    this.emergencyLinesContainer = document.getElementById('ia-emergency-lines');

    // Variables de estado
    this.isOpen = false;
    this.conversationHistory = [];
    this.userCountry = localStorage.getItem('userCountry') || 'colombia';

    // Cargar historial previo
    this.loadConversationHistory();

    // Inicializar eventos
    this.initializeEvents();

    // Restaurar selección de país
    this.countrySelect.value = this.userCountry;

    console.log('✅ Chat IA inicializado correctamente');
  }

  /**
   * Inicializa todos los eventos del chat
   */
  initializeEvents() {
    // Abrir/Cerrar chat
    this.toggleBtn.addEventListener('click', () => this.toggleChat());
    this.closeBtn.addEventListener('click', () => this.closeChat());

    // Enviar mensaje
    this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSendMessage();
    });

    // Cambiar país
    this.countrySelect.addEventListener('change', (e) => {
      this.userCountry = e.target.value;
      localStorage.setItem('userCountry', this.userCountry);
    });
  }

  /**
   * Abre o cierra el modal del chat
   */
  toggleChat() {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat() {
    this.modal.style.display = 'flex';
    this.isOpen = true;
    this.inputField.focus();
    console.log('💬 Chat abierto');
  }

  closeChat() {
    this.modal.style.display = 'none';
    this.isOpen = false;
    console.log('💬 Chat cerrado');
  }

  /**
   * Maneja el envío de mensajes
   */
  handleSendMessage() {
    const userMessage = this.inputField.value.trim();

    // No enviar si está vacío
    if (!userMessage) return;

    // Agregar mensaje del usuario
    this.addMessage(userMessage, 'user');

    // Limpiar input
    this.inputField.value = '';
    this.inputField.focus();

    // Detectar si es una crisis
    const isCrisis = this.detectCrisis(userMessage);

    if (isCrisis) {
      console.log('🚨 CRISIS DETECTADA');
      this.showCrisisAlert();
    } else {
      this.hideCrisisAlert();
    }

    // Generar respuesta del bot (con delay para parecer más natural)
    setTimeout(() => {
      const botResponse = this.generateResponse(userMessage, isCrisis);
      this.addMessage(botResponse, 'bot');
    }, 500);

    // Guardar en historial
    this.saveConversationHistory();
  }

  /**
   * Agrega un mensaje al chat (usuario o bot)
   */
  addMessage(text, sender) {
    // Crear elemento del mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `ia-message ia-${sender}-message`;

    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;

    messageDiv.appendChild(messageParagraph);
    this.messagesContainer.appendChild(messageDiv);

    // Scroll automático al final
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    // Guardar en historial
    this.conversationHistory.push({
      sender: sender,
      text: text,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * DETECTA CRISIS automáticamente
   * Busca palabras clave que indiquen emergencia
   */
  detectCrisis(message) {
    const lowerMessage = message.toLowerCase();

    // Palabras clave de suicidio/autolesión
    const crisisKeywords = [
      'suicidio', 'suicidarme', 'me quiero matar', 'quiero morir',
      'autolesión', 'autolesiones', 'cortarme', 'hacerme daño',
      'desaparecer', 'no quiero vivir', 'mejor muerto',
      'me voy a matar', 'adiós mundo', 'último día',
      'lastimar', 'herirme', 'sangre', 'veneno',
      'ahorca', 'saltar', 'accidente'
    ];

    // Buscar palabras clave
    for (const keyword of crisisKeywords) {
      if (lowerMessage.includes(keyword)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Muestra la alerta de crisis con números de emergencia
   */
  showCrisisAlert() {
    this.crisisAlert.style.display = 'block';
    this.emergencyLinesContainer.innerHTML = '';

    // Obtener líneas de emergencia por país
    const emergencyLines = this.getEmergencyLines(this.userCountry);

    // Mostrar cada línea
    emergencyLines.forEach(line => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'ia-emergency-line';
      lineDiv.innerHTML = `
        <strong>📞 ${line.country}</strong><br>
        ${line.type}: <strong>${line.phone}</strong><br>
        <a href="tel:${line.phone.replace(/\D/g, '')}" style="font-size: 0.9rem;">
          → Llamar ahora
        </a>
      `;
      this.emergencyLinesContainer.appendChild(lineDiv);
    });

    // Agregar líneas mundiales también
    const worldLines = this.getEmergencyLines('mundial');
    if (worldLines.length > 0) {
      const divider = document.createElement('div');
      divider.style.marginTop = '10px';
      divider.innerHTML = '<hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">';
      this.emergencyLinesContainer.appendChild(divider);

      worldLines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'ia-emergency-line';
        lineDiv.innerHTML = `
          <strong>🌍 ${line.country}</strong><br>
          ${line.type}: <strong>${line.phone}</strong>
        `;
        this.emergencyLinesContainer.appendChild(lineDiv);
      });
    }

    console.log('🚨 Alerta de crisis mostrada');
  }

  /**
   * Obtiene líneas de emergencia por país
   */
  getEmergencyLines(country) {
    const lines = {
      colombia: [
        { country: 'Colombia 🇨🇴', type: 'Línea PAS', phone: '01 800 112 757' },
        { country: 'Colombia 🇨🇴', type: 'Emergencia', phone: '911' },
        { country: 'Colombia 🇨🇴', type: 'Teléfono de la Esperanza', phone: '2 593 0099' }
      ],
      mexico: [
        { country: 'México 🇲🇽', type: 'LOCTEL', phone: '55 5259 8121' },
        { country: 'México 🇲🇽', type: 'Emergencia', phone: '911' },
        { country: 'México 🇲🇽', type: 'Prevensuicidas', phone: '55 5272 1366' }
      ],
      argentina: [
        { country: 'Argentina 🇦🇷', type: 'Centro de Asistencia', phone: '011 4127 9000' },
        { country: 'Argentina 🇦🇷', type: 'Emergencia', phone: '911' }
      ],
      peru: [
        { country: 'Perú 🇵🇪', type: 'Teléfono de la Esperanza', phone: '1 273 9999' },
        { country: 'Perú 🇵🇪', type: 'Emergencia', phone: '911' }
      ],
      chile: [
        { country: 'Chile 🇨🇱', type: 'Fono de la Esperanza', phone: '1 41 92 83 00' },
        { country: 'Chile 🇨🇱', type: 'Emergencia', phone: '131' }
      ],
      brasil: [
        { country: 'Brasil 🇧🇷', type: 'CVV', phone: '188' },
        { country: 'Brasil 🇧🇷', type: 'Emergencia', phone: '192' }
      ],
      spain: [
        { country: 'España 🇪🇸', type: 'Telequipo Ayuda', phone: '024' },
        { country: 'España 🇪🇸', type: 'Emergencia', phone: '112' }
      ],
      usa: [
        { country: 'USA 🇺🇸', type: 'National Suicide Prevention', phone: '988' },
        { country: 'USA 🇺🇸', type: 'Crisis Text Line', phone: 'Text HOME a 741741' }
      ],
      mundial: [
        { country: 'Internacional', type: 'Befrienders.org', phone: 'www.befrienders.org' },
        { country: 'Internacional', type: 'Suicide Spot', phone: 'www.suicidespot.com' }
      ]
    };

    return lines[country] || lines.mundial;
  }

  /**
   * Oculta la alerta de crisis
   */
  hideCrisisAlert() {
    this.crisisAlert.style.display = 'none';
  }

  /**
   * GENERA RESPUESTAS CONTEXTUALES
   * Entiende el estado emocional del usuario
   */
  generateResponse(userMessage, isCrisis) {
    const lowerMessage = userMessage.toLowerCase();

    // Si es una crisis, respuesta prioritaria
    if (isCrisis) {
      const crisisResponses = [
        '💙 Veo que estás pasando por un momento muy difícil. No estás solo/a. Por favor, contacta a las líneas de emergencia que se muestran arriba. Ellos están entrenados para ayudarte.',
        '🚨 Tu vida es valiosa. Lo que sientes ahora es temporal. Los profesionales en las líneas de emergencia pueden darte el apoyo que necesitas AHORA MISMO.',
        '💙 Sé que duele, pero hay gente que puede ayudarte. Llama a los números que ves arriba. Son profesionales capacitados en crisis.',
        '❤️ En este momento es crucial que hables con alguien. Usa los números de emergencia. No es debilidad pedir ayuda, es fortaleza.'
      ];
      return crisisResponses[Math.floor(Math.random() * crisisResponses.length)];
    }

    // Detectar emociones negativas
    const sadKeywords = ['triste', 'deprimido', 'mal', 'horrible', 'pésimo', 'terrible', 'llorando', 'llorar'];
    const anxiousKeywords = ['ansioso', 'ansiedad', 'nervioso', 'miedo', 'asustado', 'pánico', 'preocupado'];
    const happyKeywords = ['feliz', 'bien', 'bueno', 'excelente', 'maravilloso', 'alegre', 'riendo'];

    let hasEmoji = '';
    let responseArray = [];

    if (sadKeywords.some(word => lowerMessage.includes(word))) {
      hasEmoji = '😔';
      responseArray = [
        `${hasEmoji} Entiendo que te sientas así. Es normal tener días difíciles. ¿Quieres contarme qué te está preocupando?`,
        `${hasEmoji} La tristeza es una emoción válida. Todos pasamos por momentos así. Estoy aquí para escucharte.`,
        `${hasEmoji} Lamento que te sientas mal. A veces ayuda expresar lo que sentimos. Yo te escucho. 💙`
      ];
    } else if (anxiousKeywords.some(word => lowerMessage.includes(word))) {
      hasEmoji = '😰';
      responseArray = [
        `${hasEmoji} La ansiedad puede ser abrumadora. ¿Te gustaría que te guíe con una técnica de respiración?`,
        `${hasEmoji} Es comprensible sentir ansiedad. Respira profundo: inhala por 4 segundos, sostén 4, exhala 4. ¿Mejor?`,
        `${hasEmoji} La ansiedad es temporal. Puedo ayudarte con técnicas de relajación. ¿Quieres intentarlo?`
      ];
    } else if (happyKeywords.some(word => lowerMessage.includes(word))) {
      hasEmoji = '😊';
      responseArray = [
        `${hasEmoji} ¡Me alegra mucho que te sientas bien! Mantén ese sentimiento. Eres valioso/a.`,
        `${hasEmoji} ¡Qué maravilloso! La alegría es lo que nos mantiene adelante. Disfruta este momento. 🌟`,
        `${hasEmoji} ¡Increíble! Esos momentos felices son para atesorar. ¿Qué te hizo sentir así?`
      ];
    } else {
      // Respuesta neutral
      responseArray = [
        '💙 Gracias por compartir conmigo. ¿Hay algo más que quieras contarme o en qué puedo ayudarte?',
        '💙 Entiendo. ¿Cómo te sientes en este momento? Estoy aquí para escucharte.',
        '💙 Aprecio que confíes en mí. ¿Hay algo específico que te esté preocupando?',
        '💙 Sigo aquí para apoyarte. ¿Hay algo más que quieras explorar juntos?'
      ];
    }

    // Retornar respuesta aleatoria
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }

  /**
   * Guarda el historial en localStorage
   */
  saveConversationHistory() {
    try {
      localStorage.setItem(
        'iaConversationHistory',
        JSON.stringify(this.conversationHistory)
      );
      console.log('💾 Conversación guardada');
    } catch (error) {
      console.error('Error al guardar conversación:', error);
    }
  }

  /**
   * Carga el historial de conversaciones previas
   */
  loadConversationHistory() {
    try {
      const savedHistory = localStorage.getItem('iaConversationHistory');
      if (savedHistory) {
        this.conversationHistory = JSON.parse(savedHistory);
        console.log('📂 Historial cargado:', this.conversationHistory.length, 'mensajes');

        // Mostrar mensajes previos en el chat
        // (Opcional: activar para mostrar historial)
        // this.conversationHistory.forEach(msg => {
        //   this.addMessage(msg.text, msg.sender);
        // });
      }
    } catch (error) {
      console.error('Error al cargar historial:', error);
      this.conversationHistory = [];
    }
  }

  /**
   * Limpia el historial de conversación
   */
  clearHistory() {
    this.conversationHistory = [];
    localStorage.removeItem('iaConversationHistory');
    // Limpiar también el DOM
    const messages = this.messagesContainer.querySelectorAll('.ia-message');
    messages.forEach(msg => msg.remove());
    console.log('🗑️ Historial eliminado');
  }
}

// Inicializar el chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 Inicializando Chat IA...');
  const chat = new IAChat();

  // Hacer disponible globalmente para debugging
  window.iaChat = chat;
  console.log('✅ Chat IA listo. Usa window.iaChat para acceder.');
});