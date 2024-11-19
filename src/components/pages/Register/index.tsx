import Button from "../../Button";
import Input from "../../Input";
import Typography from "../../Typography";
import { Container, ContainerButton, WrapperForm } from "./style";
import spinner from "../../assets/spinner.svg";
import Notification from "../../notfication";
import useRegister from "./hooks";
import Select from "../../Select";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const { inputName, inputEmail, inputPassword, inputPasswordConfirm, notification, button, verifiyForm } = useRegister();

    const navigate = useNavigate();
    function goToLogin() {
        navigate("../")
    }

    return (
        <Container>
            <Notification id="notification" className={`alert ${notification.class}`} header={notification.header} describe={notification.describe} model="informer" type={notification.type} />
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
                <Select height="default" disabled textLabel="Nivel de acesso:">
                    <option value="collab">Colaborador</option>
                </Select>
                <div className="link-login">
                    <Typography variant="body-XS">Já possui cadastro?</Typography><Button size="large" variant="link" onClick={goToLogin }><Typography variant="body-XS">Faça login</Typography></Button>
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