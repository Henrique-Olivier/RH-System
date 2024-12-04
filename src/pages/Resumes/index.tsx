import Button from "../../components/Button";
import Typography from "../../components/Typography";
import useResumes from "./hook";
import { BodyContainer, ListingContainer } from "./styles";

export default function Resumes() {
    const { listCandidates } = useResumes();
    
    function showCandidates() {
        if(listCandidates) {
            return listCandidates.map(candidate => {
                return(
                    <tr key={candidate.id}>
                        <td><Typography variant="body-XS">{candidate.name!}</Typography></td>
                        <td><Typography variant="body-XS">{candidate.email!}</Typography></td>
                        <td className="action-btn"><Button size="medium" variant="main" id={`${candidate.idVaga!}`} >Ver vagas aplicadas</Button></td>
                    </tr>
                )
            })
        }
    }

    return(
        <BodyContainer>
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