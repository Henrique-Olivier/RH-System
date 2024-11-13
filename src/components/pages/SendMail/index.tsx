import styled from "styled-components";
import { theme } from "../../colors/colorts";
import Input from "../../Input";
import Typography from "../../Typography";
import Button from "../../Button";
import { useState } from "react";
import { supabase } from "../../../config/supabase";
import { NotificationType } from "../../notfication/types";
import Notification from "../../notfication";

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`

const InputContainer = styled.div`
box-sizing: border-box;
width: 600px;
background-color: ${theme.grayscale.bgLightGrey};
border-radius: 8px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
display: flex;
align-items: center;
flex-direction: column;
padding: 25px 50px;
gap: 25px;
`;

const NotificationControlDiv = styled.div<{ $isVisible: boolean }>`
position: absolute;
left: 50%;
top: ${(props) => (props.$isVisible ? "15%" : "-100%")};
transform: translate(-50%, -50%);
transition: 1s ease-in-out;
`;

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