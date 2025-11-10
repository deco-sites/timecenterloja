import { useEffect } from "preact/hooks";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { setHashedCookie } from "$store/sdk/userData.ts";

export const UserObject = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUserData = async () => {
      let user_formatted = { gdpr_optin: true, language: "pt_BR" };

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      globalThis.window.insider_object = JSON.parse(sessionStorage.getItem('user_object')) || globalThis.window.insider_object || { user: user_formatted };

      if (user.value) {
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
    
        if (user.value.email) {
          user_formatted = Object.assign(user_formatted, {
            email: user.value.email,
          });
        }
    
        if (user.value.telephone) {
          user_formatted = Object.assign(user_formatted, {
            phone_number: `${user.value.telephone}`.replace(/\D/g, ''),
          });
        }
      }

      // Salva dados do usuário com hash em cookies (ou nulo se user.value for nulo)
      await setHashedCookie("MonksUserEm", user.value?.email || "");
      await setHashedCookie("MonksUserFn", user.value?.givenName || "");
      await setHashedCookie("MonksUserLn", user.value?.familyName || "");
      await setHashedCookie("MonksUserPh", user.value?.telephone || "");
      await setHashedCookie("MonksUserEid", user.value?.["@id"] || "");

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      globalThis.window.insider_object.user = { ...globalThis.window.insider_object.user, ...user_formatted};
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      sessionStorage.setItem('user_object', JSON.stringify(globalThis.window.insider_object));
    };

    saveUserData();
  }, [user.value]);

  return null;
};
