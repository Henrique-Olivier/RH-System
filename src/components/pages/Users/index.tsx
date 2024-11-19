import styled from "styled-components"
import { theme } from "../../colors/colorts"
import Sidebar from "../../Sidebar"
import Typography from "../../Typography"
import { supabase } from "../../../config/supabase"
import { useEffect, useState } from "react"
import Button from "../../Button"
import Modal from "../../Modal"
import Input from "../../Input"
import Select from "../../Select"
import { json } from "react-router-dom"
import { NotificationType } from "../../notfication/types"
import Notification from "../../notfication"
import Conditional from "../../Conditional"
import useVerifyAccess from "../../../hooks/useVerifyAccess"

const Body = styled.div`
width: 100vw;
height: 100vh;
display:flex;
align-items: center;
justify-content: center;
`

const UserCard = styled.div`
  width: 70%; 
  height: 90%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  background: ${theme.grayscale.bgLightGrey};
  padding: 20px;
`

export const Table = styled.div`
  padding: 20px;
  background-color:${theme.grayscale.bgLightGrey};
  border-radius: 8px;
  width: 100%;
  overflow-x: auto;
  max-height: 100%;

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

const ModalContent = styled.div`
display: flex;
width: 75%;
text-align: start;
flex-direction: column;
gap: 20px;
`

const BtnDiv = styled.div`
display: flex;
gap: 25px;
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

interface IUser {
    id: string;
    email: string | undefined;
    name: string | undefined;
}

interface UserPermission {
    userId: string;
    permission: number;
}

interface Permission {
    created_at: string;
    id: number;
    permissao: string;
}


export default function Users() {

    const [usersList, setUserList] = useState<IUser[]>()
    const [userPermissionList, setuserPermissionList] = useState<UserPermission[]>()
    const [permissionList, setPermissionList] = useState<Permission[]>()
    const [isModalEditVisible, setIsModalVisible] = useState(false)
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")
    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [cargo, setCargo] = useState(0)

    const [notificationDescribe, setNotificationDescribe] = useState("");
    const [notificationHeader, setNotificationHeader] = useState("");
    const [notificationType, setNotificationType] = useState<NotificationType>("inform");
    const [notificationIsVisible, setNotificationIsVisible] = useState(false);

    const [isAdmin, setIsAdmin] = useState<boolean>();

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const apikey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const userAccess = useVerifyAccess();
    
    useEffect(() => {
        if(userAccess == "1") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [usersList])

    useEffect(() => {
        getUserPermission()
        getUsers()
        getPermission()
    }, [notificationIsVisible])

    async function getUsers(): Promise<IUser[] | undefined> {
        try {
            const { data, error } = await supabase.auth.admin.listUsers();

            if (error) {
                console.error('Erro ao buscar usuários:', error);
                return;
            }

            const users = data.users.map(usuario => {
                const user: IUser = {
                    id: usuario.id,
                    email: usuario.email,
                    name: usuario.user_metadata.name
                }

                return user;
            });

            console.log(users)
            setUserList(users)
            return users;
        } catch (error) {
            console.error(error)
        }

    }

    async function getUserPermission() {
        try {

            const res = await fetch(`${supabaseUrl}/rest/v1/permissoesDoUsuario`, {
                headers: {
                    method: 'GET',
                    apikey
                }
            })

            if (!res) {
                throw new Error
            }

            const data = await res.json();

            const permissions = data.map((permission: { userId: any; permissao: any }) => {
                const item: UserPermission = {
                    userId: permission.userId,
                    permission: permission.permissao
                }

                return item
            })

            setuserPermissionList(permissions)
        } catch (error) {
            console.error("Erro ao buscar Cargos na API: " + error)
            return null;
        }
    }

    async function getPermission() {
        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/permissoes`, {
                headers: {
                    method: 'GET',
                    apikey
                }
            })

            if (!res) {
                throw new Error
            }

            const data: Permission[] = await res.json();

            console.log(data)

            setPermissionList(data)
        } catch (error) {
            console.error("Erro ao buscar Cargos na API: " + error)
            return null;
        }
    }



    function showTableRows() {

        if (usersList && userPermissionList) {
            return usersList.map(user => {

                const permission = userPermissionList.find(item => item.userId == user.id)
                return (
                    <tr key={user.id} data-id={user.id}>
                        <th><Typography variant="body-S">{user.email || 'Indisponivel'}</Typography></th>
                        <th><Typography variant="body-S">{user.name || 'Indisponivel'}</Typography></th>
                        <th><Typography variant="body-S">{permission?.permission == 1 ? 'Admin' : permission?.permission == 2 ? 'Editor' : 'Indisponivel'}</Typography></th>
                        
                        <Conditional condition={isAdmin!}>
                            <th>
                                <Button variant='text' onClick={(event) => {
                                    const target = event.target as HTMLElement;
                                    const row = target.parentElement?.parentElement?.parentElement;
                                    if (row) {
                                        const userId = row.dataset.id!
                                        openEditModal(userId)
                                    }
                                }} size="large">
                                    <Typography variant="body-S">Editar</Typography>
                                </Button>
                            </th>
                            <th>
                                <Button variant='text' onClick={(event) => {
                                    const target = event.target as HTMLElement;
                                    const row = target.parentElement?.parentElement?.parentElement;
                                    if (row) {
                                        const userId = row.dataset.id!
                                        openDeleteModal(userId)
                                    }
                                }} size="large">
                                    <Typography variant="body-S">Excluir</Typography>
                                </Button>
                            </th>
                        </Conditional>

                    </tr >
                )

            })
        }
    }

    function closeModal() {
        setIsModalVisible(false)
        setNome("")
        setCargo(0)
        setEmail("")
    }

    function openModal() {
        setIsModalVisible(true)
    }

    function openEditModal(userId: string) {
        openModal()
        setSelectedUserId(userId)
        if (usersList && userPermissionList) {
            const selectedUser = usersList.find(user => user.id == userId);
            const permission = userPermissionList.find(permission => permission.userId == userId)

            if (selectedUser && permission) {
                setEmail(selectedUser.email || '')
                setNome(selectedUser.name || '')
                setCargo(permission.permission)
            }
        }
    }

    function openDeleteModal(userId: string) {
        setIsModalDeleteVisible(true);
        setSelectedUserId(userId)
        if (usersList && userPermissionList) {
            const selectedUser = usersList.find(user => user.id == userId);

            if (selectedUser) {
                setNome(selectedUser.name || '')
            }
        }
    }

    function showPermissionsOptions() {
        if (permissionList) {
            return permissionList.map(permission => (
                <option key={permission.id} value={permission.id}>{permission.permissao}</option>
            ))
        }
    }

    async function editUser() {
        if(cargo == 0 ) {
            showNotification('Selecione um cargo antes de editar.', 'Não foi possivel editaro usuário', 'warning');
            return;
        }

        try {
            const { data, error } = await supabase.auth.admin.updateUserById(selectedUserId, {
                email,
                user_metadata: {
                    name: nome
                }
            });

            if (error) {
                console.error('Erro ao atualizar o usuário:', error);
                return;
            }

        } catch (error) {
            console.error(error)
            showNotification('Não foi possivel editar, tente novamente mais tarde.', 'Erro ao editar', 'error', 4500)
        }

        
        try {
            const { data, error } = await supabase
                .from('permissoesDoUsuario')
                .update({ permissao: cargo })
                .eq('userId', selectedUserId);

            if (error) {
                console.error('Erro ao atualizar o dado:', error);
                return;
            } else {
                console.log('Dado atualizado com sucesso:', data);
                showNotification('Usuário editado com sucesso.', 'Sucesso', 'success')
            }

        } catch (error) {
            console.log(error)
            return;
        }
    }

    async function deleteUser() {
        try {
            const { data, error } = await supabase.auth.admin.deleteUser(selectedUserId);

            if (error) {
                console.error('Erro ao atualizar o usuário:', error);
                return;
            } else {
                console.log('Usuario deletado com sucesso:', data);
                showNotification('Usuário deletado com sucesso.', 'Sucesso', 'success')
            }

        } catch (error) {
            console.error(error)
            showNotification('Não foi possivel deletar, tente novamente mais tarde.', 'Erro ao deletar', 'error', 4500)
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
    return (
        <Body>
            <NotificationDiv $isVisible={notificationIsVisible}>
                <Notification type={notificationType} model='informer' describe={notificationDescribe} header={notificationHeader} />
            </NotificationDiv>
            <Sidebar />
            <Modal isVisible={isModalEditVisible} onClose={closeModal}>
                <Typography variant="body-L">Editar Usuário</Typography>
                <ModalContent>
                    <Input disabled height="default" value={email} onChange={e => setEmail(e.target.value)} textLabel={<Typography variant="body-M-regular">Email</Typography>} />
                    <Input height="default" value={nome} onChange={e => setNome(e.target.value)} textLabel={<Typography variant="body-M-regular">Nome</Typography>} />
                    <Select height="default" value={cargo} onChange={e => setCargo(Number(e.target.value))} textLabel="Cargo">
                        <option value="0">Selecione uma opção</option>
                        {showPermissionsOptions()}
                    </Select>
                    <BtnDiv>
                        <Button variant="secondary" size="large" onClick={closeModal}><Typography variant="body-M-regular">Cancelar</Typography></Button>
                        <Button variant="main" size="large" onClick={editUser}><Typography variant="body-M-regular">Editar</Typography></Button>
                    </BtnDiv>
                </ModalContent>
            </Modal>

            <Modal isVisible={isModalDeleteVisible} onClose={() => setIsModalDeleteVisible(false)}>
                <Typography variant="body-M-regular">{`Deseja deletar o usuario ${nome}?`}</Typography>
                <BtnDiv>
                    <Button variant="secondary" size="large" onClick={closeModal}><Typography variant="body-M-regular">Cancelar</Typography></Button>
                    <Button variant="main" size="large" onClick={deleteUser}><Typography variant="body-M-regular">Deletar</Typography></Button>
                </BtnDiv>
            </Modal>
            <UserCard>
                <Typography variant="H2">Usuários do Sistema</Typography>

                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th><Typography variant="body-L">Email</Typography></th>
                                <th><Typography variant="body-L">Nome</Typography></th>
                                <th><Typography variant="body-L">Cargo</Typography></th>
                            </tr>
                        </thead>
                        <tbody>
                            {showTableRows()}
                        </tbody>
                    </table>
                </Table>
            </UserCard>
        </Body>
    )
}