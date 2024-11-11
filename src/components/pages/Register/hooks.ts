import { useNavigate } from "react-router-dom";
import { NotificationType } from "../../notfication/types";
import { classButton, classNotification, notification, textButton } from "./type";
import { supabase } from "../../../config/supabase";
import { useState } from "react";

function validateName(name: string) {
    return name.length > 2;
}

function validateEmail(email: string) {
    // Expressão regular para validar o e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa o e-mail com a regex
    return regex.test(email);
}

function validatePassword(password: string) {
    return password.length > 6;
}

function validateSamePassword(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
}



export default function useRegister() {
    const [valueInputName, setValueInputName] = useState("");
    const [valueInputEmail, setValueInputEmail] = useState("");
    const [valueInputPassword, setValueInputPassword] = useState("");
    const [valueInputPasswordConfirm, setValueInputPasswordConfirm] = useState("");
    
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
    
    const [classNotification, setClassNotification] = useState<classNotification>("close");
    const [typeNotification, setTypeNotification] = useState<NotificationType>("warning");
    const [headerNotification, setHeaderNotification] = useState("");
    const [describeNotification, setDescribeNotification] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonClass, setButtonClass] = useState<classButton>(undefined);
    const [buttonText, setButtonText] = useState<textButton>("Cadastrar");

    const navigate = useNavigate();

    async function registerUser(name: string, email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        return { data, error };
    }
    
    function showNotification(type: notification) {
        setClassNotification("open");
    
        setTimeout(() => {
            setClassNotification("close");
        }, 1500);
    
        if(type === "error") {
            setTypeNotification("warning");
            setHeaderNotification("Aviso!");
            setDescribeNotification("Usuario já cadastrado!")
        } else {
            setTypeNotification("success");
            setHeaderNotification("Sucesso!");
            setDescribeNotification("Usuario cadastrado!");
        }
    }

    function showLoading() {
        setButtonClass("show");
        setButtonDisabled(true);
        setButtonText("Cadastrando...");
        
        setTimeout(() => {
            setButtonDisabled(false);
            setButtonClass(undefined);
            setButtonText("Cadastrar");
        }, 1500)
    }

    function verifiyForm() {
        const isNameValid = validateName(valueInputName);
        const isEmailValid = validateEmail(valueInputEmail);
        const isPasswordValid = validatePassword(valueInputPassword);
        const isSamePassword = validateSamePassword(valueInputPassword, valueInputPasswordConfirm);
    
        if(!isNameValid) {
            setErrorName("O nome precisa ter mais de 2 caracteres!");
        } else {
            setErrorName("");
        }
    
        if(!isEmailValid) {
            setErrorEmail("O email precisa ser verdadeiro!");
        } else {
            setErrorEmail("");
        }
    
        if(!isPasswordValid) {
            setErrorPassword("A senha precisa ter mais de 6 caracteres!");
        } else {
            setErrorPassword("");
        }
    
        if(!isSamePassword) {
            setErrorPasswordConfirm("As senhas não são idênticas");
        } else {
            setErrorPasswordConfirm("");
        }
    
        if(isNameValid && isEmailValid && isPasswordValid && isSamePassword) {
            showLoading();
            setTimeout(async () => {
                const { error } = await registerUser(valueInputName, valueInputEmail, valueInputPassword);

                if(error) {
                    showNotification("error");
                } else {
                    showNotification("success");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000)
                }
            }, 1500)
        }
    }

    return {
        inputName: {
            value: valueInputName,
            error: errorName,
            update: setValueInputName,
        },
        inputEmail: {
            value: valueInputEmail,
            error: errorEmail,
            update: setValueInputEmail,
        },
        inputPassword: {
            value: valueInputPassword,
            error: errorPassword,
            update: setValueInputPassword,
        },
        inputPasswordConfirm: {
            value: valueInputPasswordConfirm,
            error: errorPasswordConfirm,
            update: setValueInputPasswordConfirm,
        },
        notification: {
            class: classNotification,
            type: typeNotification,
            header: headerNotification,
            describe: describeNotification,
        },
        button: {
            class: buttonClass,
            disabled: buttonDisabled,
            text: buttonText,
        },
        verifiyForm
    }

}