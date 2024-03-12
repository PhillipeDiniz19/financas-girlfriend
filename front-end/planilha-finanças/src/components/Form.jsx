import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef()
  
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.title.value = onEdit.title;
      user.descriptio.value = onEdit.descriptio;
      user.valor.value = onEdit.valor;
      user.parcela.value = onEdit.parcela;
    }
    return () => {};
  }, [onEdit]);

const handleSubmit = async (e) => {
    e.preventDefault(e);
    const user = ref.current;
    if (!user.title.value || !user.descriptio.value || !user.valor.value || !user.parcela.value) {
      return toast.warn("Preencha todos os campos!");
    }
    if (onEdit) {
      await axios
        .put(`http://localhost:3001/${onEdit._id}`, {
          title: user.title.value,
          description: user.descriptio.value,
          valor: user.valor.value,
          parcela: user.parcela.value,
        })
        .then(() => {
          toast.success("Dados atualizados com sucesso");
          setOnEdit(null);
        })
        .catch((error) => {
          console.error("Erro ao atualizar:", error);
          toast.error("Erro ao atualizar dados");
        });
    } else {
      await axios
        .post("http://localhost:3001/", {
          title: user.title.value,
          description: user.descriptio.value,
          valor: user.valor.value,
          parcela: user.parcela.value,
        })
        .then(() => {
          toast.success("Tarefa cadastrada com sucesso");
        })
        .catch((error) => {
          console.error("Erro ao cadastrar:", error);
          toast.error("Erro ao cadastrar tarefa");
        });
    }
      user.title.value = "";
      user.descriptio.value = "";
      user.valor.value = "";
      user.parcela.value = "";
      setOnEdit(null);
      getUsers();
  };
  
  return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
              <Label>title</Label>
              <Input name="title"/>
            </InputArea>
            <InputArea>
              <Label>Descrição</Label>
              <Input name="descriptio" type="text"/>
            </InputArea>
            <InputArea>
              <Label>valor</Label>
              <Input name="valor" type="number"/>
            </InputArea>
            <InputArea>
              <Label>Parcela</Label>
              <Input name="parcela" type="number"/>
            </InputArea>
            <Button type="submit">SALVAR</Button>
        </FormContainer>
  );
};

export default Form;