import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ClientAsigned from '../components/pedidos/ClientAsigned';
import AsignProduct from '../components/pedidos/AsignProduct';
import OrderSummary from '../components/pedidos/OrderSummary';

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';


const NuevoPedido = () => {

    // Utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext);
    
   
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <ClientAsigned />
                <AsignProduct />
                <OrderSummary />
                </div>
            </div>            
        </Layout>

     );
}
 
export default NuevoPedido;