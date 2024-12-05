import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Typography from "../../components/Typography";
import useResumes from "./hook";
import { BodyContainer, ListingContainer } from "./styles";

export default function Resumes() {
    const { listCandidates, listJobsApplied, modal } = useResumes();

    function showJobsApplied() {
        if(listJobsApplied) {
            return listJobsApplied.map(jobs => {
                return(
                    <tr key={`${jobs.id}`}>
                        <td><Typography variant="body-XS">{`${jobs.titulo}`}</Typography></td>
                        <td className="action-btn">
                            <Button size="medium" variant="main">Aprovar</Button>
                            <Button size="medium" variant="secondary">Reprovar</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    
    function showCandidates() {
        if(listCandidates) {
            return listCandidates.map(candidate => {
                return(
                    <tr key={candidate.id}>
                        <td><Typography variant="body-XS">{candidate.name!}</Typography></td>
                        <td><Typography variant="body-XS">{candidate.email!}</Typography></td>
                        <td className="action-btn"><Button id={`${candidate.id}`} size="medium" variant="main" onClick={modal.handleVisibility} >Ver vagas aplicadas</Button></td>
                    </tr>
                )
            })
        }
    }

    return(
        <BodyContainer>
            <Modal isVisible={modal.visibility} onClose={() => modal.handleVisibility()}>
                <Typography variant="body-L">Vagas Aplicadas</Typography>

                <div className="vacancy">
                    <table>
                        <thead>
                            <tr>
                                <th><Typography variant="body-S">Nome da vaga</Typography></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td><Typography variant="body-XS">Front-end</Typography></td>
                                <td className="action-btn">
                                    <Button size="medium" variant="main">Aprovar</Button>
                                    <Button size="medium" variant="secondary">Reprovar</Button>
                                </td>
                            </tr> */}
                            {showJobsApplied()}
                        </tbody>
                    </table>
                </div>
            </Modal>
            <ListingContainer>
                <div>
                    <Typography variant="H4">Currículos</Typography>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><Typography variant="body-S">Nome</Typography></th>
                            <th><Typography variant="body-S">E-mail</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showCandidates()}
                    </tbody>
                </table>
            </ListingContainer>
        </BodyContainer>
    );
}