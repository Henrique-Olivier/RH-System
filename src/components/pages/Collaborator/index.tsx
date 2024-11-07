import Typography from "../../Typography";
import Button from "../../Button";
import styled from "styled-components";
import { theme } from "../../colors/colorts";
import AddSvg from '../../assets/addButton.svg'
import { useEffect, useState } from "react";
import Modal from "../../Modal";
import Input from "../../Input";
import { NotificationType } from "../../notfication/types";
import Notification from "../../notfication";
import Sidebar from "../../Sidebar";

interface PositionType {
  id: number;
  nomeDoCargo: string;
  nivel: string;
  salario: number;
}

interface Collaborator {
  id?: number;
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  idCargo: number;
}

const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  padding: 15px 100px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 20px;
`

const AddBox = styled.div`
  width: 25%;
  background-color: ${theme.grayscale.bgLightGrey};
  display: flex;
  flex-direction: column; 
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  `

const Table = styled.div`
  padding: 20px;
  background-color:${theme.grayscale.bgLightGrey};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 75%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
  width: 10px;
}


&::-webkit-scrollbar-track {
  background: ${theme.grayscale.bgLightGrey};
  border-radius: 10px; 
}


&::-webkit-scrollbar-thumb {
  background-color: ${theme.corporate.purple}; 
  border-radius: 10px;
  border: 2px solid #f1f1f1; 
}

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    }

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;

  border-radius: 8px;
}

th {
  background-color: ;
  font-weight: bold;
}


tr{
height: 20px;
}

button {
margin:  auto 0;
}

`

const InputContainer = styled.div`
padding: 10px;
min-width: 100%;
height: 500px;
text-align: start;
display: flex;
flex-direction: column;
align-items: start;
gap: 25px;
overflow-y: scroll;

  input{
  width: 1000%;
  }
  div {  
  width: 100%;
  }


&::-webkit-scrollbar {
  width: 10px;
}


&::-webkit-scrollbar-track {
  background: ${theme.grayscale.bgLightGrey};
  border-radius: 10px; 
}


&::-webkit-scrollbar-thumb {
  background-color: ${theme.corporate.purple}; 
  border-radius: 10px;
  border: 2px solid #f1f1f1; 
}

`

const DivButtons = styled.div`
display: flex;
gap: 20px;
justify-content: center;
`

const Select = styled.select`
appearance: none; /* Remove a aparência padrão */
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${theme.grayscale.spacerLight};
  background-color: ${theme.grayscale.white};
  color: #333;
  cursor: pointer;
  width: 100%;

 &:focus {
  outline: none;
  border-color: ${theme.corporate.purple};
}
`

const NotificationDiv = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: ${props => props.$isVisible ? '10%' : '-100%'};
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all 0.4s;
  z-index: 9999;
`

export default function Collaborator() {


  const [notificationDescribe, setNotificationDescribe] = useState("");
  const [notificationHeader, setNotificationHeader] = useState("");
  const [notificationType, setNotificationType] = useState<NotificationType>("inform");
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cargo, setCargo] = useState(0);
  const [nivel, setNivel] = useState("");
  const [salario, setSalario] = useState(0);
  const [postionInputsDisable, setPositionInputsDisable] = useState(false);
  const [cepInputsDisable, setCepInputsDisable] = useState(false)
  const [numero, setNumero] = useState("");
  const [cargos, setCargos] = useState<PositionType[]>();
  const [collaboratorList, setCollaboratorsList] = useState<Collaborator[]>();
  const [ModalFunction, setModalFunction] = useState<'edit' | 'add'>('add')
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false)
  const [idToEdit, setIdToEdit] = useState(0)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const apikey = import.meta.env.VITE_SUPABASE_ANON_KEY;


  useEffect(() => {
    if (isValidCep(cep)) {
      getLocationByCep(cep)
      setCepInputsDisable(true)
    } else if (cep) {
      setCepInputsDisable(false)
      setLogradouro("")
      setCidade("")
      setEstado("")
    }
  }, [cep])


  function isValidCep(cep: string): boolean {
    const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;
    return cepPattern.test(cep);
  }

  function isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

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


  useEffect(() => { getPositions() }, [modalIsVisible])
  useEffect(() => { getCollaborators() }, [notificationIsVisible])

  useEffect(() => {

    if (cargo == 0) {
      setNivel("")
      setSalario(0)
      setPositionInputsDisable(false)
      return;
    }
    if (cargos) {
      const CargoSelecionado = cargos.filter(elemente => elemente.id == cargo)
      setNivel(CargoSelecionado[0].nivel)
      setSalario(CargoSelecionado[0].salario)
      setPositionInputsDisable(true)
    }

  }, [cargo])

  async function getPositions(): Promise<PositionType[] | null> {
    try {

      const res = await fetch(`${supabaseUrl}/rest/v1/Cargo`, {
        headers: {
          method: 'GET',
          apikey
        }
      })

      if (!res) {
        throw new Error
      }

      const data: PositionType[] = await res.json();
      setCargos(data)

      return data
    } catch (error) {
      console.error("Erro ao buscar Cargos na API: " + error)
      return null;
    }
  }

  async function getCollaborators(): Promise<Collaborator[] | null> {
    try {

      const res = await fetch(`${supabaseUrl}/rest/v1/Colaborador`, {
        headers: {
          method: 'GET',
          apikey
        }
      })

      if (!res) {
        throw new Error
      }

      const data: Collaborator[] = await res.json();
      setCollaboratorsList(data);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Erro ao buscar Cargos na API: " + error)
      return null;
    }
  }

  function showPositionOptions(positions: PositionType[]) {
    return positions.map(position => (
      <option key={position.id} value={position.id}>{position.nomeDoCargo}</option>
    ))
  }

  function showCollaboratorsRows(collaborators: Collaborator[]) {

    return collaborators.map(collaborator => {
      let colabCareer = cargos;

      if (cargos) {
        colabCareer = cargos.filter(cargo => cargo.id == collaborator.idCargo);
      }

      return (

        <tr key={collaborator.id} data-id={collaborator.id}>
          <td><Typography variant="body-XS">{collaborator.nome}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.cpf}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.cep}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.logradouro}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.numero}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.cidade}</Typography></td>
          <td><Typography variant="body-XS">{collaborator.estado}</Typography></td>
          <td><Typography variant="body-XS">{colabCareer && colabCareer[0].nomeDoCargo}</Typography></td>
          <td><Typography variant="body-XS">{colabCareer && colabCareer[0].nivel}</Typography></td>
          <td><Typography variant="body-XS">
            {colabCareer && colabCareer[0].salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', })}</Typography></td>
          <td><Button size="small" variant="text" onClick={e => {
            const target = e.target as HTMLElement;
            const row = target.parentElement?.parentElement?.parentElement;
            if (row) {
              const collabId = row.dataset.id
              openEditCollaborator(Number(collabId))
            }
          }}><Typography variant="body-XS">Editar</Typography></Button></td>
          <td><Button size="small" variant="text" onClick={e => {
            const target = e.target as HTMLElement;
            const row = target.parentElement?.parentElement?.parentElement;
            if (row) {
              const collabId = row.dataset.id
              openModalConfirm()
              setIdToEdit(Number(collabId))
            }
          }}><Typography variant="body-XS" >Remover</Typography></Button></td>
        </tr>
      )
    })
  }

  function openEditCollaborator(collabId: number) {
    if (collaboratorList) {
      const collabToEdit = collaboratorList.find(collaborator => (collaborator.id == collabId))
      console.log(collabToEdit)

      if (!collabToEdit) {
        showNotification('Houve um erro ao tentar editar o usuário, por favor tente mais tarde.', 'Erro ao editar', 'error', 4000)
        return;
      }

      setIdToEdit(collabId)
      setName(collabToEdit.nome)
      setCpf(collabToEdit.cpf)
      setCep(collabToEdit.cep)
      setLogradouro(collabToEdit.logradouro)
      setNumero(collabToEdit.numero)
      setCidade(collabToEdit.cidade)
      setEstado(collabToEdit.estado)
      setCargo(collabToEdit.idCargo)
      setModalFunction('edit')
      openModal()
    }
  }

  async function getLocationByCep(cep: string) {

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()

      if (data) {
        setLogradouro(data.logradouro)
        setCidade(data.localidade)
        setEstado(data.estado)
      }
    } catch (error) {
      console.error('Erro ao buscar CEP: ' + error)
    }
  }

  function openModal() {
    setModalIsVisible(true)
  }

  function openAddModal() {
    setModalFunction('add');
    clearModal();
    openModal();
  }

  function closeModal() {
    setModalIsVisible(false)
    clearModal()
  }

  function clearModal() {
    setName("")
    setCpf("")
    setCep("")
    setLogradouro("")
    setCidade("")
    setNumero("")
    setEstado("")
    setCargo(0)
    setNivel("")
    setSalario(0)
    setCepInputsDisable(false)
  }

  async function deleteUser() {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/Colaborador?id=eq.${idToEdit}`, {
        method: 'DELETE',
        headers: {
          apikey,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        console.log("deletou legal")
        showNotification('Operação Realizada com sucesso.', 'O colaborador foi removido com sucesso.', 'success')
      }

    } catch (error) {
      console.error(error)
    }
  }


  async function EditUser() {
    if (name == '' || cpf == '' || cep == '' || logradouro == '' || numero == '' || cidade == '' || estado == '' || cargo == 0) {
      showNotification("Preencha todos os campos antes de prosseguir", "Erro ao cadastrar novo usuário", 'error', 3500)
      return;
    }

    if (!isValidCep(cep)) {
      showNotification("Informação Inválida!", "O CEP é invalido!", 'error', 3500)
      return;
    }

    if (!isValidCPF(cpf)) {
      showNotification("Informação Inválida!", "O CPF é invalido!", 'error', 3500)
      return;
    }

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/Colaborador?id=eq.${idToEdit}`, {
        method: 'PATCH',
        headers: {
          apikey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: name,
          cpf,
          cep,
          logradouro,
          numero,
          cidade,
          estado,
          idCargo: cargo
        })
      });

      if (res.ok) {
        console.log("atualizou legal")
        showNotification('Operação Realizada com sucesso.', 'Os dados do colaborador foram atualizados com sucesso', 'success')
      }

    } catch (error) {
      console.error(error)
    }
  }

  async function RegisterNewCollaborator() {
    if (name == '' || cpf == '' || cep == '' || logradouro == '' || numero == '' || cidade == '' || estado == '' || cargo == 0) {
      showNotification("Preencha todos os campos antes de prosseguir", "Erro ao cadastrar novo usuário", 'error', 3500)
      return;
    }

    if (!isValidCep(cep)) {
      showNotification("Informação Inválida!", "O CEP é invalido!", 'error', 3500)
      return;
    }

    if (!isValidCPF(cpf)) {
      showNotification("Informação Inválida!", "O CPF é invalido!", 'error', 3500)
      return;
    }

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/Colaborador`, {
        method: 'POST',
        headers: {
          apikey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: name,
          cpf,
          cep,
          logradouro,
          numero,
          cidade,
          estado,
          idCargo: cargo
        })
      });

      if (res.ok) {
        console.log("cadastrou legal")
        showNotification('Operação Realizada com sucesso.', 'O Colaborador foi cadastrado com sucesso!', 'success')
        clearModal()
      }

    } catch (error) {
      console.error(error)
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

  function closeModalConfirm() {
    setModalConfirmVisible(false)
  }

  function openModalConfirm() {
    setModalConfirmVisible(true)
  }

  function getCollabName(collabId: number) {
    if (collaboratorList) {
      const collab = collaboratorList.find(collaborator => (collaborator.id == collabId))

      if (collab) {
        return collab.nome
      }

    }
    return '';
  }

  return (
    <>
      <Sidebar></Sidebar>
      <Container>
        <Modal isVisible={modalConfirmVisible} onClose={closeModalConfirm}>
          <Typography variant="body-M-regular">Certeza que deseja remover o coloaborador {getCollabName(idToEdit)} ? </Typography>
          <DivButtons>
            <Button size="large" variant="secondary" onClick={closeModalConfirm}><Typography variant="body-XS" >Cancelar</Typography></Button>
            <Button size="large" variant="main" onClick={deleteUser}><Typography variant="body-XS" >Remover</Typography></Button>
          </DivButtons>
        </Modal>
        <NotificationDiv $isVisible={notificationIsVisible}>
          <Notification type={notificationType} model='informer' describe={notificationDescribe} header={notificationHeader} />
        </NotificationDiv>
        <Modal onClose={closeModal} isVisible={modalIsVisible}>
          <InputContainer>
            <Typography variant="H3">Adicionar Colaborador</Typography>
            <Input height="small" value={name} onChange={e => setName(e.target.value)} textLabel={<Typography variant="body-XS">Nome</Typography>}></Input>
            <Input height="small" value={cpf} onChange={e => setCpf(e.target.value)} textLabel={<Typography variant="body-XS">CPF</Typography>}></Input>
            <Input height="small" value={cep} onChange={e => setCep(e.target.value)} textLabel={<Typography variant="body-XS">CEP</Typography>}></Input>
            <Input height="small" value={numero} onChange={e => setNumero(e.target.value)} textLabel={<Typography variant="body-XS">Número</Typography>}></Input>
            <Input height="small" value={logradouro} disabled={cepInputsDisable} onChange={e => setLogradouro(e.target.value)} textLabel={<Typography variant="body-XS">Logradouro</Typography>}></Input>
            <Input height="small" value={cidade} disabled={cepInputsDisable} onChange={e => setCidade(e.target.value)} textLabel={<Typography variant="body-XS">Cidade</Typography>}></Input>
            <Input height="small" value={estado} disabled={cepInputsDisable} onChange={e => setEstado(e.target.value)} textLabel={<Typography variant="body-XS">Estado</Typography>}></Input>
            <Select value={cargo} onChange={e => setCargo(Number(e.target.value))}>
              <option value="0"><Typography variant="body-XS">Selecione Um Cargo</Typography></option>
              {cargos && showPositionOptions(cargos)}
            </Select>
            <Input height="small" value={nivel} disabled={postionInputsDisable} onChange={e => setNivel(e.target.value)} textLabel={<Typography variant="body-XS">Nivel</Typography>}></Input>
            <Input height="small" value={salario} disabled={postionInputsDisable} onChange={e => setSalario(Number(e.target.value))} textLabel={<Typography variant="body-XS">Salário</Typography>}></Input>
            <DivButtons>
              <Button size="large" variant="secondary" onClick={closeModal}><Typography variant="body-XS" >Cancelar</Typography></Button>
              {ModalFunction == "add" ? <Button size="large" variant="main" onClick={RegisterNewCollaborator}><Typography variant="body-XS" >Adicionar</Typography></Button> :
                <Button size="large" variant="main" onClick={EditUser}><Typography variant="body-XS" >Editar</Typography></Button>
              }
            </DivButtons>
          </InputContainer>
        </Modal>
        <AddBox>
          <Typography variant="body-L">Adicionar Colaborador</Typography>
          <Button size="large" variant="main" icon={AddSvg} onClick={openAddModal} >
            <Typography variant="body-M-regular">Adicionar</Typography>
          </Button>
        </AddBox>

        <Table>
          <Typography variant="H2">Colaboradores</Typography>
          <table>
            <thead>
              <tr>
                <th><Typography variant="body-S">Nome</Typography></th>
                <th><Typography variant="body-S">CPF</Typography></th>
                <th><Typography variant="body-S">CEP</Typography></th>
                <th><Typography variant="body-S">Logradouro</Typography></th>
                <th><Typography variant="body-S">Número</Typography></th>
                <th><Typography variant="body-S">Cidade</Typography></th>
                <th><Typography variant="body-S">Estado</Typography></th>
                <th><Typography variant="body-S">Cargo</Typography></th>
                <th><Typography variant="body-S">Nível</Typography></th>
                <th><Typography variant="body-S">Salário</Typography></th>
              </tr>
            </thead>
            <tbody>

              {collaboratorList && showCollaboratorsRows(collaboratorList)}
            </tbody>
          </table>
        </Table>
      </Container>
    </>
  );
}
