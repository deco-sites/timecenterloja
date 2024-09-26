type Props = {
  _type: string;
  _name: string;
  _class?: string;
  _placeholder?: string;
  _maxLength?: number;
  _required?: boolean;
};

function InputCustom(
  { _type, _name, _class, _placeholder, _maxLength, _required }: Props,
) {
  function handleKeyUp(e: KeyboardEvent) {
    const { target } = e;
    if (!target) return;

    if (target instanceof HTMLInputElement) {
      switch (target.name) {
        case "telephone":
          addMaskofTelephone(target);
          break;
        case "dateOfBirth":
          addMaskofDateOfBirth(target);
          break;
      }
    }
  }

  function addMaskofDateOfBirth(target: HTMLInputElement) {
    let mask = target.value;
    // Remove qualquer caractere que não seja número
    mask = mask.replace(/\D/g, "");

    // Add máscara
    switch (mask.length) {
      case 1:
        mask = mask.replace(/^(\d{1})$/, "$1");
        break;
      case 2:
        mask = mask.replace(/^(\d{2})$/, "$1/");
        break;
      case 3:
        mask = mask.replace(/^(\d{2})(\d{1})$/, "$1/$2/");
        break;
      case 4:
        mask = mask.replace(/^(\d{2})(\d{2})$/, "$1/$2/");
        break;
      case 5:
        mask = mask.replace(/^(\d{2})(\d{2})(\d{1})$/, "$1/$2/$3");
        break;
      case 6:
        mask = mask.replace(/^(\d{2})(\d{2})(\d{2})$/, "$1/$2/$3");
        break;
      case 7:
        mask = mask.replace(/^(\d{2})(\d{2})(\d{3})$/, "$1/$2/$3");
        break;
      case 8:
        mask = mask.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
        break;
    }
    // Atualiza o valor do campo de entrada com a máscara aplicada
    if (target && target?.value) return target.value = mask;
  }

  function addMaskofTelephone(target: HTMLInputElement) {
    let mask = target.value;
    // Remove qualquer caractere que não seja número
    mask = mask.replace(/\D/g, "");

    // Add máscara
    switch (mask.length) {
      case 1:
        mask = mask.replace(/^(\d{1})$/, "($1");
        break;
      case 2:
        mask = mask.replace(/^(\d{2})$/, "($1)");
        break;
      case 3:
        mask = mask.replace(/^(\d{2})(\d{1})$/, "($1) $2");
        break;
      case 4:
        mask = mask.replace(/^(\d{2})(\d{2})$/, "($1) $2");
        break;
      case 5:
        mask = mask.replace(/^(\d{2})(\d{3})$/, "($1) $2");
        break;
      case 6:
        mask = mask.replace(/^(\d{2})(\d{4})$/, "($1) $2");
        break;
      case 7:
        mask = mask.replace(/^(\d{2})(\d{5})$/, "($1) $2-");
        break;
      case 8:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{1})$/, "($1) $2-$3");
        break;
      case 9:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{2})$/, "($1) $2-$3");
        break;
      case 10:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{3})$/, "($1) $2-$3");
        break;
      case 11:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        break;
    }
    // Atualiza o valor do campo de entrada com a máscara aplicada
    if (target && target?.value) return target.value = mask;
  }

  return (
    <>
      <input
        class={_class}
        type={_type}
        name={_name}
        placeholder={_placeholder}
        onKeyUp={handleKeyUp}
        maxLength={_maxLength}
        required={_required}
      />
    </>
  );
}

export default InputCustom;
