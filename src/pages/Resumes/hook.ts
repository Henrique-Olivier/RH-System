import { useEffect, useState } from "react";
import { getCandidates, getJobsApplied } from "../../service/requisitions";
import { ICandidate } from "../../interface/collaborator.interface";

export default function useResumes() {
    const [listCandidates, setListCandidates] = useState<ICandidate[]>();
    const [visibilityModal, setVisibilityModal] = useState(false);
    /* const [idCandidate, setIdCandidate] = useState(""); */

    useEffect(() => {
        async function getCandidatesSupabase() {
            const res = await getCandidates();
            if(res) {
                setListCandidates(res);
            }
        }
        
        getCandidatesSupabase();
    }, [])

    async function handleVisibilityModal(event?: React.MouseEvent<HTMLButtonElement>) {
        if(event) {
            const idCandidate = event.currentTarget.id
            await getJobsApplied(idCandidate);
        }
        setVisibilityModal(!visibilityModal);
    }

    return {
        listCandidates,
        modal: {
            visibility: visibilityModal,
            handleVisibility: handleVisibilityModal
        }
    }
}