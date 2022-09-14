import axios from 'axios';
import config from '../../config/config.mjs';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.meta.accessToken}`,
};

/**
 *
 * @param {string} fromPhone the number of the person
 * @param {string} phoneNumberId the id of the bussiness account
 */
const sendInialQuestion = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'initial_question',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendPatientName = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'patient_name',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendPatientPhoneNumber = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'patient_phone_number',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendDocumentType = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'document_type',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendDocumentNumber = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'document_number',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendEmail = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'email',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendTownship = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'township',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendEpsOptions = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'eps_options',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendOtherEps = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'other_eps',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendAppointmentType = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'appointment_type',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendSpecializationType = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'specialization_type',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendCoosaludDiagnostic = (fromPhone, phoneNumberId) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: fromPhone,
        type: 'template',
        template: {
          name: 'coosalud_diagnostic',
          language: {
            code: 'es',
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendCheckNewAppoinment = (fromPhone, phoneNumberId, data) => {
  try {
    axios.post(
      `${config.meta.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: fromPhone,
        type: 'text',
        text: {
          // the text object
          preview_url: false,
          body: `
*Por Favor Confirmar la siguiente informacion para solicitud de cita*:
_Nombre_: ${data.patientName}
_Teléfono_: ${data.patienPhoneNumber}
_Documento_: ${data.typeOfDocument} ${data.documentNumber}
_Municipio_: ${data.townShip}
_Eps_: ${data.eps}
_Tipo de Cita_: ${data.appoinmentType}
${data.SpecializationType ? `_Especializacion_: ${data.SpecializationType}` : ''}
          `,
        },
      },
      { headers: HEADERS }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  sendInialQuestion,
  sendPatientName,
  sendPatientPhoneNumber,
  sendDocumentType,
  sendDocumentNumber,
  sendEmail,
  sendTownship,
  sendEpsOptions,
  sendOtherEps,
  sendAppointmentType,
  sendSpecializationType,
  sendCoosaludDiagnostic,
  sendCheckNewAppoinment,
};
