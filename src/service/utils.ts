import { supabase } from "../config/supabase";


export function verifyIfIsLogged() {
    const verify = localStorage.getItem("sb-tmmwpgaetgpasojuiyct-auth-token")

    if (verify) {
        return true;
    }

    return false;
}


export async function loggout() {

    const { error } = await supabase.auth.signOut()
    
    if(error ) {
        console.error(error)
    }
    
    window.location.href = './'
} 