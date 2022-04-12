import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const GET_CLIENTS_USER = gql`
  query getCustomerSeller {
    getCustomerSeller {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const ClientAsigned = () => {

    const [ client, setClient ] = useState([]);

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    // console.log(pedidoContext);

    const { addClient } = pedidoContext;
    

    // Consultar la base de datos
    const { data, loading, error } = useQuery(GET_CLIENTS_USER);

    // console.log(data);
    // console.log(loading);
    // console.log(error);       
    

    useEffect(() => {
        // console.log(client);       
        addClient(client); 
    }, [client])

    const selectClient = clients => {
        setClient(clients);
    }

    // Resultados de la consulta
    if(loading) return null;

    const { getCustomerSeller } = data;

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold ">1. Asigna un cliente al pedido</p>
            <Select
                className="mt-3"
                options={ getCustomerSeller }
                // isMulti={true}
                onChange={ opcion => selectClient(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => opciones.nombre }
                placeholder="Buscar o seleccionar un cliente"
                noOptionsMessage={() => "No hay resultados..."}
            />
        </>
     );
}
 
export default ClientAsigned;