import { lazy, Suspense } from "preact/compat";
import Loading from "$store/components/ui/Loading.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import { ICartProps } from "$store/components/minicart/Cart.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

interface Props {
  menu: MenuProps;
  minicart?: ICartProps;
  device: string;
}

function Modals({ menu, minicart, device }: Props) {
  const { displayCart, displayMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );
  return (
    <>
      {device === "mobile"
        ? (
          <Modal
            title="Entrar"
            menuIcon="User"
            mode="sidebar-left"
            loading="lazy"
            id="menu-modal"
            showHeader={false}
            open={displayMenu.value}
            onClose={() => {}}
            class="backdrop:bg-base-content backdrop:opacity-70"
          >
            <Suspense fallback={fallback}>
              <Menu {...menu} />
            </Suspense>
          </Modal>
        )
        : (
          null
        )}
      <Modal
        class="ml-auto"
        title="Meu carrinho"
        mode="sidebar-right"
        showHeader
        id="minicart-modal"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
          console.log("ddd");
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart {...minicart as ICartProps} />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
