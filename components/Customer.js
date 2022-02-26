import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const DELETE_CLIENT = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;

const Customer = ({ customer }) => {
  // Mutation para eliminar cliente
  const [deleteCustomer] = useMutation(DELETE_CLIENT);

  const { nombre, apellido, empresa, email, id } = customer;

  // Eliminar un cliente
  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //  console.log('eliminando', id);
        try {
          // Eliminar por id
          const { data } = await deleteCustomer({
            variables: {
              id
            },
          });
          console.log(data);

          // Mostrar alerta
          Swal.fire("Eliminado!", data.deleteCustomer, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente(id)}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Customer;
