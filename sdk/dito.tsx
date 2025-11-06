/**
 * Função para enviar eventos ao Dito de forma programática
 * Similar ao sendEvent, mas específico para Dito
 */

interface DitoEventOptions {
    action: string;
    revenue?: number;
    // deno-lint-ignore no-explicit-any
    data?: Record<string, any>;
    // Propriedades genéricas - aceita qualquer propriedade extra
    [key: string]: unknown;
  }
  
  /**
   * Envia um evento para o Dito
   * @param options - Objeto contendo action, revenue (opcional), data (opcional) e outras propriedades extras
   * 
   * @example
   * ```tsx
   * sendDitoEvent({
   *   action: "view_item",
   *   revenue: 99.90,
   *   data: { product_id: "123" }
   * });
   * 
   * // Ou com propriedades extras diretamente
   * sendDitoEvent({
   *   action: "add_to_cart",
   *   revenue: 49.90,
   *   nome_categoria: "Eletrônicos",
   *   nome_departamento: "Smartphones"
   * });
   * ```
   */
  export const sendDitoEvent = (options: DitoEventOptions) => {
    try {
      if (!globalThis.window?.dito) {
        console.warn("Dito SDK não está inicializado");
        return;
      }
  
      // Combina propriedades diretas com o objeto data
      // deno-lint-ignore no-explicit-any
      const eventData: Record<string, any> = { ...options.data };
  
      // Adiciona propriedades passadas diretamente como props (ex: nome_departamento, nome_categoria)
      Object.keys(options).forEach((key) => {
        if (key !== "action" && key !== "data" && key !== "revenue") {
          eventData[key] = options[key];
        }
      });
  
      // Garante que eventData seja sempre um objeto (não undefined)
      const finalEventData = Object.keys(eventData).length > 0 ? eventData : {};
  
      // Extrai revenue de dentro do data se existir, mas prioriza a prop direta
      let finalRevenue: number | null = options.revenue ?? null;
      if (
        finalRevenue == null && eventData && typeof eventData.revenue === "number"
      ) {
        finalRevenue = eventData.revenue;
      }
  
      // Monta o payload do track
      const trackPayload: {
        action: string;
        revenue?: number;
        data?: Record<string, unknown>;
      } = {
        action: String(options.action).toLowerCase(),
      };
  
      // Só adiciona revenue se existir e for um número válido
      if (finalRevenue != null && typeof finalRevenue === "number") {
        trackPayload.revenue = finalRevenue;
      }
  
      // Só adiciona data se houver propriedades
      if (finalEventData && Object.keys(finalEventData).length > 0) {
        trackPayload.data = finalEventData;
      }
      console.log("trackPayload", trackPayload);
      const resp = globalThis.window.dito.track(trackPayload);
      console.log("resp", resp);
      return resp;
    } catch (err) {
      console && console.warn && console.warn("sendDitoEvent error", err);
    }
  };