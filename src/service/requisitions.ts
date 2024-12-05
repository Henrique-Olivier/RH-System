import { supabase } from "../config/supabase";
import {
  CollaboratorType,
  ICandidate,
  IUser,
  Permission,
  PositionType,
  UserPermission,
} from "../interface/collaborator.interface";

export async function getPositions(): Promise<PositionType[] | null> {
  try {
    const { data, error } = await supabase.from("Cargo").select("*");

    if (error) {
      console.error(error);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar Cargos na API: " + error);
    return null;
  }
}

export async function getCollaborators(): Promise<CollaboratorType[] | null> {
  try {
    const { data, error } = await supabase.from("Colaborador").select("*");

    if (error) {
      console.error(error);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar Colaboradores na API: " + error);
    return null;
  }
}

export async function getPermissions(): Promise<Permission[] | null> {
  try {
    const { data, error } = await supabase.from("permissoes").select("*");

    if (error) {
      console.error(error);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar Colaboradores na API: " + error);
    return null;
  }
}

export async function getUserPermission(): Promise<UserPermission[] | null> {
  try {
    const { data, error } = await supabase.from("permissoesDoUsuario").select("*");

    if (error) {
      console.error(error);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar Colaboradores na API: " + error);
    return null;
  }
}

export async function getUsers(): Promise<IUser[] | null> {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Erro ao buscar usuários:", error);
    }

    const users = data.users.map((usuario) => {
      const user: IUser = {
        id: usuario.id,
        email: usuario.email,
        name: usuario.user_metadata.name,
      };

      return user;
    });

    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCandidates() {
  try {
    const { data, error } = await supabase.from("Candidato").select();

    if (error) {
      console.error("Erro ao buscar usuários:", error);
    }

    if(data) {
      const candidates: ICandidate[] = data.map(candidate => {
        return {
          id: candidate.id,
          name: candidate.nome,
          email: candidate.email
        }
      });

      return candidates;
    }
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTitleJobs(idsJobs: number[]) {
// Usar `Promise.all` para aguardar todas as promessas dentro do `map`
  const jobs = await Promise.all(idsJobs.map(async (idVaga) => {
      const { data, error } = await supabase.from("vagaAplicada")
        .select("Vaga!inner(id, titulo)")
        .eq("Vaga.id", idVaga);

      if (data) {
        // Retornar os jobs mapeados a partir dos dados
        return data.map(item => item.Vaga);
      }

      if (error) {
        console.error("Erro ao buscar titulos da vagas aplicadas:", error);
        return []; // Retornar um array vazio em caso de erro
      }

      return []; // Retornar um array vazio se não houver dados
  }));
  return jobs.flat();
}

export async function getJobsApplied(idCandidate: string){
  try {
    const { data, error } = await supabase.from("Candidato").select("vagaAplicada!inner(fkVaga)").eq("vagaAplicada.fkCandidato", idCandidate);

    if(data) {
      const idsVagas: number[] = [];
      data.map(item => {
        item.vagaAplicada.map(vaga => idsVagas.push(vaga.fkVaga));
      });

      const res = await getTitleJobs(idsVagas);
      return res.flatMap(vaga => vaga);
    }
    
    if (error) {
      console.error("Erro ao buscar Vagas aplicadas:", error);
      return [];
    }

    return [];
    
  } catch (error) {
    console.error(error);
    return [];
  }
}