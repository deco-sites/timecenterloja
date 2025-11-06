import { scriptAsDataURI } from "$store/utils/dataURI.ts";

/** @title {{key}} */
interface DataItem {
  /** @title Chave */
  key: string;
  /** @title Valor */
  value: string;
}

interface Props {
  /** @title Ação do Evento */
  action: string;
  /** @title Dados do Evento */
  /** @description Array de pares chave-valor para os dados do evento */
  data?: Array<DataItem>;
  /** @title Receita */
  revenue?: number;
  // Propriedades genéricas - aceita qualquer propriedade extra
  [key: string]: unknown;
}

export default function DitoTrack({ action, data, revenue, ...rest }: Props) {
  // Converte array de objetos { key, value } para Record<string, any>
  // deno-lint-ignore no-explicit-any
  const dataObject: Record<string, any> = {};
  
  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      if (item && item.key) {
        dataObject[item.key] = item.value;
      }
    });
  }

  // Combina propriedades diretas (rest) com o objeto data
  // deno-lint-ignore no-explicit-any
  const eventData: Record<string, any> = { ...dataObject };

  // Adiciona propriedades passadas diretamente como props (ex: nome_departamento, nome_categoria)
  Object.keys(rest).forEach((key) => {
    if (key !== "action" && key !== "data" && key !== "revenue") {
      eventData[key] = rest[key];
    }
  });

  // Garante que eventData seja sempre um objeto (não undefined)
  const finalEventData = Object.keys(eventData).length > 0 ? eventData : {};

  // Extrai revenue de dentro do data se existir, mas prioriza a prop direta
  let finalRevenue: number | null = revenue ?? null;
  if (
    finalRevenue == null && eventData && typeof eventData.revenue === "number"
  ) {
    finalRevenue = eventData.revenue;
  }

  return (
    <script
      defer
      src={scriptAsDataURI(
        (
          eventName: string,
          eventData: Record<string, unknown>,
          eventRevenue: number | null,
        ) => {
          try {
            if (!globalThis.window) return;

            // Monta o payload do track
            const trackPayload: {
              action: string;
              revenue?: number;
              data?: Record<string, unknown>;
            } = {
              action: String(eventName).toLowerCase(),
            };

            // Só adiciona revenue se existir e for um número válido
            if (eventRevenue != null && typeof eventRevenue === "number") {
              trackPayload.revenue = eventRevenue;
            }

            // Só adiciona data se houver propriedades
            if (eventData && Object.keys(eventData).length > 0) {
              trackPayload.data = eventData;
            }
            console.log("trackPayload", trackPayload);
            globalThis.window.dito &&
              globalThis.window.dito.track(trackPayload);
          } catch (err) {
            console && console.warn && console.warn("DitoTrack error", err);
          }
        },
        action,
        finalEventData,
        finalRevenue ?? null,
      )}
    />
  );
}