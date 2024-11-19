import { useEffect, useState } from "react";

export default function useVerifyAccess() {
    const [accessUser, setAccessUser] = useState("");

    const itemLocalStorage = localStorage.getItem("sb-tmmwpgaetgpasojuiyct-auth-token")!;
    const itemLocalStorageConverted = JSON.parse(itemLocalStorage);
    const userID = itemLocalStorageConverted.user.id;

    const url = import.meta.env.VITE_SUPABASE_URL;
    const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    useEffect(() => {
        async function getAccess() {
            const res = await fetch(`${url}/rest/v1/permissoesDoUsuario?userId=eq.${userID}`, {
                headers: {
                    apiKey
                }
            });

            const data = await res.json();

            setAccessUser(data[0].permissao);
        }

        getAccess();
    }, []);

    return accessUser;

}