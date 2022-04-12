import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      stock
      price
      creado
    }
  }
`;

const AsignProduct = () => {

    // state local del componente
    const [ productos, setProductos ] = ([]);

    // Consulta a la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    useEffect(() => {
        //TODO: función para pasar a PedidoState 
        console.log(productos);        
    },[productos])

    const seleccionarProducto = producto => {
        setProductos(producto);        
    }
    
    if(loading) return null;

    const { obtenerProductos } = data;

    return ( 
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold ">2. Selecciona o busca los productos</p>
        <Select
            className="mt-3"
            options={ obtenerProductos }
            isMulti={true}
            onChange={ opcion => seleccionarProducto(opcion) }
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => `${opciones.nombre} - ${opciones.stock} Disponibles` }
            placeholder="Buscar o seleccionar un producto"
            noOptionsMessage={() => "No hay resultados..."}
        />
    </>
     );
}
 
export default AsignProduct;