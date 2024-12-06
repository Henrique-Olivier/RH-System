import Input from "../../components/Input";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { useState } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../../components/notfication/types";
import Notification from "../../components/notfication";
import {Container,InputContainer,NotificationControlDiv} from './styles'


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