import { supabase } from "../config/supabase";
import {
  CollaboratorType,
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


