import Typography from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import Notification from "../../components/notfication";
import { NotificationType } from "../../components/notfication/types";
import * as Styles from './styles'
import {useNavigate } from "react-router-dom";
import { verifyIfIsLogged } from "../../service/utils";


export default function Login() {

  useEffect(() => {
    if (verifyIfIsLogged()) {
      window.location.href = './dashboard'
    }
    return
  }, [])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationDescribe, setNotificationDescribe] = useState("");
  const [notificationHeader, setNotificationHeader] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("inform");
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);

  const navigate = useNavigate();

  async function login() {
    if (email == "" || password == "") {
      showNotification(
        "Preencha todos os campos antes de prosseguir.",
        "Erro ao realizar Autenticação",
        "error",
        3500
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showNotification(
          "Email ou senha inválidos",
          "Erro ao realizar Autenticação",
          "error",
          3500
        );
        return;
      }

      if (data) {
        showNotification(
          "Redirecionando...",
          "Autenticação realizada com sucesso",
          "success",
          2000
        );
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000);
      }
    } catch (error) {
      console.error(error);
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

  function goToRegister () {
    navigate('./signup')
  }
  function goToReset () {
    navigate('./sendmail')
  }

  return (
    <>
      <Styles.NotificationControlDiv $isVisible={notificationIsVisible}>
        <Notification
          describe={notificationDescribe}
          header={notificationHeader}
          type={notificationType}
          model="informer"
        />
      </Styles.NotificationControlDiv>
      <Styles.Container>
        <Styles.LoginBox>
          <Typography variant="H2">Login</Typography>

          <Styles.InputBox>
            <Input
              value={email}
              height="small"
              placeholder="E-mail"
              textLabel={<Typography variant="body-M">E-mail</Typography>}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              height="small"
              placeholder="Senha"
              type="password"
              textLabel={<Typography variant="body-M">Senha</Typography>}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Styles.Cadastrese>
              <Typography variant="body-XS">Ainda não tem cadastro? </Typography> <Button size="large" variant="link" onClick={goToRegister}> <Typography variant="body-XS"> Cadastre-se.</Typography></Button>
            </Styles.Cadastrese>
            <Styles.Cadastrese>
            <Button size="large" variant="link" onClick={goToReset}><Typography variant="body-XS">Esqueci minha senha.</Typography></Button>
            </Styles.Cadastrese>
          </Styles.InputBox>
          <Button size="large" variant="main" onClick={login}>
            <Typography variant="body-M-regular">Entrar</Typography>
          </Button>
        </Styles.LoginBox>
      </Styles.Container>
    </>
  );
}
