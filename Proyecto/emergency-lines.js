/**
 * LÍNEAS DE EMERGENCIA - emergency-lines.js
 * 
 * Base de datos de líneas de emergencia de salud mental
 * en 15+ países de América Latina, España y USA
 * 
 * Formato:
 * {
 *   country: 'Nombre País',
 *   type: 'Tipo de servicio',
 *   phone: 'Número de teléfono',
 *   web: 'Sitio web (opcional)',
 *   description: 'Breve descripción'
 * }
 */

const EMERGENCY_LINES = {
  colombia: [
    {
      country: 'Colombia 🇨🇴',
      type: 'Línea PAS (Prevención del Suicidio)',
      phone: '01 800 112 757',
      web: 'www.telefonicadelaesperanza.org',
      description: 'Línea de prevención del suicidio disponible 24/7'
    },
    {
      country: 'Colombia 🇨🇴',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    },
    {
      country: 'Colombia 🇨🇴',
      type: 'Teléfono de la Esperanza',
      phone: '2 593 0099',
      web: 'www.telefonicadelaesperanza.org',
      description: 'Acompañamiento emocional'
    },
    {
      country: 'Colombia 🇨🇴',
      type: 'Policía Nacional',
      phone: '112',
      description: 'Crisis de seguridad o peligro inmediato'
    }
  ],
  mexico: [
    {
      country: 'México 🇲🇽',
      type: 'LOCTEL (Centro de Atención a Crisis)',
      phone: '55 5259 8121',
      web: 'www.loctel.org',
      description: 'Atención a crisis emocionales 24/7'
    },
    {
      country: 'México 🇲🇽',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    },
    {
      country: 'México 🇲🇽',
      type: 'Prevensuicidas',
      phone: '55 5272 1366',
      description: 'Prevención de suicidio'
    },
    {
      country: 'México 🇲🇽',
      type: 'SAPTEL',
      phone: '55 5259 8121',
      description: 'Servicio de atención psicosocial por teléfono'
    }
  ],
  argentina: [
    {
      country: 'Argentina 🇦🇷',
      type: 'Centro de Asistencia al Suicida',
      phone: '011 4127 9000',
      web: 'www.cas-argentina.org.ar',
      description: 'Prevención y atención de suicidio'
    },
    {
      country: 'Argentina 🇦🇷',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    },
    {
      country: 'Argentina 🇦🇷',
      type: 'Teleanálisis',
      phone: '011 4821 2135',
      description: 'Apoyo psicológico telefónico'
    },
    {
      country: 'Argentina 🇦🇷',
      type: 'Provincia Buenos Aires',
      phone: '144',
      description: 'Línea de emergencia emocional'
    }
  ],
  peru: [
    {
      country: 'Perú 🇵🇪',
      type: 'Teléfono de la Esperanza',
      phone: '1 273 9999',
      web: 'www.telefonicadelaesperanza.org.pe',
      description: 'Apoyo emocional 24/7'
    },
    {
      country: 'Perú 🇵🇪',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    },
    {
      country: 'Perú 🇵🇪',
      type: 'SAMU',
      phone: '106',
      description: 'Ambulancia y emergencias médicas'
    }
  ],
  chile: [
    {
      country: 'Chile 🇨🇱',
      type: 'Fono de la Esperanza',
      phone: '1 800 00 20 00',
      web: 'www.fonodelaesperanza.cl',
      description: 'Prevención del suicidio 24/7'
    },
    {
      country: 'Chile 🇨🇱',
      type: 'Emergencia',
      phone: '131',
      description: 'Bomberos y emergencias'
    },
    {
      country: 'Chile 🇨🇱',
      type: 'Carabineros',
      phone: '133',
      description: 'Policía nacional de Chile'
    }
  ],
  brasil: [
    {
      country: 'Brasil 🇧🇷',
      type: 'CVV (Centro de Valorización da Vida)',
      phone: '188',
      web: 'www.cvv.org.br',
      description: 'Prevención del suicidio 24/7'
    },
    {
      country: 'Brasil 🇧🇷',
      type: 'Emergencia SAMU',
      phone: '192',
      description: 'Servicio de emergencias médicas'
    },
    {
      country: 'Brasil 🇧🇷',
      type: 'Policía Civil',
      phone: '147',
      description: 'Emergencias de seguridad'
    }
  ],
  spain: [
    {
      country: 'España 🇪🇸',
      type: 'Teléfono de Atención a la Conducta Suicida (024)',
      phone: '024',
      web: 'www.024.gob.es',
      description: 'Línea nacional de prevención del suicidio'
    },
    {
      country: 'España 🇪🇸',
      type: 'Emergencia',
      phone: '112',
      description: 'Emergencia europea'
    },
    {
      country: 'España 🇪🇸',
      type: 'Teléfono de la Esperanza',
      phone: '914 59 00 50',
      web: 'www.telefonicadelaesperanza.org',
      description: 'Apoyo emocional'
    }
  ],
  usa: [
    {
      country: 'USA 🇺🇸',
      type: 'National Suicide Prevention Lifeline',
      phone: '988',
      web: 'www.suicidepreventionlifeline.org',
      description: 'Prevención del suicidio 24/7'
    },
    {
      country: 'USA 🇺🇸',
      type: 'Crisis Text Line',
      phone: 'Text HOME a 741741',
      web: 'www.crisistextline.org',
      description: 'Apoyo por mensajes de texto'
    },
    {
      country: 'USA 🇺🇸',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    },
    {
      country: 'USA 🇺🇸',
      type: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Ayuda para adicciones y salud mental'
    }
  ],
  ecuador: [
    {
      country: 'Ecuador 🇪🇨',
      type: 'Teléfono de Crisis',
      phone: '1-800-LLAMAME',
      description: 'Apoyo emocional en crisis'
    },
    {
      country: 'Ecuador 🇪🇨',
      type: 'Emergencia',
      phone: '911',
      description: 'Emergencia nacional'
    }
  ],
  venezuela: [
    {
      country: 'Venezuela 🇻🇪',
      type: 'Línea de Prevención',
      phone: '0212-793-4500',
      description: 'Prevención de suicidio en Caracas'
    },
    {
      country: 'Venezuela 🇻🇪',
      type: 'Emergencia',
      phone: '171',
      description: 'Emergencia nacional'
    }
  ],
  france: [
    {
      country: 'Francia 🇫🇷',
      type: 'SOS Amitié',
      phone: '09 72 39 40 50',
      web: 'www.sosamilte.org',
      description: 'Apoyo emocional 24/7'
    },
    {
      country: 'Francia 🇫🇷',
      type: 'Emergencia',
      phone: '112',
      description: 'Emergencia europea'
    }
  ],
  germany: [
    {
      country: 'Alemania 🇩🇪',
      type: 'Telefonseelsorge',
      phone: '0800-1110111 o 0800-1110222',
      web: 'www.telefonseelsorge.de',
      description: 'Apoyo emocional 24/7'
    },
    {
      country: 'Alemania 🇩🇪',
      type: 'Emergencia',
      phone: '112',
      description: 'Emergencia europea'
    }
  ],
  italy: [
    {
      country: 'Italia 🇮🇹',
      type: 'Telefono Amico',
      phone: '06 4826 3567',
      web: 'www.telefonoamico.it',
      description: 'Apoyo emocional'
    },
    {
      country: 'Italia 🇮🇹',
      type: 'Emergencia',
      phone: '112',
      description: 'Emergencia europea'
    }
  ],
  mundial: [
    {
      country: 'Internacional 🌍',
      type: 'Befrienders International',
      phone: 'www.befrienders.org',
      web: 'www.befrienders.org',
      description: 'Red global de prevención del suicidio'
    },
    {
      country: 'Internacional 🌍',
      type: 'International Association for Suicide Prevention',
      phone: 'www.iasp.info/resources/Crisis_Centres',
      web: 'www.iasp.info',
      description: 'Directorio de líneas de emergencia por país'
    },
    {
      country: 'Internacional 🌍',
      type: 'Suicide Spot',
      phone: 'www.suicidespot.com',
      web: 'www.suicidespot.com',
      description: 'Recursos y apoyo global'
    },
    {
      country: 'Internacional 🌍',
      type: 'WHO Mental Health Resources',
      phone: 'www.who.int',
      web: 'www.who.int',
      description: 'Recursos de la Organización Mundial de la Salud'
    }
  ]
};

/**
 * Función para obtener líneas por país
 */
function getEmergencyLinesByCountry(country) {
  return EMERGENCY_LINES[country] || EMERGENCY_LINES.mundial;
}

/**
 * Función para obtener todas las líneas
 */
function getAllEmergencyLines() {
  return EMERGENCY_LINES;
}

/**
 * Función para obtener países disponibles
 */
function getAvailableCountries() {
  return Object.keys(EMERGENCY_LINES);
}

console.log('✅ Líneas de emergencia cargadas. Países disponibles:', getAvailableCountries().length);