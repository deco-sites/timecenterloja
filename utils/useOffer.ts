import type {
  AggregateOffer,
  UnitPriceSpecification,
} from 'apps/commerce/types.ts';
import { formatPrice } from '$store/sdk/format.ts';

const bestInstallment = (
  accumulator: UnitPriceSpecification | null,
  current: UnitPriceSpecification,
) => {
  if (current.priceComponentType !== 'https://schema.org/Installment') {
    return accumulator;
  }

  if (!accumulator) {
    return current;
  }

  if ((current.billingDuration || 0) > (accumulator.billingDuration || 0)) {
    return current;
  }

  return accumulator;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return '';
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de ${formatPrice(billingIncrement, 'BRL')} ${
    withTaxes ? 'com juros' : 'sem juros'
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];

  const sellerPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === 'https://schema.org/SalePrice',
  );

  const listPrice = offer?.priceSpecification.find(
    ({ priceType }) => priceType === 'https://schema.org/ListPrice',
  );

  const priceWithPixPayment = offer?.priceSpecification.find(
    ({ name }) => name?.toLowerCase() === 'pix',
  );

  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = sellerPrice?.price || 0;
  const availability = (offer?.inventoryLevel.value || 0) > 0;

  const priceWithPixDiscount =
    (priceWithPixPayment?.price || price) < price
      ? priceWithPixPayment?.price
      : price * 0.95;

  return {
    price,
    priceWithPixDiscount,
    listPrice: listPrice?.price || price,
    has_discount: (listPrice?.price || price) > price,
    availability,
    seller,
    installment_text: installment
      ? installmentToString(installment, price)
      : null,
    installment: installment || null,
  };
};
