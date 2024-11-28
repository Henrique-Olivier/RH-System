import MenuPng from '../assets/menu.png'
import { useState } from "react"
import CloseImg from '../assets/close.svg'
import dashIcon from '../assets/dashIcon.png'
import colabIcon from '../assets/collab.png'
import careerIcon from '../assets/gravata.png'
import userIcon from '../assets/informacao-pessoal.png'
import Typography from "../Typography"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import {CloseBtn,MenuImg,Overlay,SidebarContainer,SidebarContent } from './style'
import { loggout } from '../../service/utils'

export default function Sidebar() {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate();

    function openSidebar() {
        setIsVisible(true)
    }

    function closeSideBar() {
        setIsVisible(false)
    }

    function gotoCollabPage () {
        navigate('/collaborator')
    }

    function gotoCareerPage () {
        navigate('/carrer')
    }
    function gotoDashboardPage () {
        navigate('/dashboard')
    }
    function gotoUserPage() {
        navigate('/users')
    }


    return (
        <>
            <MenuImg src={MenuPng} onClick={openSidebar} />
            <SidebarContainer $isVisible={isVisible}>
                <CloseBtn src={CloseImg} onClick={closeSideBar} />
                <SidebarContent>
                    <Typography variant="H2">RH System</Typography>

                    <Button variant="text" size="large" icon={dashIcon} onClick={gotoDashboardPage}><Typography variant="body-M-regular">Dashboard</Typography></Button>
                    <Button variant="text" size="large" icon={colabIcon} onClick={gotoCollabPage}><Typography variant="body-M-regular">Colaboradores</Typography></Button>
                    <Button variant="text" size="large" icon={careerIcon} onClick={gotoCareerPage}><Typography variant="body-M-regular">Cargos</Typography></Button>
                    <Button variant="text" size="large" icon={userIcon} onClick={gotoUserPage}><Typography variant="body-M-regular">Usuários</Typography></Button>
                    <Button variant="text" size="large"  onClick={loggout}><Typography variant="body-M-regular">Logout</Typography></Button>
                </SidebarContent>
            </SidebarContainer>
            <Overlay $isVisible={isVisible} onClick={closeSideBar}></Overlay>
        </>
    )
}