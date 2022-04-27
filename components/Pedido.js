import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import Swal from "sweetalert2";


const ACTUALIZAR_PEDIDO = gql`
    mutation updateOrder($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input ){
        estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql `
    mutation deleteOrder($id: ID!) {
        deleteOrder(id: $id)
    }
`;

const OBTENER_PEDIDOS = gql`
  query getOrdersBySeller {
    getOrdersBySeller {
      id
    }
  }
`;


const Pedido = ({ order }) => {

    const { id, total, cliente: { nombre, apellido, telefono, email }, estado, cliente } = order;

    console.log(cliente.id);
    

    // Mutation para cambiar el estado de un pedido
    const [ updateOrder ] = useMutation(ACTUALIZAR_PEDIDO);

    const [ deleteOrder ] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            const { getOrdersBySeller } = cache.readQuery({
                query: OBTENER_PEDIDOS
            });

            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    getOrdersBySeller: getOrdersBySeller.filter( order => order.id !== id )
                }
            })
        }
    });

    console.log(order);    

    const [ estadoPedido, setEstadoPedido  ]= useState(estado);
    const [ clase, setClase  ]= useState('');
    
    useEffect(() => {
        if(estadoPedido) {
          setEstadoPedido(estadoPedido);
        }
        clasePedido();
    }, [ estadoPedido ]);

    // console.log(estadoPedido);

    // Función que modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500')
        } else if (estadoPedido === 'COMPLETE') {
            setClase('border-green-500')
        } else {
            setClase('border-red-800')
        }
    }    

    const orderStateChanged = async newState => {
       try {
           const { data } = await updateOrder({
               variables: {
                   id,
                   input: {
                    estado: newState,
                    cliente: cliente.id
                   }
               }
           });
           setEstadoPedido(data.updateOrder.estado);           
       } catch (error) {
           console.log(error);           
       }     
    } 

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: "¿Deseas eliminar este pedido?",
            text: "Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "No, cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = await deleteOrder({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado',
                        data.deleteOrder,
                        'success'
                    )
                } catch (error) {
                    console.log(error);                    
                }
            }
          });
    }

    return ( 
       <div className={` ${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
           <div>
                <p className="font-bold text-gray-800">Cliente: { nombre } { apellido }</p>

                { email && (
                    <p className="flex items-center my-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"  
                            className="h-4 w-4 mr-2" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                            />
                        </svg>
                        { email }
                    </p>
                ) }

                { telefono && (
                     <p className="flex items-center my-2">
                     <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-2" fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                     >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                    </svg>
                     { telefono }
                 </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Estado pedido:</h2>

                <select
                className="mt-2 appearance-none bg-blue-600 border border-blue text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                value={estadoPedido}
                onChange={ e => orderStateChanged( e.target.value ) }
                >
                 <option value="COMPLETE">COMPLETADO</option>
                 <option value="PENDIENTE">PENDIENTE</option>
                 <option value="CANCELED">CANCELED</option>
                </select>
           </div>
           <div>
                <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
                { order.order.map( articulo => (
                    <div key={articulo.id}>
                        <p className="mt-2 text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="mt-2 text-sm text-gray-600">Cantidad: {articulo.quantity}</p>
                    </div>
                ) ) }

                <p className="text-gray-800 mt-3 font-bold">Total a pagar:
                    <span className="font-light"> {total}€</span>
                </p>
                <button
                    className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={ () => confirmarEliminarPedido() }
                >
                    Eliminar pedido
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
           </div>
       </div>
     );
}
 
export default Pedido;