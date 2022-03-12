import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const EditarProducto = () => {

    const router = useRouter();
    const { query: { id }, } = router;
    // console.log(id);    

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
        </Layout>
     );
}
 
export default EditarProducto;