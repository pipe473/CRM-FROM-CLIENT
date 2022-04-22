import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import ClientAsigned from '../components/pedidos/ClientAsigned';
import AsignProduct from '../components/pedidos/AsignProduct';
import OrderSummary from '../components/pedidos/OrderSummary';
import Total from '../components/pedidos/Total';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

const NUEVO_PEDIDO = gql`
    mutation newOrder($input: OrderInput ) {    
            newOrder(input: $input) {      
            id
        }
    }
`; 


const NuevoPedido = () => {

    const router = useRouter();

    const [ mensaje, setMensaje ] = useState(null);

    // Utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext);

    const { cliente, productos, total } = pedidoContext;

    // console.log(productos);
  

    // Mutation para crear nuevo pedido
    const [ newOrder ] = useMutation( NUEVO_PEDIDO );


    const OrderValidate = () => {
        return !productos.every( producto => producto.quantity > 0 ) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : "   ";
    }

    const createNewOrder = async () => {

        const { id } = cliente;      

        // Remover lo no deseado de 
        const order = productos.map( ({__typename, creado, stock, ...producto} ) => producto )
        // console.log(order);
        

        try {
            const { data } = await newOrder({
                variables: {
                    input: {
                        cliente: id,
                        total: total,
                        order
                    }
                }
            });
            // console.log(data) 

            // Redireccionar 
            router.push('/pedidos');

            // Mostrar alerta
            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente',
                'success'
            )

        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''));
            
            setTimeout(() => {
                setMensaje(null)
            }, 5000);
        }
    }
    
   const mostrarMensaje = () => {
       return (
           <div className="bg-red-300 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
               <p>
                   { mensaje }
               </p>
           </div>
       )
   }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

            { mensaje && mostrarMensaje() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <ClientAsigned />
                <AsignProduct />
                <OrderSummary />
                <Total />

                <button
                    type="button"
                    className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${OrderValidate() }`}
                    onClick={ () => createNewOrder() }
                >Registrar pedido
                </button>
                </div>
            </div>            
        </Layout>
     );
}
 
export default NuevoPedido;