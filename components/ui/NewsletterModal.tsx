import { BUTTON_VARIANTS, ButtonVariant, } from "$store/components/minicart/Cart.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/compat";
import { getCookies } from "std/http/mod.ts";
import { INewsletterInputCheckboxProps } from "$store/components/newsletter/Newsletter.tsx";
import { clx } from "$store/sdk/clx.ts";
import InputCustom from "../ui/InputCustom.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { type SectionProps } from "@deco/deco";
export interface INewsletterInputProps {
    /**
     * @title Hide input?
     */
    show?: boolean;
    /**
     * @title placeholder
     */
    placeholder?: string;
}
interface ImageGeneric {
    src?: ImageWidget;
    /**
     * @title Largura da imagem
     * @description ex: (800)
     */
    width?: number;
    /**
     * @title Altura da imagem
     * @description ex: (900)
     */
    height?: number;
}
interface Device {
    /**@title Desktop*/
    desktop?: ImageGeneric;
    /**@title Mobile*/
    mobile?: ImageGeneric;
}
export interface INewsletterFormProps {
    email: INewsletterInputProps;
    name: INewsletterInputProps;
    privacyContact: INewsletterInputCheckboxProps;
    button: {
        /**
         * @title button variant
         * @default primary
         */
        variant?: ButtonVariant;
        /**
         * @title button label?
         * @default cadastrar
         */
        label?: string;
    };
}
export interface Props {
    /**
     * @title Ativar?
     * @default true
     */
    is_active?: boolean;
    /**@title Imagem */
    image?: Device;
    /**
     * @title Newsletter Form
     */
    form: INewsletterFormProps;
    /**
     * @title Título
     * @format rich-text
     */
    text: string;
    /**
     * @title Texto de finalização
     * @format rich-text
     */
    textSendSucess?: string;
    /**
     * @title Nome do campo cupom
     */
    textFieldCupom?: string;
    /**
     * @title Texto do cupom
     */
    textCupom?: string;
    /**
     * @title Cor do texto
     * @format color
     */
    colorText?: string;
    /**
     * @title Days to reopen modal if it is registered
     */
    modalSignExpiredDate: number;
    /**
     * @title Days to reopen moda if it is closed
     */
    modalCloseExpiredDate: number;
}
interface InputNewletterProps {
    name: string;
    placeholder: string;
    type: string;
    required: boolean;
}
export const loader = (props: Props, req: Request) => {
    const cookies = getCookies(req.headers);
    const cookieEmpty = req.method === "POST";
    const isOpen = cookieEmpty ? false : Boolean(!cookies["DecoNewsletterModal"]);
    return { ...props, isOpen };
};
function InputNewsletter({ name, placeholder, required, type }: InputNewletterProps) {
    return (<input name={name} type={type} class="px-[15px] py-[5px] h-8 w-full max-w-[305px] font-arial text-[.688rem] rounded-[20px] leading-10 focus:outline-none" placeholder={placeholder} required={required}/>);
}
function NewsletterModal({ textSendSucess, textFieldCupom, textCupom, isOpen, form, text, modalSignExpiredDate, modalCloseExpiredDate, colorText, image, is_active, }: SectionProps<ReturnType<typeof loader>>) {
    if (!is_active)
        return null;
    const modalRef = useRef<HTMLDialogElement>(null);
    const loading = useSignal(false);
    const success = useSignal(false);
    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        }
    }, [isOpen]);
    const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const formProps = Object.fromEntries(formData);
            const Newsletter = Boolean(formProps.newsletter);
            const { name, email, telephone, dateOfBirth } = formProps;
            const data = { name, email, telephone, dateOfBirth, Newsletter };
            await fetch("/api/optin", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                },
            });
        }
        finally {
            loading.value = false;
            success.value = true;
            setCookieOnCloseModal("registered", modalSignExpiredDate);
        }
    };
    const setCookieOnCloseModal = (cookieValue: string, expirationSeconds: number) => {
        // deno-lint-ignore no-var
        var date = new Date();
        date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));
        // deno-lint-ignore no-var
        var expires = "expires=" + date.toUTCString();
        document.cookie = "DecoNewsletterModal" + "=" + cookieValue + ";" +
            expires + ";path=/";
    };
    const emailInput = !form?.email?.show
        ? (<InputNewsletter name="email" required type="email" placeholder={form?.email?.placeholder || "E-mail"}/>)
        : null;
    const nameInput = !form?.name?.show
        ? (<InputNewsletter name="name" type="text" placeholder={form?.name?.placeholder || "Nome"} required/>)
        : null;
    const refCupom = useRef<HTMLInputElement>(null);
    function handleClickCopy() {
        const elementTextCupom = refCupom.current;
        if (!elementTextCupom)
            return null;
        const cupomText = elementTextCupom?.querySelector<HTMLParagraphElement>(".popup-custom-text");
        if (!cupomText)
            return null;
        navigator.clipboard.writeText(cupomText.innerText);
        const elementSpan = document.createElement("span");
        elementSpan.classList.add("popup-copied");
        elementSpan.innerText = "Copiado";
        elementTextCupom.append(elementSpan);
        setTimeout(() => {
            elementSpan.remove();
        }, 2500);
    }
    return (<>
      <dialog ref={modalRef} class="modal-euro bg-secondary bg-opacity-70 items-center">
        <div class={clx(`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full sm:max-w-[80%] max-h-[555px] lg:max-w-[745px]
             z-[101] max-md:w-[90%] max-md:max-w-[350px]`)} id="newsletterModal">
          <form method="dialog">
            <button class="absolute -top-[11px] right-0 translate-x-1/2 bg-[#333333] border-none rounded-full p-[0.2rem] cursor-pointer text-white" onClick={() => setCookieOnCloseModal("closed", modalCloseExpiredDate)} aria-label="Fechar">
              <Icon id="XMark" width={20} height={20}/>
            </button>
            <div class="w-full h-full absolute -z-[1]">
              {success.value
            ? (<>
                    {textSendSucess && (<div class={clx(`popup-custom-text is-title-cupom relative top-[35%] !-translate-y-[35%] md:translate-x-[34px] max-md:[&_*]:!text-[37px] [&_*]:font-raleway  
                          max-md:[&_*]:!leading-[25px] max-md:top-[70px] max-md:text-center max-md:left-2/4 max-md:!-translate-x-1/2 z-10 leading-8
                          `)} style={{
                        color: colorText ||
                            "#ffffff",
                    }} dangerouslySetInnerHTML={{
                        __html: textSendSucess,
                    }}>
                      </div>)}

                    {textFieldCupom && (<p class={clx(`popup-custom-text relative top-[40%] !-translate-y-[40%] md:translate-x-[100px] text-[1.75rem] md:max-w-[35%] 
                          leading-none z-10 max-md:top-[15%]  max-md:text-center max-md:!text-[25px] max-md:!leading-[19px] max-md:-translate-y-[15%] 
                          max-md:left-2/4 max-md:!-translate-x-1/2 font-raleway`)} style={{
                        color: colorText ||
                            "#ffffff",
                    }} dangerouslySetInnerHTML={{
                        __html: textFieldCupom,
                    }}>
                      </p>)}

                    {textCupom && (<div onClick={handleClickCopy} ref={refCupom} class={clx(`relative md:top-[42%] md:-translate-y-[42%] z-10 w-[254px] h-[40px] cursor-pointer md:left-10
                          left-2/4 max-md:-translate-x-1/2 top-[16%] -translate-y-[16%] font-raleway`)}>
                        <p class={clx(`popup-custom-text is-no-select max-md:!text-[21px] max-md:!leading-[19px] text-[23px] tracking-[2px] uppercase max-md:text-center 
                            md:max-w-full max-md:left-0 leading-none z-10 md:w-[254px] w-[207px] h-[39px] rounded-[20px] bg-[#ffffff] 
                            flex items-center justify-center absolute top-[0] text-black font-bold font-raleway`)} dangerouslySetInnerHTML={{
                        __html: textCupom,
                    }}>
                        </p>
                        <Icon id="Copy" width={22} height={28} strokeWidth={1} class="text-primary-content absolute top-[5px] left-[215px] md:left-[260px] cursor-pointer"/>
                      </div>)}

                    {image?.desktop?.src && image.mobile?.src && (<Picture>
                        <Source media="(max-width: 767px)" src={image.mobile?.src} width={image?.mobile?.width || 393} height={image?.mobile?.height || 555}/>
                        <Source media="(min-width: 768px)" src={image.desktop.src} width={image.desktop.width || 745} height={image.desktop.height || 550}/>
                        <img class="w-full h-full object-cover absolute inset-0" sizes="(max-width: 640px) 100vw, 30vw" src={image.mobile.src} alt="Imagem de fundo do modal de newsletter" decoding="async" loading="lazy"/>
                      </Picture>)}
                  </>)
            : (<>
                    {image?.desktop?.src && image?.mobile?.src && (<Picture>
                        <Source media="(max-width: 768px)" src={image?.mobile?.src} width={image?.mobile?.width || 393} height={image?.mobile?.height || 555}/>
                        <Source media="(min-width: 769px)" src={image?.desktop?.src} width={image?.desktop?.width || 745} height={image?.desktop?.height || 550}/>
                        <img class="w-full h-full object-cover absolute inset-0" sizes="(max-width: 640px) 100vw, 30vw" src={image?.mobile?.src} alt="Imagem de fundo do modal de newsletter" decoding="async" loading="lazy"/>
                      </Picture>)}

                    {text && (<div class={clx(`popup-custom-text is-register relative top-[25%] !-translate-y-[25%] md:translate-x-[64px] max-md:[&_*]:!text-[1.063rem] max-md:[&_*]:!leading-[19px]
                        max-md:top-[40px] max-md:text-center max-md:left-2/4 max-md:!-translate-x-1/2 [&_*]:font-raleway leading-snug`)} style={{ color: colorText || "#ffffff" }} dangerouslySetInnerHTML={{ __html: text }}/>)}
                    <form class={clx(`flex flex-col items-start justify-center gap-4 relative top-[31%] -translate-y-[31%] md:left-[62px] 
                        max-md:items-center max-md:gap-[0.8rem] max-md:-translate-x-1/2 max-md:top-[23%] max-md:left-1/2`)} onSubmit={handleSubmit}>
                      {nameInput}
                      <div class="relative w-[305px]">
                        {emailInput}
                        <span class={clx(`absolute top-0 -right-3 text-white`)}>
                          *
                        </span>
                      </div>

                      <div class="flex max-w-[305px] gap-x-[10px]">
                        <InputCustom _type="text" _name="telephone" _placeholder="(xx) 999999999" _maxLength={15} _required={true} _class={clx(`px-[15px] py-[5px] h-8 w-[70%] font-arial text-[.688rem] rounded-[20px] leading-10 focus:outline-none`)}/>

                        <InputCustom _type="text" _name="dateOfBirth" _placeholder="DD/MM/AAAA" _maxLength={10} _required={true} _class="px-[15px] py-[5px] h-8 w-[50%] font-arial text-[.688rem] rounded-[20px] leading-10 focus:outline-none"/>
                      </div>

                      <button type="submit" class={clx(`
                            border-none py-[10px] px-6 rounded-[20px] h-[2.188rem] flex items-center justify-center md:mt-[10px] text-white cursor-pointer 
                            font-arial text-[1.188rem] leading-8 mt-[5px] min-w-[150px] focus:outline-none duration-150 font-light 
                            bg-${BUTTON_VARIANTS[form?.button?.variant as string] ||
                    BUTTON_VARIANTS["primary"]}`)} disabled={loading}>
                        {form?.button?.label || "Inscreva-se"}
                      </button>

                      <div class={clx(`
                          max-md:flex max-md:justify-center max-md:w-full popup-custom-check flex md:absolute md:translate-y-[25%] md:-bottom-[25%] 
                          items-center gap-[1ch] text-white focus:outline-none`)}>
                        <input class="w-auto p-[5px] max-w-[250px] text-sm focus:outline-none" type="checkbox" id="newsletter" name="newsletter"/>
                        <label for="newsletter" class="font-times text-[.688rem] leading-10">
                          Aceito receber ofertas e novidades do grupo Technos
                        </label>
                      </div>
                    </form>
                  </>)}
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setCookieOnCloseModal("closed", modalCloseExpiredDate)}>
              fechar
            </button>
          </form>
        </div>
      </dialog>
    </>);
}
export default NewsletterModal;
