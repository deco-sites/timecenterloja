import { useEffect } from "preact/hooks";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export const UserObject = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user.value) {
      let user_formatted = { gdpr_optin: true, language: "pt_BR" };

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const insider_object = globalThis.window.insider_object ||
        { user: user_formatted };

      if (user.value["@id"]) {
        user_formatted = Object.assign(user_formatted, {
          uuid: user.value["@id"],
        });
      }

      if (user.value.gender) {
        user_formatted = Object.assign(user_formatted, {
          gender: user.value.gender === "https://schema.org/Male" ? "M" : "F",
        });
      }

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      if (user.value.birthday) {
        user_formatted = Object.assign(user_formatted, {
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          birthday: user.value.birthday,
        });
      }

      if (user.value.name || user.value.givenName) {
        user_formatted = Object.assign(user_formatted, {
          name: user.value.name || user.value.givenName,
        });
      }

      if (user.value.familyName) {
        user_formatted = Object.assign(user_formatted, {
          surname: user.value.familyName,
        });
      }

      if (user.value.givenName) {
        user_formatted = Object.assign(user_formatted, {
          username: user.value.givenName,
        });
      }

      if (user.value.givenName) {
        user_formatted = Object.assign(user_formatted, {
          username: user.value.givenName,
        });
      }

      if (user.value.email) {
        user_formatted = Object.assign(user_formatted, {
          email: user.value.email,
        });
      }

      if (user.value.telephone) {
        user_formatted = Object.assign(user_formatted, {
          phone_number: user.value.telephone,
        });
      }

      if (user.value.telephone) {
        user_formatted = Object.assign(user_formatted, {
          phone_number: user.value.telephone,
        });
      }

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      globalThis.window.insider_object = {
        ...insider_object,
        user: user_formatted,
      };
    }
  }, [user.value]);

  return null;
};
