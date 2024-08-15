import { formatPrice } from "deco-sites/timecenter/sdk/format.ts";

export interface Props {
  priceWithPixDiscount: number;
  priceCurrency?: string;
  sellerPrice: number;
  listPrice: number;
  hasDiscount: boolean;
  pixPercentDiscountByDiferenceSellerPrice: number;
  installmentBillingDuration?: number;
  installmentBillingIncrement?: number;
}

export default function ProductInfoPriceModel(props: Props) {
  return (
    <div class="py-7">
      {props.hasDiscount && (
        <p class="w-full text-left text-[#4a4a4a] text-[13px] font-normal line-through">
          De {formatPrice(props.listPrice, props.priceCurrency)}
        </p>
      )}

      <p class="w-full block text-left text-[#4A4A4A]  leading-none">
        <span class="text-2xl font-bold">
          {formatPrice(
            props.priceWithPixDiscount,
            props.priceCurrency || "BRL",
          )}
        </span>
        <span class="text-[13px]">{" "}com{" "}</span>
        <span class="text-[13px] font-bold">
          {props.pixPercentDiscountByDiferenceSellerPrice}% de desconto
        </span>
        <span class="text-[13px]">{" "}no PIX</span>
      </p>

      {props.installmentBillingDuration && props.installmentBillingIncrement &&
        (
          <div class="w-[310px] mt-3 py-1 flex items-center justify-center bg-[#EEEEEE]">
            <p class="text-[13px]">
              <span class="font-bold">
                {formatPrice(props.sellerPrice, props.priceCurrency || "BRL")}
              </span>
              <span class="font-normal">{" "}em até{" "}</span>
              <span class="font-bold">{props.installmentBillingDuration}x</span>
              <span class="font-normal">{" "}de{" "}</span>
              <span class="font-bold">
                {formatPrice(
                  props.installmentBillingIncrement,
                  props.priceCurrency || "BRL",
                )}
              </span>
            </p>
          </div>
        )}
    </div>
  );
}
