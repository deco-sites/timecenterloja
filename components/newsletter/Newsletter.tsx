import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

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

export interface INewsletterInputCheckboxProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title pre text?
   */
  preLabel?: string;
  /**
   * @title pos text?
   */
  posLabel?: string;
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
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-9 h-9 px-5 join-item w-full rounded-full placeholder:text-placeholder outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

export interface InputCheckboxNewsletterProps {
  name: string;
  required: boolean;
  preLabel?: string;
  posLabel?: string;
}

function InputCheckboxNewsletter(
  { name, required, posLabel, preLabel }: InputCheckboxNewsletterProps,
) {
  return (
    <label
      class="w-full flex items-center justify-center gap-4 lg:justify-start"
      style={{ cursor: "pointer !important" }}
    >
      {!!preLabel && <p class="text-base-100">{preLabel}</p>}
      <input
        name={name}
        type="checkbox"
        style={{ width: "1.25rem" }}
        class="input h-5 flex-shrink-0 block outline-none p-0"
        required={required}
      />
      {!!posLabel && <p class="text-base-100">{posLabel}</p>}
    </label>
  );
}

const add_email_optin_inside_user_object = (
  { name, email, email_optin }: {
    name: string;
    email: string;
    email_optin: boolean;
  },
) => {
  let user_formatted = { email_optin };
  
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  globalThis.window.insider_object = JSON.parse(sessionStorage.getItem('user_object')) || globalThis.window.insider_object || { user: user_formatted };

  if (name) {
    user_formatted = Object.assign(user_formatted, {name, username: name});
  }

  if (email) {
    user_formatted = Object.assign(user_formatted, {email});
  }

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  globalThis.window.insider_object.user = { ...globalThis.window.insider_object.user, ...user_formatted};
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  sessionStorage.setItem('user_object', JSON.stringify(globalThis.window.insider_object));
}

function Form(props: Props) {
  const { text, form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit: JSX.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = {
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value || "",
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value || "",
      privacyContact: !!(e.currentTarget.elements.namedItem("privacy-contact") as HTMLInputElement)?.checked,
    };

    loading.value = true;

    await fetch("/api/optin", {
      method: "POST",
      body: JSON.stringify({
        dateOfBirth: "",
        Newsletter: formData.privacyContact,
        email: formData.email,
        name: formData.name,
        telephone: ""
      }),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    }).then((response) => {
      success.value = true;

      if (
        window.location.href.includes('localhost') || 
        window.location.href.includes('decocdn') || 
        window.location.href.includes('deno.dev')
      ) {
        console.log(["Dados enviados para a Option com sucesso:", response]);
      }
    }).catch((error: { message: any; }) => {
      console.error("Erro ao enviar dados para a Option:", error.message || error);
    })

    add_email_optin_inside_user_object({
      email_optin: formData.privacyContact,
      email: formData.email,
      name: formData.name
    });

    loading.value = false;

    setTimeout(() => {
      success.value = false;
    }, 5000);
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;

  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;

  const privacyContactInput = !form?.privacyContact?.show
    ? (
      <InputCheckboxNewsletter
        name="privacy-contact"
        posLabel={form?.privacyContact?.posLabel ||
          "Aceito receber ofertas e novidades por e-mail"}
        required={false}
      />
    )
    : null;

  return (
    <div class="flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-10 py-7 w-full justify-between">
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class="uppercase text-base lg:text-base text-left text-base-100 lg:max-w-xl max-w-xs lg:pr-0 pr-14"
      />
      {success.value
        ? (
          <div class="text-base lg:text-xl text-left text-base-100">
            E-mail cadastrado com sucesso!
          </div>
        )
        : (
          <form
            class="w-full form-control"
            onSubmit={handleSubmit}
          >
            <div class="flex gap-4 w-full mb-4 lg:flex-row flex-col items-center lg:justify-between justify-center">
              {nameInput}
              {emailInput}
              <button
                type="submit"
                class={`mr-0 lg:mr-auto uppercase md:ml-5 font-medium btn min-h-0 min-w-[150px] disabled:min-w-0 h-9 disabled:loading disabled:mx-[65px] rounded-full join-item btn-${
                  BUTTON_VARIANTS[form?.button?.variant as string] ||
                  BUTTON_VARIANTS["primary"]
                }`}
                disabled={loading}
              >
                {form?.button?.label || "Cadastrar"}
              </button>
            </div>
            {privacyContactInput}
          </form>
        )}
    </div>
  );
}

export default Form;
