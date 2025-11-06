// import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useEffect, useState } from "preact/hooks";
import { sendDitoEvent } from "$store/sdk/dito.tsx";

/** @title {{key}} */
export interface DataItem {
  /** @title Chave */
  key: string;
  /** @title Valor */
  value: string;
}

export interface Props {
  /** @title Ação do Evento */
  action: string;
  /** @title Dados do Evento */
  /** @description Array de pares chave-valor para os dados do evento */
  data?: Array<DataItem>;
// data?: unknown;
  /** @title Receita */
  revenue?: number;
  // Propriedades genéricas - aceita qualquer propriedade extra
  [key: string]: unknown;
}

const SendDitoEventOnLoad = ({
  action,
  data,
  revenue,
  ...rest
}: Props) => {
//   const { user } = useUser();
  const [isReady, setIsReady] = useState(false);

  console.log("data", data);

  useEffect(() => {
    // Aguarda o SDK do Dito estar disponível e o usuário estar carregado
    const checkReady = () => {
      if (globalThis.window?.dito) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (checkReady()) {
      return;
    }
    
    // Se ainda não estiver pronto, tenta novamente após um pequeno delay
    const timer = setTimeout(() => {
      checkReady();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

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

    // Envia o evento para o Dito
    sendDitoEvent({
      action,
      data: Object.keys(eventData).length > 0 ? eventData : undefined,
      revenue,
    });
  }, [isReady, action]);

  return null;
};

export default SendDitoEventOnLoad;