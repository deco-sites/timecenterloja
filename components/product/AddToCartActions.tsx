import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/hooks";
import useIsMobile from "$store/components/hooks/useIsMobile.tsx";
import AddToCartButton from "$store/components/product/AddToCartButton.tsx";

type Props = {
  productID: string;
  seller: string;
  price?: number;
  listPrice?: number;
  productName: string;
  productGroupID: string;
  labelBuyButtonDesktop?: string;
  labelBuyButtonMobile?: string;
};

export default function AddToCartActions(
  { productID, seller, price, listPrice, productName, productGroupID }: Props,
) {
  const [quantity, setQuantity] = useState(1);
  const mobile = useIsMobile();
  const discount = price && listPrice ? listPrice - price : 0;

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
        classes="btn btn-md btn-primary uppercase transition-all  hover:text-neutral-100 font-bold text-info"
      />
    </div>
  );
}
