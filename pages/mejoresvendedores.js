import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { gql, useQuery } from '@apollo/client';

const BEST_SELLERS = gql`
    query mejoresVendedores {
        mejoresVendedores {
        vendedor {
            nombre
            email
        }
        total
        }
    }
`;

const MejoresVendedores = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery( BEST_SELLERS );

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

    const { mejoresVendedores } = data;

    const graphSeller = [];

    mejoresVendedores.map((vendedor, index) => {
        graphSeller[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        };
    })

    console.log(graphSeller);
    
    

    return ( 
        <Layout>
             <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
             <ResponsiveContainer width={'99%'} height={550}>
                <BarChart width={600} height={500} data={graphSeller} margin={{top: 5, right:30, left: 20, bottom: 5}}>
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
 
export default MejoresVendedores;