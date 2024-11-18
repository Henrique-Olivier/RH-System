import styled from "styled-components"
import { theme } from "../../colors/colorts"
import Sidebar from "../../Sidebar"
import Typography from "../../Typography"
import { supabase } from "../../../config/supabase"
import { useEffect, useState } from "react"
import Button from "../../Button"
import Modal from "../../Modal"
import Input from "../../Input"

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
`

interface IUser {
    id: string;
    email: string | undefined;
    name: string | undefined;
}

interface Permission {
    userId: string;
    permission: number;
}

export default function Users() {

    const [usersList, setUserList] = useState<IUser[]>()
    const [permissionList, setPermissionList] = useState<Permission[]>()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const apikey = import.meta.env.VITE_SUPABASE_ANON_KEY;


    useEffect(() => {
        getPermissions()
        getUsers()
    }, [])

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

    async function getPermissions() {
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
                const item: Permission = {
                    userId: permission.userId,
                    permission: permission.permissao
                }

                return item
            })

            setPermissionList(permissions)
        } catch (error) {
            console.error("Erro ao buscar Cargos na API: " + error)
            return null;
        }
    }

    function showTableRows() {
        console.log('table')

        if (usersList && permissionList) {
            return usersList.map(user => {

                const permission = permissionList.find(item => item.userId == user.id)
                console.log(permission)
                return (
                    <tr>
                        <th><Typography variant="body-S">{user.email || 'Indisponivel'}</Typography></th>
                        <th><Typography variant="body-S">{user.name || 'Indisponivel'}</Typography></th>
                        <th><Typography variant="body-S">{permission?.permission == 1 ? 'Admin' : permission?.permission == 2 ? 'Editor' : 'Indisponivel'}</Typography></th>
                        <th>
                            <Button variant='text' onClick={openModal} size="large">
                                <Typography variant="body-S">Editar</Typography>
                            </Button>
                        </th>
                        <th>
                            <Button variant='text' size="large">
                                <Typography variant="body-S">Excluir</Typography>
                            </Button>
                        </th>

                    </tr >
                )

            })
        }
    }

    function closeModal() {
        setIsModalVisible(false)
    }
    function openModal() {
        setIsModalVisible(true)
    }

    return (
        <Body>
            <Sidebar />
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <Typography variant="body-L">Editar Usuário</Typography>
                <ModalContent>
                    <Input height="default" textLabel={<Typography variant="body-M-regular">Nome</Typography>} />
                </ModalContent>
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