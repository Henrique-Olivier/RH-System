import Button from "../../Button";
import Input from "../../Input";
import Typography from "../../Typography";
import { Container, ContainerButton, WrapperForm } from "./style";
import spinner from "../../assets/spinner.svg";
import Notification from "../../notfication";
import { Link } from "react-router-dom";
import useRegister from "./hooks";

export default function Register(){
    const { inputName, inputEmail, inputPassword, inputPasswordConfirm, notification, button, verifiyForm } = useRegister();

    return (
        <Container>
            <Notification id="notification" className={`alert ${notification.class}`} header={notification.header} describe={notification.describe} model="informer" type={notification.type}/>
            <WrapperForm className="form">
                <Typography variant="H2">Cadastre-se</Typography>
                <Input
                    id="input-name"
                    height="default"
                    type="text"
                    textLabel={<Typography variant="body-S">Digite seu nome:</Typography>}
                    textError={inputName.error}
                    value={inputName.value}
                    onChange={e => inputName.update(e.target.value)}
                    placeholder="Ex: John Doe"
                />
                <Input
                    id="input-email"
                    height="default"
                    type="text"
                    textLabel={<Typography variant="body-S">Digite seu e-mail:</Typography>}
                    textError={inputEmail.error}
                    value={inputEmail.value}
                    onChange={e => inputEmail.update(e.target.value)}
                    placeholder="Ex: example@example.com"
                />
                <Input
                    id="input-password"
                    height="default"
                    type="password"
                    textLabel={<Typography variant="body-S">Digite sua senha:</Typography>}
                    textError={inputPassword.error}
                    value={inputPassword.value}
                    onChange={e => inputPassword.update(e.target.value)}
                    placeholder="Ex: 123456"
                />
                <Input
                    id="input-password-confirm"
                    height="default"
                    type="password"
                    textLabel={<Typography variant="body-S">Digite sua senha novamente:</Typography>}
                    textError={inputPasswordConfirm.error}
                    value={inputPasswordConfirm.value}
                    onChange={e => inputPasswordConfirm.update(e.target.value)}
                    placeholder="Ex: 123456"
                />
                <div className="link-login">
                    <Typography variant="body-XS">Já possui cadastro? <Link to="/">Faça login aqui</Link></Typography>
                </div>
                <ContainerButton>
                    <Button id="btn-register" className={button.class} disabled={button.disabled} variant="main" size="medium" onClick={verifiyForm} icon={spinner}>
                        <p>{button.text}</p>
                    </Button>
                </ContainerButton>
            </WrapperForm>
        </Container>
    );
};