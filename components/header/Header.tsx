import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SearchButton } from "../../islands/Header/Buttons.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";

export interface Props {
  /**
   * @title Logo
   * @description logo desktop e mobile
   */
  logo?: {
    image?: ImageWidget;
    width?: number;
    height?: number;
  };
}

function Header({}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  return (
    <>
      <header class="z-50 lg:p-0 py-2">
        <SearchButton />

        dd
        {platform === "vtex" && <CartButtonVTEX />}
        {platform === "vnda" && <CartButtonVDNA />}
        {platform === "wake" && <CartButtonWake />}
        {platform === "linx" && <CartButtonLinx />}
        {platform === "shopify" && <CartButtonShopify />}
        {platform === "nuvemshop" && <CartButtonNuvemshop />}
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
