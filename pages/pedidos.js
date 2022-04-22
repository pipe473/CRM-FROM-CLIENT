import Layout from '../components/Layout';
import Pedido from '../components/Pedido';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';


const OBTENER_PEDIDOS = gql`
  query getOrdersBySeller {
    getOrdersBySeller {
      id
      order {
        id
        quantity
        nombre
      }
      cliente {
        nombre
        apellido
        empresa
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;

const Pedidos = () => {

const { data, loading, error } = useQuery( OBTENER_PEDIDOS );

if(loading) return 'Cargando...';

const { getOrdersBySeller } = data;

  return (
    <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
  
          <Link href="/nuevopedido">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Pedido</a>
          </Link>
          { getOrdersBySeller.length === 0 ? (
            <p className="bg-yellow-300 mt-5 text-center text-2xl py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">No hay pedidos aún</p>
          ) : (
            getOrdersBySeller.map( order => (
              <Pedido 
                key={order.id}
                order={order}
              />
            ))
          ) }
      </Layout>
    </div>
  )
}

export default Pedidos;
