import Button from "../../components/Button";
import { theme } from "../../components/colors/colorts";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import AddImg from '../../components/assets/addButton.svg'
import Typography from "../../components/Typography";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { PositionType } from "../../interface/collaborator.interface";
import { getPositions } from "../../service/requisitions";
import { supabase } from "../../config/supabase";

const Container = styled.div`
height: 100vh;
width: 90vw;
margin: auto;
padding: 15px;
display: flex;
gap: 20px;
justify-content: center;
`

const AddContainer = styled.div`
width: 25%;
height: 90px;
background-color: ${theme.grayscale.bgLightGrey};
border-radius: 4px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
display: flex;
padding: 10px; 
align-items: center;
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
interface VacancieType {
    id: number;
    titulo: string;
    descricao: string;
    beneficios: string;
    fkCargo: number;
}

export default function JobVacancies() {

    const [isVisible, setIsVisible] = useState(false)
    const [modalVisualize, setModalVisualize] = useState(false)
    const [positionList, setPositionList] = useState<PositionType[]>()
    const [vacanciesList, setVacanciesList] = useState<VacancieType[]>()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [position, setPosition] = useState("")
    const [benefits, setBenefits] = useState("")

    const [visualizeTitle, setVisualizeTitle] = useState("")
    const [visualizeDescription, setVisualizeDescription] = useState("")
    const [visualizePosition, setVisualizePosition] = useState("")
    const [visualizeBenefits, setVisualizeBenefits] = useState("")

    const [isEditModal, setIsEditModal] = useState(false)
    const [idToEdit, setIdToEdit] = useState(0)


    useEffect(() => {
        const fetchPositions = async () => {
            const positions = await getPositions();
            if (positions !== null) {
                setPositionList(positions)
                console.log(positions)
            }
        };


        fetchPositions();
    }, []);

    function showPositionOptions(positions: PositionType[]) {
        return positions.map((position) => (
            <option key={position.id} value={position.id}>
                {`${position.nomeDoCargo} - ${position.nivel}`}
            </option>
        ));
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
                                <Typography variant="body-M">Expandir</Typography>
                            </Button>
                        </CardButtons>
                    </CardVacancies>
                )
            }
        });
    }

    function openModal() {
        setIsVisible(true)
    }

    function closeModal() {
        setIsVisible(false)
        setIsEditModal(false)
    }


    async function addVacancie() {
        try {
            const { data, error } = await supabase
                .from('Vaga')
                .insert([{ titulo: title, descricao: description, fkCargo: Number(position), beneficios: benefits },])


            if (error) {
                console.error(error)
                return;
            }

            console.log(data)
        } catch (error) {
            console.error(error)
        }


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

    useEffect(() => {
        getJobVacancie()
    }, [])


    function openVisualize(idVacancie: number) {
        setIdToEdit(idVacancie)
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

    function openAddModal() {
        setIsEditModal(false)
        openModal()
        setTitle('')
        setDescription('')
        setPosition('')
        setBenefits('')
    }

    function openEditModal(idVacancie: number) {
        closeVisualize()

        if (vacanciesList && positionList) {
            const vacancie = vacanciesList.find(vacancie => vacancie.id == idVacancie)
            const position = positionList.find(position => position.id == vacancie?.fkCargo)

            if (vacancie && position) {

                setTitle(vacancie.titulo)
                setDescription(vacancie.descricao)
                setBenefits(vacancie.beneficios)
                setPosition(vacancie.fkCargo.toString())

                openModal()
                setIsEditModal(true)
            }


        }
    }

    return (
        <>
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
                        <Button variant="secondary" size="large">
                            <Typography variant="body-M">Excluir</Typography>
                        </Button>
                        <Button variant="main" onClick={() => openEditModal(idToEdit)} size="large">
                            <Typography variant="body-M">Editar</Typography>
                        </Button>
                    </ModalButtons>
                </ModalCotent>
            </Modal>
            <Modal isVisible={isVisible} onClose={closeModal}>
                <ModalCotent>
                    <Typography variant="H4">Adicionar Vaga:</Typography>

                    <Input height="default" value={title} onChange={e => setTitle(e.target.value)} textLabel={<Typography variant='body-M'>Título</Typography>} />
                    <Select height="default" value={position} onChange={e => setPosition(e.target.value)} textLabel="Cargo">
                        <option value="0">Selecione uma opção</option>
                        {positionList && showPositionOptions(positionList)}
                    </Select >
                    <Input height="default" value={description} onChange={e => setDescription(e.target.value)} textLabel={<Typography variant='body-M'>Descrição</Typography>} />
                    <Input height="default" value={benefits} onChange={e => setBenefits(e.target.value)} textLabel={<Typography variant='body-M'>Benefícios</Typography>} />
                    <ModalButtons>
                        <Button onClick={closeModal} variant="secondary" size="large">
                            <Typography variant="body-M">Cancelar</Typography>
                        </Button>
                        {isEditModal ?
                            <Button variant="main" size="large">
                                <Typography variant="body-M">Editar</Typography>
                            </Button>
                            :
                            <Button variant="main" size="large" onClick={addVacancie}>
                                <Typography variant="body-M">Adicionar</Typography>
                            </Button>}
                    </ModalButtons>
                </ModalCotent>
            </Modal>
            <Sidebar />
            <Container>
                <AddContainer>
                    <Button onClick={openAddModal} variant="main" size="large" icon={AddImg}>
                        <Typography variant="body-M" >Adicionar Vaga</Typography>
                    </Button>
                </AddContainer>
                <ContainerVacancies>
                    <GridVocancies>
                        {vacanciesList && showVacanciesCard(vacanciesList)}
                    </GridVocancies>
                </ContainerVacancies>
            </Container>
        </>
    )
}