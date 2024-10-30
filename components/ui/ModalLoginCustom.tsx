import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { useState } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";

function ModalLoginCustom() {
  const { user } = useUser();
  const [sessionFirst, setSessionFirst] = useState(false);
  const storeScope = "timecenter";
  const { vtexIdScriptsLoaded } = useUI();

  return (
    <>
      <button
        class={`group peer cursor-pointer duration-150`}
        onClick={async () => {
          const currentPathname = window.location.pathname;

          if (user.value?.email) {
            if (currentPathname !== "/my-account") {
              window.location.pathname = "/my-account";
            } else {
              window.location.href =
                `/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`;
            }
          } else {
            const execute = () => {
              vtexIdScriptsLoaded.value = true;
              // deno-lint-ignore ban-ts-comment
              // @ts-expect-error
              window.vtexid.start({
                userEmail: "",
                locale: "pt-BR",
                forceReload: true,
              });
            };

            if (!vtexIdScriptsLoaded.value) {
              const { loadVtexIdScripts } = await import(
                "$store/sdk/loadVtexIdScripts.ts"
              );
              loadVtexIdScripts(execute);
            } else {
              execute();
            }
          }
        }}
      >
        <Icon
          class={`text-primary`}
          id="User"
          width={24}
          height={24}
        />

        {user.value?.givenName && (
          <div
            class={clx(
              `modal-login-custom hidden group-hover:block hover:block duration-150 bg-transparent top-[3px] -right-5 absolute w-auto z-[100] p-6 shadow-[0_0_50px_0_rgba(0_0_0_0.08)]`,
            )}
          >
            <div
              onMouseEnter={() => {
                sessionStorage.setItem("@euro-session", "true");
                setSessionFirst(true);
              }}
              class={clx(
                `modal-login-custom__body absolute bg-accent rounded-xl flex text-primary top-[90%] shadow-lg -right-[58px] whitespace-nowrap p-[24px] flex-col z-50 gap-[6px] items-start
                ${!sessionFirst ? "flex" : "hidden group-hover:flex"}`,
              )}
            >
              <span
                class={`font-bold text-white text-sm`}
              >
                Olá {user.value?.givenName} !
              </span>

              <a
                href="/my-account"
                class={clx(`text-white text-xs hover:font-bold duration-150`)}
              >
                Meu perfil
              </a>

              <a
                href="/my-account/orders"
                class={clx(`text-white text-xs hover:font-bold duration-150`)}
              >
                Meus pedidos
              </a>

              <div
                class={clx(`h-[1px]  w-[160px] my-[5px] duration-150`)}
              />

              <a
                class={clx(`text-white text-xs hover:font-bold duration-150`)}
                href={`/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`}
              >
                Sair
              </a>
            </div>
          </div>
        )}
      </button>
    </>
  );
}

export default ModalLoginCustom;
