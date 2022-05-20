import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { gql, useQuery } from '@apollo/client';

const BEST_CUSTOMERS = gql`
    query mejoresClientes {
        mejoresClientes {
        cliente {
            nombre
            empresa
        }
        total
        }
    }
`;

const MejoresClientes = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery( BEST_CUSTOMERS );

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [ startPolling, stopPolling ])

    // console.log(loading);
    // console.log(error);  
    
    if(loading) return 'cargando...';
    console.log(data);

    const { mejoresClientes } = data;

    const graphCustomer = [];

    mejoresClientes.map((cliente, index) => {
        graphCustomer[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        };
    });
    
    

    return ( 
        <Layout>
             <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>
             <ResponsiveContainer width={'99%'} height={550}>
                <BarChart width={600} height={500} data={graphCustomer} margin={{top: 5, right:30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
        </Layout>
     );
}
 
export default MejoresClientes;