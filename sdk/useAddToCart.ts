import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { sendDitoEvent } from "deco-sites/timecenter/sdk/dito.tsx";

export interface Options {
  skuId: string;
  sellerId?: string;
  price: number;
  discount: number;
  quantity: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
  /**
   * Product URL
   */
  url?: string;
  /**
   * Product brand name
   */
  brand?: string;
  /**
   * Department name from breadcrumb
   */
  departmentName?: string;
  /**
   * Product categories (comma-separated or array)
   */
  categories?: string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function getMarketingData() {
  const source = getCookie("GTMUtmSource");
  const medium = getCookie("GTMUtmMedium");
  const campaign = getCookie("GTMUtmCampaign");
  if (!campaign && !medium && !source) return undefined;
  const marketingData = campaign
    ? {
      "utmSource": source === "(direct)" ? "direct" : source,
      "utmCampaign": campaign,
      "utmMedium": medium === "(none)" ? "none" : medium,
    }
    : {
      "utmSource": source === "(direct)" ? "direct" : source,
      "utmMedium": medium === "(none)" ? "none" : medium,
    };
  return marketingData;
}

export const useAddToCart = (
  { skuId, sellerId, price, discount, name, productGroupId, quantity, url, brand, departmentName, categories }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems, sendAttachment } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sellerId) {
      return;
    }

    try {
      isAddingToCart.value = true;
      await addItems({
        orderItems: [{ id: skuId, seller: sellerId, quantity }],
      });

      const marketingData = getMarketingData();

      if (marketingData) {
        await sendAttachment({
          attachment: "marketingData",
          body: marketingData,
        });
      }

      const data = {
        id_produto: productGroupId,
        nome_departamento: departmentName ?? "",
        categorias_produto: categories ?? "",
        nome_produto: name,
        preco_produto: price,
        seller_id: sellerId, 
        url_produto: url ?? "",
        marca: brand ?? "",
      };


      sendDitoEvent({
        action: "adicionou-produto-ao-carrinho",
        revenue: price,
        data,
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            item_id: productGroupId,
            quantity,
            price,
            discount,
            item_name: name,
            item_variant: skuId,
          }],
        },
      });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId, sellerId, quantity]);

  return { onClick, loading: isAddingToCart.value };
};
