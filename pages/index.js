import Layout from '../components/Layout';
import Customer from '../components/Customer';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_CLIENTS_USER = gql`
  query getCustomerSeller {
    getCustomerSeller {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Index = () => {

const router = useRouter();

// Consulta de Apollo
const { data, loading, error } = useQuery(GET_CLIENTS_USER);

// console.log(data);
// console.log(loading);
// console.log(error);

if (loading) return 'Cargando...';

// console.log(data.getCustomerSeller+'prueba carga');

 // Si no hay información
 if(!data.getCustomerSeller) {
  return router.push('/login');
}




  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevoCliente">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Cliente</a>
        </Link>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.getCustomerSeller.map(customer => (
            <Customer 
              key={customer.id}
              customer={customer}
            />
          ))}
        </tbody>
      </table>
      </Layout>
    </div>
  )
}

export default Index;
