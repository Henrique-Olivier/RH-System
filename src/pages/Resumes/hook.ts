import { useEffect, useState } from "react";
import { getCandidates, getJobsApplied } from "../../service/requisitions";
import { ICandidate, IJob } from "../../interface/collaborator.interface";
import { supabase } from "../../config/supabase";
import { verifyIfIsLogged } from "../../service/utils";
import useVerifyAccess from "../../hooks/useVerifyAccess";

export default function useResumes() {
    const [listCandidates, setListCandidates] = useState<ICandidate[]>();
    const [visibilityModal, setVisibilityModal] = useState(false);
    const [listJobsApplied, setListJobsApplied] = useState<IJob[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [idCandidate, setIdCandidate] = useState("");

    const userAccess = useVerifyAccess();

    useEffect(() => {
        if (verifyIfIsLogged()) {
            console.log(userAccess);
          return
        }
        window.location.href = '../'
    }, [])

    useEffect(() => {
        if(userAccess == "1" || userAccess === "") {
            return;
        }

        window.location.href = './dashboard'
    }, [userAccess])

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
            const idCandidate = event.currentTarget.id;
            setIdCandidate(idCandidate);
            const res = await getJobsApplied(idCandidate);
            if(res) {
                const jobs: IJob[] = res.map(item => ({
                    id: item.id,
                    titulo: item.titulo
                  }));
                setListJobsApplied(jobs);
            }
        }
        setVisibilityModal(!visibilityModal);
    }

    async function approveCandidate() {
        setButtonDisabled(!buttonDisabled);

        const nameCandidate = listCandidates?.find(candidate => candidate.id.toString() == idCandidate);

        try {
            await supabase.from("Colaborador").insert({ nome: nameCandidate!.name! })
            await supabase.from("vagaAplicada").delete().eq("fkCandidato", idCandidate);
            const { data, error } = await supabase.from("Candidato").delete().eq("id", idCandidate);

            const res = await getCandidates();
            if(res) {
                setListCandidates(res);
            }
    
            setTimeout(() => {
                setVisibilityModal(false);
                setButtonDisabled(false);
            }, 3000);

            if(data) {
                return alert("candidato aprovado!")
            }

            if(error) {
                return alert("erro ao aprovar o candidato!")
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function disapproveCandidate(event: React.MouseEvent<HTMLButtonElement>) {
        const idJob = event.currentTarget.id;
        setButtonDisabled(!buttonDisabled);

        try {
            const { data, error } = await supabase.from("vagaAplicada").delete().eq("fkVaga", idJob).eq("fkCandidato", idCandidate);
            
            setTimeout(() => {
                setVisibilityModal(!visibilityModal);
                setButtonDisabled(!buttonDisabled);
            }, 3000)

            if(data) {
                return;
            }

            if(error) {
                return;
            }

        } catch (error) {
            console.error(error)
        }
    }

    return {
        listCandidates,
        listJobsApplied,
        modal: {
            buttonsDisabled: buttonDisabled,
            visibility: visibilityModal,
            handleVisibility: handleVisibilityModal,
            handleApproved: approveCandidate,
            handleDisapproved: disapproveCandidate
        },
    }
}