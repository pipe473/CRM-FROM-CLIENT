import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const allClients = [
    { id: 1, nombre: 'Andres' },
    { id: 2, nombre: 'Felipe' },
    { id: 3, nombre: 'Pipe' }
  ]

const ClientAsigned = () => {
    const [ client, setClient ] = useState([]);

    useEffect(() => {
        console.log(client);        
    }, [client])

    const selectClient = clients => {
        setClient(clients);
    }
    return ( 
        <Select
            options={ allClients }
            isMulti={true}
            onChange={ opcion => selectClient(opcion) }
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => opciones.nombre }
            placeholder="Buscar o seleccionar un cliente"
            noOptionsMessage={() => "No hay resultados..."}
        />
     );
}
 
export default ClientAsigned;