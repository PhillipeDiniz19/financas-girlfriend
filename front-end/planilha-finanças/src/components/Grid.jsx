
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item)
  }


  const handleDelete = async (id) => {
    await axios
    .delete("http://localhost:3001/" + id)
    .then(({data}) => {
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(data)
    })
    setOnEdit(null)
  }
  

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Titulo</Th>
          <Th>Descrição</Th>
          <Th>Valor</Th>
          <Th>Parcela</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.title}</Td>
            <Td width="30%">{item.descriptio}</Td>
            <Td width="20%">{item.valor}</Td>
            <Td width="10%">{item.parcela}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)}/>
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;