import axios from 'axios';

const baseUrl = process.env.SHEETSURL;

const fetchData = async (url, method, data = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    const result = await axios({
      method,
      url,
      headers,
      data,
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postAppointment = async ({
  name,
  phoneNumber,
  documentType,
  documentNumber,
  township,
  email,
  eps,
  appointmentType,
  specializationType,
  coosaludDiagnostic,
}) => {
  const dataSend = {
    name,
    phone: phoneNumber,
    document_type: documentType,
    document_number: documentNumber,
    email: email || 'N/A',
    township,
    eps,
    requirement_type: appointmentType,
    specialization_type: specializationType || 'N/A',
    coosalud_diagnostic: coosaludDiagnostic || 'N/A',
    platform: 'WhatsApp',
  };

  try {
    const { data } = await fetchData(`${baseUrl}/appointments`, 'post', dataSend);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getAppointment = async (documentNumber) => {
  try {
    const { data } = await fetchData(`${baseUrl}/appointments/${documentNumber}`, 'get');

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { postAppointment, getAppointment };
