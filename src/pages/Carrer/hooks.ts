import { ChangeEvent, useEffect, useState } from "react";
import { verifyIfIsLogged } from "../../config/auth";
import { NotificationType } from "../../components/notfication/types";
import { typeModal } from "./types";
import useVerifyAccess from "../../hooks/useVerifyAccess";
import { getPositions } from "../../service/requisitions";
import { PositionType } from "../../interface/collaborator.interface";

function validateName(name: string) {
  return name.length > 2;
}

function validateLevel(level: string) {
  return level.length > 4;
}

function validateSalary(salary: string) {
  const salaryFormatted = salary.replace(/\D/g, "");
  const salaryConverted = parseInt(salaryFormatted);
  return salaryConverted >= 1200;
}

function formatSalary(event: ChangeEvent<HTMLInputElement>) {
  let value = event.target.value.replace(/\D/g, "");

  value = (parseFloat(value) / 100).toFixed(2).replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  return "R$ " + value;
}

export default function useCarrer() {
  const [salaryList, setSalaryList] = useState<PositionType[]>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<typeModal>("create");

  const [titleModal, setTitleModal] = useState("Adicionar");
  const [titleButtonModal, setTitleButtonModal] = useState("Adicionar");
  const [valueInputName, setValueInputName] = useState("");
  const [valueInputLevel, setValueInputLevel] = useState("");
  const [valueInputSalary, setValueInputSalary] = useState("R$ 0,00");

  const [errorName, setErrorName] = useState("");
  const [errorLevel, setErrorLevel] = useState("");
  const [errorSalary, setErrorSalary] = useState("");

  const [editButton, setEditButton] = useState<Element>();
  const [idButton, setIdButton] = useState("");

  const [classNotification, setClassNotification] = useState("hidden");
  const [typeNotification, setTypeNotification] =
    useState<NotificationType>("success");
  const [headerTextNotification, setHeaderTextNotification] = useState("");
  const [describeTextNotification, setDescribeTextNotification] = useState("");

  const [updateList, setUpdateList] = useState(true);

  const [isAdmin, setIsAdmin] = useState<boolean>();

  const url = import.meta.env.VITE_SUPABASE_URL;
  const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (verifyIfIsLogged()) {
      return;
    }
    window.location.href = "../";
  }, []);

  const userAccess = useVerifyAccess();
  useEffect(() => {
    if (userAccess == "1") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userAccess]);

  useEffect(() => {
    async function fetchSalary() {
      const data = await getPositions();

      if (data !== null) {
        setSalaryList(data);
      }
    }

    fetchSalary();
  }, [updateList]);

  useEffect(() => {
    if (typeModal === "edit" && editButton) {
      setValueInputSalary(
        editButton.parentElement?.parentElement?.children[2]?.textContent ??
          "R$ 0,00"
      );
      setValueInputName(
        editButton!.parentElement!.parentElement!.firstElementChild!
          .textContent!
      );
      setValueInputLevel(
        editButton!.parentElement!.parentElement!.children[1].textContent!
      );
      setIdButton(
        editButton!.parentElement!.parentElement!.getAttribute("id")!
      );
      setTitleModal("Editar");
      setTitleButtonModal("Editar");
    } else if (typeModal === "delete") {
      setValueInputLevel(
        editButton!.parentElement!.parentElement!.children[1].textContent!
      );
      setValueInputName(
        editButton!.parentElement!.parentElement!.firstElementChild!
          .textContent!
      );
      setIdButton(
        editButton!.parentElement!.parentElement!.getAttribute("id")!
      );
      setTitleButtonModal("Deletar");
      setTitleModal("Deletar");
    }
  }, [typeModal, editButton]);

  function handleAddModal() {
    setIsOpenModal(true);
    setTypeModal("create");
    setTitleModal("Adicionar");
    setTitleButtonModal("Adicionar");
    setValueInputName("");
    setValueInputLevel("");
  }

  function handleEditModal(event: React.MouseEvent<HTMLButtonElement>) {
    setEditButton(event.currentTarget);
    setIsOpenModal(true);
    setTypeModal("edit");
  }

  function handleDeleteModal(event: React.MouseEvent<HTMLButtonElement>) {
    setEditButton(event.currentTarget);
    setIsOpenModal(true);
    setTypeModal("delete");
  }

  function handleCloseModal() {
    setValueInputSalary("R$ 0,00");
    setIsOpenModal(false);
    setErrorName("");
    setErrorLevel("");
    setErrorSalary("");
  }

  function convertNumberToReal(value: number) {
    const valueFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    return valueFormatted;
  }

  function updateSalary(event: ChangeEvent<HTMLInputElement>) {
    const salaryFormatted = formatSalary(event);
    setValueInputSalary(salaryFormatted);
  }

  async function createCarrer() {
    const salaryFormatted = valueInputSalary.replace(/\D/g, "");
    let salario = parseInt(salaryFormatted);
    salario = salario / 100;

    const res = await fetch(`${url}/rest/v1/Cargo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey,
      },
      body: JSON.stringify({
        nomeDoCargo: valueInputName,
        nivel: valueInputLevel,
        salario,
      }),
    });

    if (res.ok) {
      showNotification("success", "Cargo cadastrado com sucesso!");
    } else {
      showNotification("error", "Não foi possivel cadastrar o novo cargo!");
    }
  }

  async function editCarrer() {
    const salaryFormatted = valueInputSalary.replace(/\D/g, "");
    let salario = parseInt(salaryFormatted);
    salario = salario / 100;

    const res = await fetch(`${url}/rest/v1/Cargo?id=eq.${idButton}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apiKey,
      },
      body: JSON.stringify({
        nomeDoCargo: valueInputName,
        nivel: valueInputLevel,
        salario,
      }),
    });

    if (res.ok) {
      showNotification("success", "Cargo editado com sucesso!");
    } else {
      showNotification("error", "Erro ao editar esse cargo!");
    }
  }

  function deleteCarrer(buttonElement: Element) {
    showLoading(buttonElement, "Deletando...");
    setTimeout(async () => {
      const res = await fetch(`${url}/rest/v1/Cargo?id=eq.${idButton}`, {
        method: "DELETE",
        headers: {
          apiKey,
        },
      });

      if (res.ok) {
        showNotification("success", "Cargo deleteado com sucesso!");
        hideLoading(buttonElement, "Deletar");
      } else {
        showNotification("error", "Erro ao deletar esse cargo!");
        hideLoading(buttonElement, "Deletar");
      }
    }, 1300);
  }

  function verifyCarrer(buttonElement: Element) {
    const isNameValid = validateName(valueInputName);
    const isLevelValid = validateLevel(valueInputLevel);
    const isSalaryValid = validateSalary(valueInputSalary);

    if (!isNameValid) {
      setErrorName("O nome do cargo deve ter mais que 2 caracteres!");
    } else {
      setErrorName("");
    }

    if (!isLevelValid) {
      setErrorLevel("O nivel deve ter mais que 5 caracteres!");
    } else {
      setErrorLevel("");
    }

    if (!isSalaryValid) {
      setErrorSalary("O salario deve ser maior que 1200 Reais!");
    } else {
      setErrorSalary("");
    }

    if (
      typeModal === "create" &&
      isNameValid &&
      isLevelValid &&
      isSalaryValid
    ) {
      showLoading(buttonElement, "Adicionando...");

      setTimeout(async () => {
        await createCarrer();
        hideLoading(buttonElement, "Adicionar");
      }, 1300);
    } else if (
      typeModal === "edit" &&
      isNameValid &&
      isLevelValid &&
      isSalaryValid
    ) {
      showLoading(buttonElement, "Editando...");
      setTimeout(async () => {
        await editCarrer();
        hideLoading(buttonElement, "Editar");
      }, 1300);
    }
  }

  function showLoading(elementButton: Element, textButton: string) {
    elementButton.firstElementChild?.classList.add("show-loading");
    elementButton.setAttribute("disabled", "true");
    setTitleButtonModal(textButton);
  }

  function hideLoading(elementButton: Element, textButton: string) {
    elementButton.firstElementChild?.classList.remove("show-loading");
    setTimeout(() => {
      elementButton.removeAttribute("disabled");
    }, 2300);
    setTitleButtonModal(textButton);
  }

  function showNotification(
    typeNotification: NotificationType,
    textDescribe: string
  ) {
    if (typeNotification === "success") {
      setClassNotification("show");
      setTypeNotification(typeNotification);
      setHeaderTextNotification("Sucesso");
      setDescribeTextNotification(textDescribe);
    } else {
      setClassNotification("show");
      setTypeNotification(typeNotification);
      setHeaderTextNotification("Erro");
      setDescribeTextNotification(textDescribe);
    }

    setTimeout(() => {
      setClassNotification("hidden");
      setUpdateList(!updateList);
      setTimeout(() => {
        setIsOpenModal(false);
      }, 300);
    }, 2000);
  }

  return {
    isAdmin,
    carrers: {
      list: salaryList,
      showSalary: convertNumberToReal,
      handleAddClick: handleAddModal,
      handleEditClick: handleEditModal,
      handleDeleteClick: handleDeleteModal,
    },
    modal: {
      isOpen: isOpenModal,
      type: typeModal,
      title: titleModal,
      buttonText: titleButtonModal,
      handleCloseClick: handleCloseModal,
    },
    inputNameModal: {
      value: valueInputName,
      update: setValueInputName,
      error: errorName,
    },
    inputLevelModal: {
      value: valueInputLevel,
      update: setValueInputLevel,
      error: errorLevel,
    },
    inputSalaryModal: {
      value: valueInputSalary,
      update: updateSalary,
      error: errorSalary,
    },
    notification: {
      class: classNotification,
      header: headerTextNotification,
      describe: describeTextNotification,
      type: typeNotification,
    },
    register: {
      verify: verifyCarrer,
      delete: deleteCarrer,
    },
  };
}
