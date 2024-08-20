import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { useOffer } from "$store/utils/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import DiscountBadge, { DiscountBadgeProps } from "./DiscountBadge.tsx";
import ProductHighlights from "$store/components/product/ProductHighlights.tsx";
import { HighLight } from "$store/components/product/ProductHighlights.tsx";
import ProductCardPriceModel from "deco-sites/timecenter/components/product/ProductCardPriceModel.tsx";
import ProductCardName from "deco-sites/timecenter/components/product/ProductCardName.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
    mobileCtaText?: string;
    ctaVariation?: ButtonVariant;
    ctaMode?: "Go to Product Page" | "Add to Cart";
  };
  discount?: DiscountBadgeProps;
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  /**
   * @description Flags, displayed when  products are found
   */
  highlights?: HighLight[];
  /** @description used for analytics event */
  itemListName?: string;
  /** @description index of the product card in the list */
  index?: number;
  layout?: Layout;
}

export const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 279;
const HEIGHT = 270;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  highlights,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;

  const productGroupID = isVariantOf?.productGroupID;
  const id = `product-card-${productID}`;

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const front = images && images[0];
  const back = images &&
    images.find((obj) => {
      return obj.name === "over";
    });

  const {
    listPrice,
    price,
    installment,
    seller = "1",
    has_discount,
    availability,
    pixPercentDiscountByDiferenceSellerPrice,
    priceWithPixDiscount,
  } = useOffer(offers);

  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const referenceID = product.additionalProperty?.find(
    ({ valueReference }) => valueReference == "ReferenceID",
  )?.value ?? product.gtin;

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants
    .map(([value, link]) => [value, relative(link ?? "")] as const)
    .map(([value, link]) => (
      <li>
        <a href={link}>
          <Avatar
            content={value}
            variant={link === url ? "active" : link ? "default" : "disabled"}
          />
        </a>
      </li>
    ));

  const addToCartButtonClassNames = (variant: string | undefined) =>
    `px-6 lg:text-sm font-medium text-xs whitespace-nowrap mr-auto btn h-8 min-h-6 max-md:min-h-[2.25rem] max-md:h-[2.25rem] uppercase btn-${
      BUTTON_VARIANTS[variant ?? "primary"]
    }`;

  const cta = layout?.basics?.ctaMode === "Go to Product Page"
    ? (
      <a
        href={url && relative(url)}
        aria-label="view product"
        class={`min-w-[162px] ${
          addToCartButtonClassNames(
            layout?.basics?.ctaVariation,
          )
        }`}
      >
        <span class="max-lg:hidden flex font-medium ">
          {l?.basics?.ctaText || "Ver produto"}
        </span>

        <span class="lg:hidden flex font-medium">
          {l?.basics?.mobileCtaText || "Add ao carrinho"}
        </span>
      </a>
    )
    : l?.basics?.mobileCtaText
    ? (
      <>
        <AddToCartButton
          url={url as string}
          availability={availability}
          quantity={1}
          name={product.name as string}
          discount={listPrice - price || 0}
          productGroupId={product.isVariantOf?.productGroupID ?? ""}
          price={price}
          sellerId={seller as string}
          skuId={product.sku}
          label={l?.basics?.mobileCtaText}
          classes={`mb-5 uppercase font-bold min-w-[200px] lg:min-w-0 ${
            addToCartButtonClassNames(
              layout?.basics?.ctaVariation,
            )
          }`}
        />
      </>
    )
    : (
      <AddToCartButton
        quantity={1}
        name={product.name as string}
        availability={availability}
        discount={listPrice - price || 0}
        productGroupId={product.isVariantOf?.productGroupID ?? ""}
        price={price}
        sellerId={seller as string}
        skuId={product.sku}
        label={l?.basics?.ctaText}
        classes={`flex justify-center ${
          addToCartButtonClassNames(
            layout?.basics?.ctaVariation,
          )
        }`}
      />
    );

  return (
    <div
      class={`card card-compact opacity-100 bg-opacity-100 group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}`}
      data-deco="view-product"
      id={`product-card-${productID}`}
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative rounded-none"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents relative"
        >
          <div
            class={`absolute w-full left-0 top-0 p-[10px] flex items-center z-10`}
          >
            <div class={`grid grid-cols-2 gap-y-1 w-full`}>
              {has_discount && (
                <DiscountBadge
                  price={price}
                  listPrice={listPrice}
                  label={l?.discount?.label}
                  variant={l?.discount?.variant}
                />
              )}

              {product && (
                <ProductHighlights
                  product={product}
                  highlights={highlights}
                  listPrice={listPrice}
                />
              )}
            </div>
          </div>

          <Image
            src={front ? front.url! : ""}
            alt={front ? front.alternateName : ""}
            width={WIDTH}
            height={HEIGHT}
            class={`
              absolute rounded-none w-full
              ${
              !l?.onMouseOver?.image ||
                l?.onMouseOver?.image == "Change image"
                ? "duration-100 transition-opacity opacity-100 lg:group-hover:opacity-0"
                : ""
            }
              ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-105"
                : ""
            }
            `}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? (front ? front.url! : "")}
              alt={back?.alternateName ?? (front ? front.alternateName : "")}
              width={WIDTH}
              height={HEIGHT}
              class="absolute transition-opacity rounded-none w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {!l?.hide.skuSelector && (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {l?.hide.productName && l?.hide.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 mt-[15px]">
              {l?.hide.productName ? "" : (
                <ProductCardName
                  complete_name={isVariantOf?.name || name || ""}
                  reference_id={referenceID}
                />
              )}
              {l?.hide.productDescription
                ? ""
                : (
                  <p class="truncate text-sm lg:text-sm text-neutral">
                    {product.description}
                  </p>
                )}
            </div>
          )}

        {!l?.hide.allPrices && (
          <ProductCardPriceModel
            installmentBillingDuration={installment?.billingDuration}
            installmentBillingIncrement={installment?.billingIncrement}
            priceCurrency={offers?.priceCurrency}
            priceWithPixDiscount={priceWithPixDiscount}
            sellerPrice={price}
            hasDiscount={has_discount}
            listPrice={listPrice}
            pixPercentDiscountByDiferenceSellerPrice={pixPercentDiscountByDiferenceSellerPrice}
          />
        )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {!l?.hide.skuSelector && (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {cta}
      </div>
    </div>
  );
}

export default ProductCard;
