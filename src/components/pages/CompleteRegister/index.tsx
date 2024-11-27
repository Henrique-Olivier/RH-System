import { useState } from "react";
import { NotificationType } from "../../notfication/types";
import { Container, InputContainer, NotificationControlDiv } from "./styles";
import Notification from "../../notfication";
import Typography from "../../Typography";
import Input from "../../Input";
import Button from "../../Button";
import Select from "../../Select";
import { supabase } from "../../../config/supabase";

function validateName(name: string) {
    return name.length > 2;
}

function validatePassword(password: string) {
    return password.length > 6;
}

function validateSamePassword(password: string, passwordConfirm: string) {
    return password === passwordConfirm;
}

export default function CompleteRegister() {
    const [notificationDescribe, setNotificationDescribe] = useState("");
    const [notificationHeader, setNotificationHeader] = useState("");
    const [notificationType, setNotificationType] =
        useState<NotificationType>("inform");
    const [notificationIsVisible, setNotificationIsVisible] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    const [valueInputName, setValueInputName] = useState("");
    const [valueInputPassword, setValueInputPassword] = useState("");
    const [valueInputPasswordConfirm, setValueInputPasswordConfirm] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

    async function sendInfosUser() {
        const nameIsValid = validateName(valueInputName);
        const passwordIsValid = validatePassword(valueInputPassword);
        const samePasswordIsValid = validateSamePassword(valueInputPassword, valueInputPasswordConfirm);

        if(!nameIsValid) {
            setErrorName("O nome precisa ter mais de 2 caracteres!");
        } else {
            setErrorName("");
        }
    
        if(!passwordIsValid) {
            setErrorPassword("A senha precisa ter mais de 6 caracteres!");
        } else {
            setErrorPassword("");
        }
    
        if(!samePasswordIsValid) {
            setErrorPasswordConfirm("As senhas não são idênticas");
        } else {
            setErrorPasswordConfirm("");
        }

        if(nameIsValid && passwordIsValid && samePasswordIsValid) {
            const { error } = await supabase.auth.updateUser({
                password: valueInputPassword,
                data: {
                    name: valueInputName
                }
            });

            if (error) {
                showNotification( error.message, "Erro ao redefiniar a senha", "error", 4500)
            } else {
                showNotification("Senha redefinida.", "Sucesso!" ,"success")
                setTimeout(() => {navigate('/')}, 3000)
                setDisableButton(true)
            }
        }
    }

    function showNotification(
        describe: string,
        header: string,
        type: NotificationType,
        time: number = 3000
    ) {
        setNotificationType(type);
        setNotificationHeader(header);
        setNotificationDescribe(describe);

        setNotificationIsVisible(true);
        setTimeout(() => setNotificationIsVisible(false), time);
    }

    return(
        <Container>
            <NotificationControlDiv $isVisible={notificationIsVisible}>
                <Notification
                    describe={notificationDescribe}
                    header={notificationHeader}
                    type={notificationType}
                    model="informer"
                />
            </NotificationControlDiv>
            <InputContainer>
            <Typography variant="H2">Complete seu cadastro</Typography>
                <Input
                    id="input-name"
                    height="default"
                    type="text"
                    textLabel={<Typography variant="body-S">Digite seu nome:</Typography>}
                    textError={errorName}
                    value={valueInputName}
                    onChange={e => setValueInputName(e.target.value)}
                    placeholder="Ex: John Doe"
                />
                <Input
                    id="input-password"
                    height="default"
                    type="password"
                    textLabel={<Typography variant="body-S">Digite sua senha:</Typography>}
                    textError={errorPassword}
                    value={valueInputPassword}
                    onChange={e => setValueInputPassword(e.target.value)}
                    placeholder="Ex: 123456"
                />
                <Input
                    id="input-password-confirm"
                    height="default"
                    type="password"
                    textLabel={<Typography variant="body-S">Digite sua senha novamente:</Typography>}
                    textError={errorPasswordConfirm}
                    value={valueInputPasswordConfirm}
                    onChange={e => setValueInputPasswordConfirm(e.target.value)}
                    placeholder="Ex: 123456"
                />
                <Select height="default" disabled textLabel="Nivel de acesso:">
                    <option value="collab">Colaborador</option>
                </Select>
                <Button variant="main" size="large" disabled={disableButton} onClick={sendInfosUser}><Typography variant="body-M-regular">Enviar</Typography></Button>
            </InputContainer>
        </Container>
    );
}