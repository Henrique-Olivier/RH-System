import Button from "../../Button";
import Typography from "../../Typography";
import { BodyWrapper, ListingContainer } from "./styles";
import Modal from "../../Modal";
import Input from "../../Input";
import loading from "../../assets/spinner.svg";
import Notification from "../../notfication";
import Sidebar from "../../Sidebar";
import { dataType, typeModal } from "./types";
import useCarrer from "./hooks";
import Conditional from "../../Conditional";

export default function Carrer() {
    const { isAdmin, carrers, inputNameModal, inputLevelModal, inputSalaryModal, modal, notification, register } = useCarrer();

    function showData(data: dataType[]) {
        return data.map(value => (
            <tr id={value.id.toString()} key={value.id}>
                <td><Typography variant="body-XS">{value.nomeDoCargo}</Typography></td>
                <td><Typography variant="body-XS">{value.nivel}</Typography></td>
                <td><Typography variant="body-XS">{carrers.showSalary(value.salario)}</Typography></td>

                <Conditional condition={isAdmin!}>
                    <td className="action-btn"><Button variant="text" size="small" onClick={carrers.handleEditClick}>Editar</Button>
                        <Button variant="text" size="small" onClick={carrers.handleDeleteClick}>Deletar</Button>    
                    </td>
                </Conditional>
            </tr>
        ));
    }

    function editModal(typeModal: typeModal) {
        if(typeModal === "create" || typeModal === "edit") {
            return (
                <>
                    <Notification className={`notification ${notification.class}`} header={notification.header} describe={notification.describe} model="informer" type={notification.type}>Deu bom</Notification>
                    <Typography variant="H3">{modal.title}</Typography>
    
                    <Input 
                    type="text"
                    value={inputNameModal.value}
                    onChange={e => inputNameModal.update(e.target.value)}
                    height="default"
                    textLabel={<Typography variant="body-S">Nome do cargo:</Typography>}
                    textError={inputNameModal.error}
                    placeholder="Ex: desenvolvedor Front-End" />
    
                    <Input
                    type="text"
                    value={inputLevelModal.value}
                    onChange={e => inputLevelModal.update(e.target.value)}
                    height="default"
                    textLabel={<Typography variant="body-S">Nivel:</Typography>}
                    textError={inputLevelModal.error}
                    placeholder="Ex: Junior" />
    
                    <Input
                    type="text"
                    height="default"
                    textLabel={<Typography variant="body-S">Salario:</Typography>}
                    textError={inputSalaryModal.error}
                    placeholder="Ex: R$:1.800,00"
                    value={inputSalaryModal.value}
                    onChange={e => inputSalaryModal.update(e)}/>
    
                    <Button className="btn-modal" variant="main" size="large" icon={loading} onClick={(e) => register.verify(e.currentTarget)}>{modal.buttonText}</Button>
                </>
            );
        } else {
            return (
                <>
                    <Notification className={`notification ${notification.class}`} header={notification.header} describe={notification.describe} model="informer" type={notification.type}>Deu bom</Notification>
                    <Typography variant="H3">{modal.title}</Typography>
                    <Typography variant="body-S">Deseja deletar o cargo {inputNameModal.value}, {inputLevelModal.value}?</Typography>
                    <Button className="btn-modal" variant="main" size="medium" icon={loading} onClick={(e) => register.delete(e.currentTarget)}>{modal.buttonText}</Button>
                </>
            );
        }
    
    }

    return(
        <>
        <Sidebar></Sidebar>
            <BodyWrapper>
                <Modal isVisible={modal.isOpen} onClose={modal.handleCloseClick}>{editModal(modal.type)}</Modal>
                <ListingContainer>
                    <div>
                        <Typography variant="H4">Cargos</Typography>
                        <Conditional condition={isAdmin!}>
                            <Button variant="main" size="medium" onClick={carrers.handleAddClick}>
                                Adicionar
                            </Button>
                        </Conditional>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th><Typography variant="body-S">Nome</Typography></th>
                                <th><Typography variant="body-S">Nível</Typography></th>
                                <th><Typography variant="body-S">Salario</Typography></th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData(carrers.list)}
                        </tbody>
                    </table>
                </ListingContainer>
            </BodyWrapper>
        </>
    );
}