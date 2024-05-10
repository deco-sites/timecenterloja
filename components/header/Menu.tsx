import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { INavItem } from "./NavItem.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const component = item?.children?.length
    ? (
      <div class="collapse collapse-plus relative items-start">
        <input
          type="checkbox"
          class="absolute peer left-0 w-full h-full top-0"
        />
        <div class="collapse-title peer-checked:border-b border-base-content border-solid min-h-0 p-0 py-2.5 font-dm-sans font-bold uppercase text-sm px-0 flex items-center justify-between">
          {item.label}
        </div>
        <div class="collapse-content px-0 block z-10 pointer-events-auto">
          {item.children?.map((node, idx) => (
            <ul
              class={`pt-0 px-0 pl-5 
            `}
            >
              {node?.showLabel
                ? (
                  <li class="">
                    <a
                      href={node.href}
                      title={node.label}
                      class={`w-full block pt-5 font-dm-sans font-bold text-[#585858] text-sm ${
                        item.highlighted ? "text-secondary" : ""
                      }`}
                    >
                      {node.label}
                    </a>
                  </li>
                )
                : null}
              {node?.children?.map((subItem) => (
                <li class="">
                  <a
                    href={subItem.href}
                    title={subItem.label}
                    class={`w-full block pt-5 font-dm-sans font-normal text-[#585858] text-sm ${
                      item.highlighted ? "text-secondary" : ""
                    }`}
                  >
                    {subItem.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    )
    : (
      <a
        href={item.href}
        title={item.label}
        class={`w-full block py-2.5 font-dm-sans font-bold uppercase text-sm ${
          item.highlighted ? "text-primary" : ""
        }`}
      >
        {item.label}
      </a>
    );

  return component;
}

const actionButtons = [
  {
    href: "/my-account",
    label: "Meus dados",
  },
  {
    href: "/my-account/orders",
    label: "Meus pedidos",
  },
  {
    href:
      "/api/vtexid/pub/logout?scope=eeuro&returnUrl=https%3A%2F%2Fwww.eurorelogios.com.br%2F",
    label: "Sair",
  },
];

function Menu({ items }: Props) {
  const { displayMenu } = useUI();
  const { user } = useUser();

  return (
    <div class="flex flex-col justify-center px-4">
      <div class="w-full flex items-center justify-between py-4 border-b border-slate-100 border-solid pb-2">
        <a
          class="flex items-center justify-start gap-1 uppercase text-secondary font-bold text-xs"
          href={`${user.value ? "/my-account" : "/my-account/login"}`}
        >
          <span class="p-1">
            <Icon
              id="User"
              width={24}
              height={24}
              strokeWidth={1}
              class="text-base-content"
            />
          </span>
          {user.value ? `Bem-vindo, ${user.value.givenName}` : "Entrar"}
        </a>
        <button
          class="btn-square btn-ghost relative flex justify-center items-center rounded-full"
          onClick={() => {
            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" width={24} height={24} strokeWidth={2} />
        </button>
      </div>
      {user.value && (
        <div class="flex flex-col lg:flex-row items-center justify-center w-full gap-2 mt-4 pb-4">
          {actionButtons.map((action) => (
            <a
              href={action.href}
              class="btn btn-secondary btn-rounded uppercase w-full h-8 min-h-8 font-bold min-w-[140px]"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
      <ul class="block max-h-full overflow-y-auto z-10 pointer-events-auto min-h-max">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>
    </div>
  );
}

export default Menu;
