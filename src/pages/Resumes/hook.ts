import { useEffect, useState } from "react";
import { getCandidates, getJobsApplied } from "../../service/requisitions";
import { ICandidate } from "../../interface/collaborator.interface";

export default function useResumes() {
    const [listCandidates, setListCandidates] = useState<ICandidate[]>();
    const [visibilityModal, setVisibilityModal] = useState(false);
    const [listJobsApplied, setListJobsApplied] = useState([]);

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
            const res = await getJobsApplied(idCandidate);
            if(res) {
                console.log(res)
            }
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