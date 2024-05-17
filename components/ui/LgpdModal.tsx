import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import { SectionProps } from "deco/types.ts";
import { useEffect, useRef } from "preact/compat";
import { getCookies } from "std/http/mod.ts";

export interface ModalButtonProps {
  /**
   * @title Variant
   * @default primary
   */
  variant?: ButtonVariant;
  /**
   * @title Label?
   * @default cadastrar
   */
  label?: string;
}

export interface Props {
  /**
   * @title Lgpd message text?
   * @format html
   */
  text: string;

  /**
   * @title Days to reopen modal if it is closed
   */
  modalCloseExpiredDate: number;

  /**
   * @title Button
   */
  button: ModalButtonProps;
}

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const isOpen = cookieEmpty ? false : Boolean(!cookies["DecoLgpdModal"]);

  return { ...props, isOpen };
};

function LgpdModal(
  {
    isOpen,
    text,
    button,
    modalCloseExpiredDate,
  }: SectionProps<
    ReturnType<typeof loader>
  >,
) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);

  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();

    date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();

    document.cookie = "DecoLgpdModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";
  };

  return (
    <>
      <dialog
        ref={modalRef}
        class="modal-euro bg-secondary bg-opacity-70"
      >
        <div class="overflow-visible px-10 py-2 mb-5 self-end flex flex-row items-center max-w-6xl rounded-2xl bg-base-100">
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            class="text-[13px] text-center lg:pr-0 "
          />
          <button
            onClick={() => {
              modalRef.current?.close();
              setCookieOnCloseModal("closed", modalCloseExpiredDate);
            }}
            aria-label="Fechar"
            style={{
              minWidth: "150px",
            }}
            class={`capitalize md:ml-5 mt-2.5 min-h-12 h-12 font-semibold btn rounded-full join-item btn-${
              BUTTON_VARIANTS[button?.variant as string] ||
              BUTTON_VARIANTS["primary"]
            }`}
          >
            {button?.label || "Entendi"}
          </button>
        </div>
      </dialog>
    </>
  );
}

export default LgpdModal;
