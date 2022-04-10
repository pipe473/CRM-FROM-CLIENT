import React from 'react';
import Layout from '../components/Layout';
import ClientAsigned from '../components/pedidos/ClientAsigned';


const NuevoPedido = () => {
   
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

            <ClientAsigned />
            <ClientAsigned />
            <ClientAsigned />
        </Layout>

     );
}
 
export default NuevoPedido;