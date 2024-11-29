import Input from "../../components/Input";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { useState } from "react";
import { supabase } from "../../config/supabase";
import { NotificationType } from "../../components/notfication/types";
import Notification from "../../components/notfication";
import {Container,InputContainer,NotificationControlDiv} from './styles'

export default function SendMail() {

    const [email, setEmail] = useState('');
    const [notificationDescribe, setNotificationDescribe] = useState("");
    const [notificationHeader, setNotificationHeader] = useState("");
    const [notificationType, setNotificationType] =
        useState<NotificationType>("inform");
    const [notificationIsVisible, setNotificationIsVisible] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    async function sendResetEmail() {

        if (!validateEmail(email)) {
            showNotification('Informe um email válido.', 'Erro ao enviar email de recuperação', 'error', 4500);
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:5173/resetpassword' // URL para onde o usuário será redirecionado após clicar no link
            });


            if (error) {
                console.error('Erro ao enviar o e-mail de redefinição:', error.message);
            } else {
                showNotification('Email enviado com sucesso!', 'Verifique sua caixa de email para recuperar sua senha.', 'success', 5000);
                setDisableButton(true)
            }

        } catch (error) {
            console.error('Erro ao enviar email:' + error)
        }

    }

    function validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
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

    return (
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
                <Typography variant="H4">Digite seu e-mail cadastrado para receber um link de recuperação de senha.</Typography>
                <Input height="default" value={email} onChange={e => setEmail(e.target.value)} textLabel={<Typography variant="body-M-regular">Email</Typography>} />
                <Button variant="main" size="large" disabled={disableButton} onClick={sendResetEmail}><Typography variant="body-M-regular">Enviar</Typography></Button>
            </InputContainer>
        </Container>
    )
} 