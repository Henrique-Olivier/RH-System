import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../Button";
import Typography from "../../Typography";
import { BodyWrapper, ListingContainer } from "./styles";
import { dataType, typeModal } from "./types";
import Modal from "../../Modal";
import Input from "../../Input";
import loading from "../../assets/spinner.svg";
import Notification from "../../notfication";
import { NotificationType } from "../../notfication/types";
import { verifyIfIsLogged } from "../../../config/auth";
import Sidebar from "../../Sidebar";

function convertNumberToReal(value: number) {
    const valueFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
    return valueFormatted;
}

function validateName(name: string) {
    return name.length > 2;
}

function validateLevel(level: string) {
    return level.length > 4;
}

function validateSalary(salary: string) {
    const salaryFormatted = salary.replace(/\D/g, "");
    const salaryConverted = parseInt(salaryFormatted);
    return salaryConverted >= 1200;
}

export default function Carrer() {

    useEffect(() => {
        if(verifyIfIsLogged ()){
        return
        }
        window.location.href = '../'
      }, [] )

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState<typeModal>("create");

    const [titleModal, setTitleModal] = useState("Adicionar");
    const [titleButtonModal, setTitleButtonModal] = useState("Adicionar");
    const [salaryList, setSalaryList] = useState([]);
    const [salaryInput, setSalaryInput] = useState("R$ 0,00");
    const [valueInputName, setValueInputName] = useState("");
    const [valueInputLevel, setvalueInputLevel] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorLevel, setErrorLevel] = useState("");
    const [errorSalary, setErrorSalary] = useState("");

    const [editButton, setEditButton] = useState<Element>();
    const [idButton, setIdButton] = useState("");

    const [classNotification, setClassNotification] = useState("hidden");
    const [typeNotification, setTypeNotification] = useState<NotificationType>("success");
    const [headerTextNotification, setHeaderTextNotification] = useState("");
    const [describeTextNotification, setDescribeTextNotification] = useState("");

    const [updateList, setUpdateList] = useState(true);

    const url = import.meta.env.VITE_SUPABASE_URL;
    const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    useEffect(() => {
        async function getSalaryData() {
    
            const res = await fetch(`${url}/rest/v1/Cargo`, {
                headers: {
                    apiKey
                }
            })
    
            const data = await res.json();
            setSalaryList(data);
        };

        getSalaryData();

    }, [updateList]);

    useEffect(() => {
        if (typeModal === "edit" && editButton) {
            setSalaryInput(editButton.parentElement?.parentElement?.children[2]?.textContent ?? "R$ 0,00");
            setValueInputName(editButton!.parentElement!.parentElement!.firstElementChild!.textContent!);
            setvalueInputLevel(editButton!.parentElement!.parentElement!.children[1].textContent!);
            setIdButton(editButton!.parentElement!.parentElement!.getAttribute("id")!);
            setTitleModal("Editar");
            setTitleButtonModal("Editar");
        } else if(typeModal === "delete") {
            setvalueInputLevel(editButton!.parentElement!.parentElement!.children[1].textContent!);
            setValueInputName(editButton!.parentElement!.parentElement!.firstElementChild!.textContent!);
            setIdButton(editButton!.parentElement!.parentElement!.getAttribute("id")!);
            setTitleButtonModal("Deletar");
            setTitleModal("Deletar");
        }
    }, [typeModal, editButton]);
    
    function showData(data: dataType[]) {
        return data.map(value => (
            <tr id={value.id.toString()} key={value.id}>
                <td><Typography variant="body-XS">{value.nomeDoCargo}</Typography></td>
                <td><Typography variant="body-XS">{value.nivel}</Typography></td>
                <td><Typography variant="body-XS">{convertNumberToReal(value.salario)}</Typography></td>
                <td className="action-btn"><Button variant="text" size="small" onClick={(event) => {
                        setEditButton(event.currentTarget);
                        setIsOpenModal(true);
                        setTypeModal("edit");
                    }}>Editar</Button>
                    <Button variant="text" size="small" onClick={(event) => {
                        setEditButton(event.currentTarget);
                        setIsOpenModal(true);
                        setTypeModal("delete");
                    }}>Deletar</Button>    
                </td>
            </tr>
        ))
    }


    function formatSalary(event: ChangeEvent<HTMLInputElement>){
        let value = event.target.value.replace(/\D/g, "");
    
        value = (parseFloat(value) / 100).toFixed(2).replace(".", ",");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    
        setSalaryInput("R$ " + value);
    }

    function editModal(typeModal: typeModal) {
        if(typeModal === "create" || typeModal === "edit") {
            return (
                <>
                    <Notification className={`notification ${classNotification}`} header={headerTextNotification} describe={describeTextNotification} model="informer" type={typeNotification}>Deu bom</Notification>
                    <Typography variant="H3">{titleModal}</Typography>
    
                    <Input 
                    type="text"
                    value={valueInputName}
                    onChange={e => setValueInputName(e.target.value)}
                    height="default"
                    textLabel={<Typography variant="body-S">Nome do cargo:</Typography>}
                    textError={errorName}
                    placeholder="Ex: desenvolvedor Front-End" />
    
                    <Input
                    type="text"
                    value={valueInputLevel}
                    onChange={e => setvalueInputLevel(e.target.value)}
                    height="default"
                    textLabel={<Typography variant="body-S">Nivel:</Typography>}
                    textError={errorLevel}
                    placeholder="Ex: Junior" />
    
                    <Input
                    type="text"
                    height="default"
                    textLabel={<Typography variant="body-S">Salario:</Typography>}
                    textError={errorSalary}
                    placeholder="Ex: R$:1.800,00"
                    value={salaryInput}
                    onChange={formatSalary}/>
    
                    <Button className="btn-modal" variant="main" size="large" icon={loading} onClick={(e) => verifyCarrer(e.currentTarget)}>{titleButtonModal}</Button>
                </>
            );
        } else {
            return (
                <>
                    <Notification className={`notification ${classNotification}`} header={headerTextNotification} describe={describeTextNotification} model="informer" type={typeNotification}>Deu bom</Notification>
                    <Typography variant="H3">{titleModal}</Typography>
                    <Typography variant="body-S">Deseja deletar o cargo {valueInputName}, {valueInputLevel}?</Typography>
                    <Button className="btn-modal" variant="main" size="medium" icon={loading} onClick={(e) => deleteCarrer(e.currentTarget)}>{titleButtonModal}</Button>
                </>
            );
        }

    }

    function showLoading(elementButton: Element, textButton: string) {
        elementButton.firstElementChild?.classList.add("show-loading");
        elementButton.setAttribute("disabled", "true");
        setTitleButtonModal(textButton);
    }

    function hideLoading(elementButton: Element, textButton: string) {
        elementButton.firstElementChild?.classList.remove("show-loading");
        setTimeout(() => {
            elementButton.removeAttribute("disabled");
        }, 2300)
        setTitleButtonModal(textButton);
    }

    function showNotification(typeNotification: NotificationType, textDescribe: string) {
        if(typeNotification === "success") {
            setClassNotification("show");
            setTypeNotification(typeNotification);
            setHeaderTextNotification("Sucesso");
            setDescribeTextNotification(textDescribe);
        } else {
            setClassNotification("show");
            setTypeNotification(typeNotification);
            setHeaderTextNotification("Erro");
            setDescribeTextNotification(textDescribe);
        }

        setTimeout(() => {
            setClassNotification("hidden");
            setUpdateList(!updateList);
            setTimeout(() => {
                setIsOpenModal(false);
            }, 300);
        }, 2000)
    }

    async function createCarrer() {
        const salaryFormatted = salaryInput.replace(/\D/g, "");
        let salario = parseInt(salaryFormatted);
        salario = salario/100;

        const res = await fetch(`${url}/rest/v1/Cargo`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                apiKey
            },
            body: JSON.stringify({
                nomeDoCargo: valueInputName,
                nivel: valueInputLevel,
                salario
            })
        });

        if(res.ok) {
            showNotification("success", "Cargo cadastrado com sucesso!");
        } else {
            showNotification("error", "Não foi possivel cadastrar o novo cargo!")
        }
    }

    async function editCarrer() {
        const salaryFormatted = salaryInput.replace(/\D/g, "");
        let salario = parseInt(salaryFormatted);
        salario = salario/100;

        const res = await fetch(`${url}/rest/v1/Cargo?id=eq.${idButton}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                apiKey
            },
            body: JSON.stringify({
                nomeDoCargo: valueInputName,
                nivel: valueInputLevel,
                salario
            })
        });

        if(res.ok) {
            showNotification("success", "Cargo editado com sucesso!")
        } else {
            showNotification("error", "Erro ao editar esse cargo!")
        }
    }

    function deleteCarrer(buttonElement: Element) {
        showLoading(buttonElement, "Deletando...");
        setTimeout(async () => {
            const res = await fetch(`${url}/rest/v1/Cargo?id=eq.${idButton}`,{
                method: 'DELETE',
                headers: {
                    apiKey
                }
            });
    
            if(res.ok) {
                showNotification("success", "Cargo deleteado com sucesso!");
                hideLoading(buttonElement, "Deletar")
            } else {
                showNotification("error", "Erro ao deletar esse cargo!")
                hideLoading(buttonElement, "Deletar")
            }
        }, 1300)
        
    }

    function verifyCarrer(buttonElement: Element) {
        const isNameValid = validateName(valueInputName);
        const isLevelValid = validateLevel(valueInputLevel);
        const isSalaryValid = validateSalary(salaryInput);

        if(!isNameValid) {
            setErrorName("O nome do cargo deve ter mais que 2 caracteres!");
        } else {
            setErrorName("");
        };

        if(!isLevelValid) {
            setErrorLevel("O nivel deve ter mais que 5 caracteres!")
        } else {
            setErrorLevel("");
        }

        if(!isSalaryValid) {
            setErrorSalary("O salario deve ser maior que 1200 Reais!")
        } else {
            setErrorSalary("");
        }

        if(typeModal === "create" && isNameValid && isLevelValid && isSalaryValid) {
            showLoading(buttonElement, "Adicionando...");
            
            setTimeout(async () => {
                await createCarrer();
                hideLoading(buttonElement, "Adicionar");
            }, 1300);
        } else if(typeModal === "edit" && isNameValid && isLevelValid && isSalaryValid) {
            showLoading(buttonElement, "Editando...");
            setTimeout(async () => {
                await editCarrer();
                hideLoading(buttonElement, "Editar");
            }, 1300);
        }
    }

    return(
        <>
        <Sidebar></Sidebar>
            <BodyWrapper>
                <Modal isVisible={isOpenModal} onClose={() => {
                    setSalaryInput("R$ 0,00");
                    setIsOpenModal(false);
                    setErrorName("");
                    setErrorLevel("");
                    setErrorSalary("");
                }}>{editModal(typeModal)}</Modal>
                <ListingContainer>
                    <div>
                        <Typography variant="H4">Cargos</Typography>
                        <Button variant="main" size="medium" onClick={() => {
                            setIsOpenModal(true);
                            setTypeModal("create");
                            setTitleModal("Adicionar");
                            setTitleButtonModal("Adicionar");
                            setValueInputName("");
                            setvalueInputLevel("");
                        }}>
                            Adicionar
                        </Button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th><Typography variant="body-S">Nome</Typography></th>
                                <th><Typography variant="body-S">Nível</Typography></th>
                                <th><Typography variant="body-S">Salario</Typography></th>
                                <th><Typography variant="body-S">Ação</Typography></th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData(salaryList)}
                        </tbody>
                    </table>
                </ListingContainer>
            </BodyWrapper>
        </>
    );
}