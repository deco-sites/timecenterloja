import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-square btn-ghost flex items-center justify-center"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon
        class="text-primary"
        id="MagnifyingGlass"
        width={20}
        height={20}
        strokeWidth={0.1}
      />
    </Button>
  );
}

function UserButton() {
  const { user } = useUser();
  return (
    <div class="max-lg:hidden rounded-full border-2 border-solid no-animation relative btn-square btn-ghost flex items-center justify-center group">
      <Icon
        class="text-primary"
        id="User"
        width={24}
        height={24}
      />
      <div class="absolute hidden hover:flex group-hover:flex bg-accent top-[50px] shadow whitespace-nowrap p-[24px] flex-col z-10 rounded-xl gap-[6px]">
        {user.value
          ? (
            <>
              <a class="font-bold text-white text-xs" href="/my-account">
                Meus Dados
              </a>
              <a
                class="font-bold text-white text-xs"
                href="/my-account/orders"
              >
                Meus Pedidos
              </a>
              <a
                class="font-bold text-white text-xs"
                href="/api/vtexid/pub/logout?scope=eeuro&returnUrl=https%3A%2F%2Fwww.eurorelogios.com.br%2F"
              >
                Sair
              </a>
            </>
          )
          : (
            <a
              class="font-bold text-white text-xs"
              href="/my-account/login"
            >
              Entrar
            </a>
          )}
        <div class="left-[70px] absolute -top-3 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-accent border-r border-b border-accent">
        </div>
      </div>
    </div>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="rounded-full border-2 border-solid no-animation btn-ghost relative flex justify-center items-center lg:hidden"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon class="text-base-content" id="Menu" width={25} height={25} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn-square btn-ghost relative flex justify-center items-center"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item text-base-100 bg-accent w-4 h-4 rounded-full text-xs left-4 top-3 font-bold">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon
          class="text-primary"
          id="ShoppingCart"
          width={24}
          height={24}
          strokeWidth={1}
        />
      </div>
    </Button>
  );
}

function Buttons(
  { variant }: { variant: "cart" | "search" | "menu" | "user" },
) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  if (variant === "user") {
    return <UserButton />;
  }

  return null;
}

export default Buttons;
