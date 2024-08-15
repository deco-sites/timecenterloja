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

export default function ProductCardPriceModel(props: Props) {
  return (
    <div class="w-full min-h-[75px] flex flex-col py-2">
      {props.hasDiscount && (
        <p class="w-full text-left text-[#4a4a4a] text-[10px] lg:text-xs font-normal line-through">
          {formatPrice(props.listPrice, props.priceCurrency)}
        </p>
      )}

      <p class="w-full block text-left text-black leading-none">
        <span class="text-base font-bold">
          {formatPrice(
            props.priceWithPixDiscount,
            props.priceCurrency || "BRL",
          )}
        </span>
        <span class="text-[10px] lg:text-xs font-normal">{" "}no PIX</span>
      </p>

      {props.installmentBillingDuration && props.installmentBillingIncrement &&
        (
          <p class="text-left text-[10px] lg:text-xs text-[#4A4A4A] font-normal">
            <span class="">
              {formatPrice(props.sellerPrice, props.priceCurrency || "BRL")}
            </span>
            <span class="">{" "}em até{" "}</span>
            <br />
            <span class="">{props.installmentBillingDuration}x</span>
            <span class="">{" "}de{" "}</span>
            <span class="">
              {formatPrice(
                props.installmentBillingIncrement,
                props.priceCurrency || "BRL",
              )}
            </span>
          </p>
        )}
    </div>
  );
}
