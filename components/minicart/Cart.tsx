// import { platform } from "../../apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "../../sdk/usePlatform.tsx";

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));
const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));
const CartWake = lazy(() => import("./wake/Cart.tsx"));
const CartLinx = lazy(() => import("./linx/Cart.tsx"));
const CartShopify = lazy(() => import("./shopify/Cart.tsx"));
const CartNuvemshop = lazy(() => import("./nuvemshop/Cart.tsx"));

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline";

export const BUTTON_VARIANTS: Record<string, string> = {
  primary: "primary hover:text-base-100",
  secondary: "secondary hover:text-base-100",
  accent: "accent text-base-content hover:text-base-100",
  outline: "outline border border-base-content hover:bg-base-content",
};

export interface Props {
  platform: ReturnType<typeof usePlatform>;
}

function Cart({ platform }: Props) {
  if (platform === "vtex") {
    return <CartVTEX />;
  }

  if (platform === "vnda") {
    return <CartVNDA />;
  }

  if (platform === "wake") {
    return <CartWake />;
  }

  if (platform === "linx") {
    return <CartLinx />;
  }

  if (platform === "shopify") {
    return <CartShopify />;
  }

  if (platform === "nuvemshop") {
    return <CartNuvemshop />;
  }

  return null;
}

export default Cart;
