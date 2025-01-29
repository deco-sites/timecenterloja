import { Product } from 'apps/commerce/types.ts';
import { useOffer } from 'deco-sites/timecenter/utils/useOffer.ts';

export function fix_data_struct_by_pix_payment(
  product: Product | null | undefined,
) {
  if (!product) return product;

  const { listPrice, priceWithPixDiscount } = useOffer(product.offers);

  if (product.offers?.highPrice) {
    product.offers.highPrice = listPrice;
  }

  if (product.offers?.lowPrice) {
    product.offers.lowPrice = priceWithPixDiscount;
  }

  if (product.offers?.offers) {
    if (
      product.offers.offers[0].priceSpecification[0].priceType ===
      'https://schema.org/ListPrice'
    ) {
      product.offers.offers[0].priceSpecification[0].price = listPrice;
    }

    if (
      product.offers.offers[0].priceSpecification[1].priceType ===
      'https://schema.org/SalePrice'
    ) {
      product.offers.offers[0].priceSpecification[1].price =
        priceWithPixDiscount;
    }
  }

  return product;
}
