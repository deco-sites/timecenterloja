import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/hooks";
import useIsMobile from "$store/components/hooks/useIsMobile.tsx";
import AddToCartButton from "$store/components/product/AddToCartButton.tsx";

type Props = {
  productID: string;
  availability?: boolean;
  seller: string;
  price?: number;
  listPrice?: number;
  productName: string;
  productGroupID: string;
  labelBuyButtonDesktop?: string;
  labelBuyButtonMobile?: string;
  /**
   * Product URL for analytics
   */
  productUrl?: string;
  /**
   * Product brand name
   */
  brand?: string;
  /**
   * Department name from breadcrumb
   */
  departmentName?: string;
  /**
   * Product categories
   */
  categories?: string;
};

export default function AddToCartActions(
  {
    productID,
    seller,
    price,
    listPrice,
    productName,
    productGroupID,
    availability,
    productUrl,
    brand,
    departmentName,
    categories,
  }: Props,
) {
  const [quantity, setQuantity] = useState(1);
  const mobile = useIsMobile();
  // const discount = price && listPrice ? listPrice - price : 0;

  return (
    <div class="flex w-full gap-[30px] ">
      <QuantitySelector
        quantity={quantity}
        onChange={(_quantity) => {
          setQuantity(_quantity);
        }}
      />
      {
        /* <>
        <AddToCartButtonVTEX
          url={""}
          name={productName}
          productID={productID}
          productGroupID={productGroupID}
          price={price ?? 0}
          discount={discount}
          seller={seller}
        />
      </> */
      }
      <AddToCartButton
        skuId={productID}
        sellerId={seller}
        price={price ?? 0}
        discount={price && listPrice ? listPrice - price : 0}
        name={productName}
        productGroupId={productGroupID}
        quantity={quantity}
        label={mobile ? "comprar" : "Comprar agora"}
        showIcon
        availability={availability || false}
        classes="btn btn-md btn-primary uppercase transition-all  hover:text-neutral-100 font-bold text-info"
        productUrl={productUrl}
        brand={brand}
        departmentName={departmentName}
        categories={categories}
      />
    </div>
  );
}
