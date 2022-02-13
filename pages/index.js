import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

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

console.log(data);
console.log(loading);
console.log(error);

if (loading) return 'Cargando...';

 // Si no hay información
 if(!data.getCustomerSeller) {
  return router.push('/login');
}


  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>


      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.getCustomerSeller.map(cliente => (
            <tr key={cliente.id}>
              <td className="border px-4 py-2">
                {cliente.nombre} {cliente.apellido}
              </td>
              <td className="border px-4 py-2">
                {cliente.empresa}
              </td>
              <td className="border px-4 py-2">
                {cliente.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Layout>
    </div>
  )
}

export default Index;
