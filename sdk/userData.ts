import { Person } from "apps/commerce/types.ts";

export interface UserData {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  external_id?: string | null;
}

export interface EventData {
  event: string;
  // deno-lint-ignore no-explicit-any
  ecommerce: any;
  user_data: UserData;
}

export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

function normalize(
  data: Record<string, string | undefined | null>,
): Record<string, string> {
  const normalized: Record<string, string> = {};
  if (data.email) normalized.email = data.email.trim().toLowerCase();
  if (data.first_name || data.firstName) {
    normalized.firstName = (data.first_name || data.firstName || "").trim().toLowerCase();
  }
  if (data.last_name || data.lastName) {
    normalized.lastName = (data.last_name || data.lastName || "").trim().toLowerCase();
  }
  // Normaliza telefone para conter apenas números, DDI e DDD
  if (data.phone) normalized.phone = data.phone.replace(/\D/g, "");
  if (data.external_id || data.userId) {
    normalized.userId = data.external_id || data.userId || "";
  }
  return normalized;
}

export function setCookie(name: string, value: string, days = 7) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Use encodeURIComponent para garantir que caracteres especiais sejam salvos corretamente
  document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
}

// Função auxiliar para ler um cookie específico
function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      // Use decodeURIComponent para ler o valor corretamente
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

// Função para fazer hash e salvar em cookie
export async function setHashedCookie(name: string, value: string, days = 7) {
  // Se o valor for vazio, define o cookie como string vazia (nulo)
  if (!value) {
    setCookie(name, "", days);
    return;
  }
  
  // Normaliza o valor antes de fazer hash
  let normalizedValue = value.trim().toLowerCase();
  
  // Se for telefone, remove caracteres não numéricos
  if (name.includes("Ph")) {
    normalizedValue = normalizedValue.replace(/\D/g, "");
  }
  
  // Faz o hash do valor normalizado
  const hashedValue = await sha256(normalizedValue);
  
  // Salva o cookie com o valor hasheado
  setCookie(name, hashedValue, days);
}

export const generatedata = async (resUser: Person | null) => {
  let userDataFromSource: UserData | null = null;
  
  // 1. Tenta obter dados do resUser (fonte primária)
  if (resUser) {
    userDataFromSource = {
      email: resUser.email,
      first_name: resUser.givenName,
      last_name: resUser.familyName,
      phone: resUser.telephone,
      external_id: resUser["@id"],
    };
  } else {
    // 2. Se resUser for nulo, tenta obter dados dos cookies (fallback)
    userDataFromSource = {
      email: getCookie("MonksUserEm"),
      first_name: getCookie("MonksUserFn"),
      last_name: getCookie("MonksUserLn"),
      phone: getCookie("MonksUserPh"),
      external_id: getCookie("MonksUserEid"),
    };
  }
  
  // Se não houver dados em nenhuma das fontes, retorna nulo
  if (!userDataFromSource || !Object.values(userDataFromSource).some(v => v !== null)) {
    return {
      email: null,
      first_name: null,
      last_name: null,
      phone: null,
      external_id: null,
    };
  }
  
  // O resto do seu código de normalização e hash continua igual
  const normalizedData = normalize({ ...userDataFromSource });
  const hashedData: UserData = {
    email: normalizedData.email ? await sha256(normalizedData.email) : null,
    first_name: normalizedData.firstName ? await sha256(normalizedData.firstName) : null,
    last_name: normalizedData.lastName ? await sha256(normalizedData.lastName) : null,
    phone: normalizedData.phone ? await sha256(normalizedData.phone) : null,
    external_id: normalizedData.userId ? await sha256(normalizedData.userId) : null,
  };
  
  return hashedData;
};

