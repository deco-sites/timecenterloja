import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBar from "$store/islands/HeaderSearchbar.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";

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
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
  /**
   * @title Minicart settings
   */
  minicart: ICartProps;
  /**
   * @title Search bar settings
   */
  searchbar: SearchbarProps;
}

function HeaderLayout(
  {
    navItems = megaMenuDefaultItems as INavItem[],
    minicart,
    searchbar,
    logo,
    device,
  }: SectionProps<ReturnType<typeof loader>>,
) {
  return (
    <header class="z-50 lg:p-0 py-2">
      <div class="flex justify-between items-center lg:p-0">
        <div class="flex items-center gap-5">
          {device === "mobile" ? <Buttons variant="menu" /> : null}
          <a href="/" class="" aria-label="Store logo">
            {/* <Icon id="Logo" width={120} height={27} /> */}
            {/* <Logo /> */}
            {(logo?.image) && (
              <Image
                src={logo?.image}
                width={logo?.width ?? 91}
                height={logo?.height ?? 17}
              />
            )}
          </a>
        </div>
        <div class="max-lg:hidden flex justify-between">
          {navItems && navItems?.length
            ? navItems?.map((item) => <NavItem key={item.label} item={item} />)
            : null}
        </div>
        <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
          <div class="flex items-center xl:gap-4 lg:gap-2">
            <Buttons variant="search" />
            <SearchBar searchbar={{ ...searchbar, variant: "mobile" }} />
            <Buttons variant="user" />
            <Buttons variant="cart" />
          </div>
        </div>
      </div>

      <Modals
        minicart={minicart}
        menu={{ items: navItems }}
        device={device}
      />
    </header>
  );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default HeaderLayout;
