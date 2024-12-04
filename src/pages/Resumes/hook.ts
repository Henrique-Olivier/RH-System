import { useEffect, useState } from "react";
import { getCandidates } from "../../service/requisitions";
import { ICandidate } from "../../interface/collaborator.interface";

export default function useResumes() {
    const [listCandidates, setListCandidates] = useState<ICandidate[]>();

    useEffect(() => {
        async function getCandidatesSupabase() {
            const res = await getCandidates();
            if(res) {
                setListCandidates(res);
            }
        }

        getCandidatesSupabase();
    }, [])

    return { listCandidates }
}