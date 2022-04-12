import React, { useReducer, Children } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECT_CUSTOMER,
    SELECT_PRODUCT,
    PRODUCTS_QUANTIY
} from '../../types'

const PedidoState = ({children}) => {

    // state de Pedidos
    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    //Modificar el cliente 
    const addClient = client =>{
        // console.log(client);       
        dispatch({
            type: SELECT_CUSTOMER,
            payload: client
        })
    }

    return ( 
        <PedidoContext.Provider        
            value={{
                addClient
            }}
        > {children}
        </PedidoContext.Provider>
     );
}
 
export default PedidoState;
