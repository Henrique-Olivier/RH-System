import Button from "../../components/Button";
import { theme } from "../../components/colors/colorts";
import styled from "styled-components";
import Typography from "../../components/Typography";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { PositionType } from "../../interface/collaborator.interface";
import { getPositions } from "../../service/requisitions";
import { supabase } from "../../config/supabase";
import Notification from "../../components/notfication";
import { NotificationType } from "../../components/notfication/types";

const Container = styled.div`
height: 100vh;
width: 90vw;
margin: auto;
padding: 15px;
display: flex;
gap: 20px;
justify-content: center;
`

const ContainerVacancies = styled.div`
width: 75%;
height: 100%;
background-color: ${theme.grayscale.bgLightGrey};
border-radius: 4px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
padding: 10px; 
`

const GridVocancies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; 
`

const CardVacancies = styled.div`
  background-color: ${theme.grayscale.spacerLight};
  width: 400px;
  height: 280px;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardButtons = styled.div`
display: flex;
gap: 10px;
width: 100%;
justify-content: center; 

`
const CardContent = styled.div`
display: flex;
gap: 10px;
flex-direction: column ;
`

const ModalCotent = styled.div`
width: 100%;
text-align: start;
display: flex;
flex-direction: column;
gap: 15px;
`

const ModalButtons = styled.div`
display: flex;
gap: 15px;
justify-content: center;
`
const NotificationDiv = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: ${props => props.$isVisible ? '10%' : '-100%'};
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all 0.4s;
  z-index: 9999;
`
const DivEmpty = styled.div<{ $showEmpty: boolean }>`
display: ${p => p.$showEmpty ? 'block' : 'none'} ;
`

interface VacancieType {
    id: number;
    titulo: string;
    descricao: string;
    beneficios: string;
    fkCargo: number;
}

export default function Vacancies() {

    const [modalApplyVisible, setModalApplyVisible] = useState(false)
    const [modalVisualize, setModalVisualize] = useState(false)
    const [positionList, setPositionList] = useState<PositionType[]>()
    const [vacanciesList, setVacanciesList] = useState<VacancieType[]>()


    const [visualizeTitle, setVisualizeTitle] = useState("")
    const [visualizeDescription, setVisualizeDescription] = useState("")
    const [visualizePosition, setVisualizePosition] = useState("")
    const [visualizeBenefits, setVisualizeBenefits] = useState("")


    const [notificationDescribe, setNotificationDescribe] = useState("");
    const [notificationHeader, setNotificationHeader] = useState("");
    const [notificationType, setNotificationType] =
        useState<NotificationType>("inform");
    const [notificationIsVisible, setNotificationIsVisible] = useState(false);

    const [vacancieToApply, setVacancieToApply] = useState(0)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState("");
    const [showAdress, setShowAdress] = useState(false)
    const [cepInputsDisable, setCepInputsDisable] = useState(true);

    useEffect(() => {
        if (numero.length > 0) {
            setShowAdress(true);
        } else if (numero.length == 0) {
            setShowAdress(false)
        }
    }, [numero])

    useEffect(() => {
        if (isValidCep(cep)) {
            getLocationByCep(cep);
            setCepInputsDisable(true);
        } else if (cep) {
            setCepInputsDisable(false);
            setLogradouro("");
            setCidade("");
            setEstado("");
        }
    }, [cep]);


    useEffect(() => {
        const fetchPositions = async () => {
            const positions = await getPositions();
            if (positions !== null) {
                setPositionList(positions)
                console.log(positions)
            }
        };


        fetchPositions();
    }, [notificationIsVisible]);

    useEffect(() => {
        getJobVacancie()
    }, [notificationIsVisible])


    async function getLocationByCep(cep: string) {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();

            if (data) {
                setLogradouro(data.logradouro);
                setCidade(data.localidade);
                setEstado(data.estado);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP: " + error);
        }
    }


    function isValidCep(cep: string): boolean {
        const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;
        return cepPattern.test(cep);
    }

    function showVacanciesCard(jobVacancies: VacancieType[]) {
        return jobVacancies.map((vacancie, index) => {

            const position = positionList?.find(position => position.id == vacancie.fkCargo)

            if (position) {
                return (
                    <CardVacancies key={index}>
                        <CardContent>
                            <Typography variant="H4">{`${vacancie.titulo}`}</Typography>
                            <Typography variant="body-L">{`${position.nomeDoCargo}`}</Typography>
                            <Typography variant="body-M">{`${limitText(vacancie.descricao, 120)}`}</Typography>
                        </CardContent>
                        <CardButtons>
                            <Button data-idvacancie={vacancie.id} variant="main" size="large" onClick={
                                e => {
                                    const target = e.target as HTMLElement
                                    const idVacancie = target.dataset.idvacancie
                                    if (idVacancie) {
                                        openVisualize(Number(idVacancie))
                                    };
                                }
                            }>
                                <Typography variant="body-M">Vizualizar</Typography>
                            </Button>
                        </CardButtons>
                    </CardVacancies>
                )
            }
        });
    }






    async function getJobVacancie(): Promise<VacancieType[] | undefined> {

        try {
            const { data, error } = await supabase
                .from("Vaga")
                .select("*")

            if (error) {
                console.log(error);
                return undefined;
            }

            setVacanciesList(data)
            return data;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    function limitText(text: string, maxLength: number = 100): string {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + " ...";
        }
        return text;
    }



    function openVisualize(idVacancie: number) {
        setVacancieToApply(idVacancie)
        setModalVisualize(true)

        if (vacanciesList && positionList) {
            const vacancie = vacanciesList.find(vacancie => vacancie.id == idVacancie)
            const position = positionList.find(position => position.id == vacancie?.fkCargo)

            if (vacancie && position) {
                setVisualizeTitle(vacancie.titulo)
                setVisualizeDescription(vacancie.descricao)
                setVisualizePosition(position.nomeDoCargo)
                setVisualizeBenefits(vacancie.beneficios)
            }
        }

    }

    function closeVisualize() {
        setModalVisualize(false)
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


    function searchVacancieName(idVacancie: number): string {

        if (vacanciesList) {
            const vacancie = vacanciesList.find(vacancie => (vacancie.id == idVacancie))

            if (vacancie) {
                return vacancie.titulo;
            }
        }

        return '';
    }

    function openModal() {
        closeVisualize()
        setModalApplyVisible(true)
    }

    function closeModal() {
        setModalApplyVisible(false)
        setName("")
        setEmail("")
        setCpf("")
        setCep("")
        setNumero("")
        setComplemento("")
    }


    async function addCandidate() {
        if (
            name == "" ||
            cpf == "" ||
            cep == "" ||
            logradouro == "" ||
            numero == "" ||
            cidade == "" ||
            estado == ""
        ) {
            showNotification(
                "Preencha todos os campos antes de prosseguir",
                "Erro ao se candidatar para a vaga",
                "error",
                4500
            );
            return;
        }

        if (!isValidCPF(cpf)) {
            showNotification(
                "Insira um CPF válido.",
                "Erro ao se candidatar para a vaga",
                "error",
                4500
            );
            return;
        }

        if (!validateEmail(email)) {
            showNotification(
                "Insira um email válido.",
                "Erro ao se candidatar para a vaga",
                "error",
                4500
            );
            return;
        }

        try {



            const { data: existingCandidates, error: fetchError } = await supabase
                .from("Candidato")
                .select("*")
                .eq("email", email);

            if (fetchError) {
                console.error(fetchError);
                return;
            }

            if (existingCandidates && existingCandidates.length > 0) {
                const idCandidate = existingCandidates[0].id;
                applyCandidate(idCandidate);
                return;
            }


            const { data: newCandidate, error: insertError } = await supabase
                .from("Candidato")
                .insert([{ nome: name, email, cpf, cep, logradouro, numero, cidade, estado, complemento }])
                .select();

            if (insertError) {
                console.error(insertError);
                return;
            }

            if (newCandidate && newCandidate.length > 0) {
                applyCandidate(newCandidate[0].id);
            }

        } catch (error) {
            console.error("Erro inesperado:", error);
            showNotification('Ocorreu um erro inesperado, tente novamente mais tarde.', 'Erro ao se candidatar', 'error', 5000)

        }
    }


    async function applyCandidate(idCandidate: number) {
        try {
            const { data: existingCandidates, error: fetchError } = await supabase
                .from("vagaAplicada")
                .select("*")
                .eq('fkVaga', vacancieToApply)
                .eq('fkCandidato', idCandidate)

            if (fetchError) {
                showNotification('Ocorreu um erro ao se candidatar para está vaga, tente novamente mais tarde.', 'Erro ao se candidatar', 'error', 5000)
                console.error(fetchError)
            }

            if (existingCandidates && existingCandidates.length > 0) {
                console.log('candidato já cadastrado')
                showNotification('Não é possível se candidatar novamente para a mesma vaga.', 'Não foi possível se candidatar', 'error', 5000)
                return
            }

            const { error } = await supabase
                .from("vagaAplicada")
                .insert([{ fkVaga: vacancieToApply, fkCandidato: idCandidate }])
                .select()

            if (error) {
                showNotification('Ocorreu um erro ao se candidatar para está vaga, tente novamente mais tarde.', 'Erro ao se candidatar', 'error', 5000)
                console.error(error)
                return;
            }

            showNotification(`Você se candidatou para a vaga ${searchVacancieName(vacancieToApply)}`, 'Sucesso.', 'success')
            setTimeout(closeModal, 1000)

        } catch (error) {
            console.error(error)
            showNotification('Ocorreu um erro inesperado, tente novamente mais tarde.', 'Erro ao se candidatar', 'error', 5000)

        }
    }

    function validateEmail(email: string) {
        // Expressão regular para validar o e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Testa o e-mail com a regex
        return regex.test(email);
    }

    function isValidCPF(cpf: string): boolean {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, "");

        // Verifica se o CPF tem 11 dígitos ou é uma sequência de dígitos iguais
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        // Calcula o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstCheck = (sum * 10) % 11;
        if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
        if (firstCheck !== parseInt(cpf.charAt(9))) return false;

        // Calcula o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondCheck = (sum * 10) % 11;
        if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
        if (secondCheck !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    return (
        <>
            <Modal isVisible={modalApplyVisible} onClose={closeModal}>
                <ModalCotent>
                    <Typography variant="H4">
                        {`Preencha os dados para se candidatar para a vaga "${searchVacancieName(vacancieToApply)}"`}
                    </Typography>


                    <Input
                        height="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        textLabel={<Typography variant="body-XS">Nome</Typography>}
                    ></Input>

                    <Input
                        height="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        textLabel={<Typography variant="body-XS">Email</Typography>}
                    ></Input>
                    <Input
                        height="small"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        textLabel={<Typography variant="body-XS">CPF</Typography>}
                    ></Input>
                    <Input
                        height="small"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        textLabel={<Typography variant="body-XS">CEP</Typography>}
                    ></Input>
                    <Input
                        height="small"
                        value={numero}
                        disabled={!cepInputsDisable}
                        onChange={(e) => setNumero(e.target.value)}
                        textLabel={<Typography variant="body-XS">Número</Typography>}
                    ></Input>
                    <Input
                        height="small"
                        value={complemento}
                        disabled={!cepInputsDisable}
                        onChange={(e) => setComplemento(e.target.value)}
                        textLabel={<Typography variant="body-XS">Complemento</Typography>}
                    ></Input>

                    <DivEmpty $showEmpty={showAdress}>
                        <Typography variant="body-M-regular">{`Endereço: ${logradouro}, ${numero} - ${cidade} - ${estado}. ${complemento}`}</Typography>
                    </DivEmpty >

                    <ModalButtons>
                        <Button variant="secondary" size="large" onClick={closeModal}>
                            <Typography variant="body-M">Cancelar</Typography>
                        </Button>
                        <Button variant="main" size="large" onClick={addCandidate}>
                            <Typography variant="body-M">Me Candidatar</Typography>
                        </Button>
                    </ModalButtons>
                </ModalCotent>
            </Modal>
            <NotificationDiv $isVisible={notificationIsVisible}>
                <Notification
                    type={notificationType}
                    model="informer"
                    describe={notificationDescribe}
                    header={notificationHeader}
                />
            </NotificationDiv>
            <Modal isVisible={modalVisualize} onClose={closeVisualize}>
                <ModalCotent>
                    <Typography variant="body-L">Título:</Typography>
                    <Typography variant="body-M">{`${visualizeTitle}`}</Typography>
                    <Typography variant="body-L">Cargo:</Typography>
                    <Typography variant="body-M">{`${visualizePosition}`}</Typography>
                    <Typography variant="body-L">Descrição:</Typography>
                    <Typography variant="body-M">{`${visualizeDescription}`}</Typography>
                    <Typography variant="body-L">Benefícios:</Typography>
                    <Typography variant="body-M">{`${visualizeBenefits}`}</Typography>
                    <ModalButtons>
                        <Button variant="secondary" size="large" onClick={closeVisualize}>
                            <Typography variant="body-M">Fechar</Typography>
                        </Button>
                        <Button variant="main" size="large" onClick={openModal}>
                            <Typography variant="body-M">Aplicar para esta vaga</Typography>
                        </Button>
                    </ModalButtons>
                </ModalCotent>
            </Modal>
            <Container>
                <ContainerVacancies>
                    <GridVocancies>
                        {vacanciesList && showVacanciesCard(vacanciesList)}
                    </GridVocancies>
                </ContainerVacancies>
            </Container>
        </>
    )
}