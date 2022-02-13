import React from 'react';
import { useQuery, gql } from '@apollo/client';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    // query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);
    console.log(data);
    console.log(loading);
    console.log(error);      

    // Proteger que no accedamos a data sin tener datos cargados
    if(loading) return null;

    const { nombre, apellido } = data.obtenerUsuario;

    return ( 
        <div className="flex justify-between mb-6">
            <div className="justify-start">
            <p className="mr-2">Hola: { nombre } { apellido }</p>
            </div>
            <div className="justify-end">
                <button type="button">
                    Cerrar Sesión
                </button>
            </div>
        </div>
     );
}
 
export default Header;