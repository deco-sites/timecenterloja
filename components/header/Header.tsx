import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SearchButton } from "../../islands/Header/Buttons.tsx";
import { useUI } from "../../sdk/useUI.ts";

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
  const { displaySearchPopup } = useUI();

  console.log(displaySearchPopup);
  

  return (
    <>
      <header class="z-50 lg:p-0 py-2">
        <SearchButton />
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
