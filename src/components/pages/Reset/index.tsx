import styled from "styled-components";
import { theme } from "../../colors/colorts";
import Input from "../../Input";
import Typography from "../../Typography";
import Button from "../../Button";
import { useState } from "react";
import { supabase } from "../../../config/supabase";
import { useNavigate } from "react-router-dom";
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

export default function Reset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [notificationDescribe, setNotificationDescribe] = useState("");
    const [notificationHeader, setNotificationHeader] = useState("");
    const [notificationType, setNotificationType] =
        useState<NotificationType>("inform");
    const [notificationIsVisible, setNotificationIsVisible] = useState(false);
    const [disableButton, setDisableButton] = useState(false)
    const navigate = useNavigate()

    
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

    async function handleResetPassword() {

        if(newPassword != confirmNewPassword) {
            showNotification("As senhas devem ser iguais.", "Erro ao alterar a senha", "error", 4500)
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            showNotification( error.message, "Erro ao redefiniar a senha", "error", 4500)

        } else {
            showNotification("Senha redefinida.", "Sucesso!" ,"success")
            setTimeout(() => {navigate('/')}, 3000)
            setDisableButton(true)
        }
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
                <Typography variant="H4">Informe sua nova senha:</Typography>
                <Input height="default" value={newPassword} onChange={e => setNewPassword(e.target.value)} textLabel={<Typography variant="body-M-regular">Nova senha</Typography>} />
                <Input height="default" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} textLabel={<Typography variant="body-M-regular">Confirmar senha:</Typography>} />
                <Button variant="main" size="large" disabled={disableButton} onClick={handleResetPassword}><Typography variant="body-M-regular">Confirmar</Typography></Button>
            </InputContainer>
        </Container>
    )

} 