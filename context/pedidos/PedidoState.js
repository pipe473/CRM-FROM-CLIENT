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

    // Modifica los productos
    const addProduct = products => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: products
        })
        console.log(products);        
    }

    return ( 
        <PedidoContext.Provider        
            value={{
                addClient,
                addProduct
            }}
        > {children}
        </PedidoContext.Provider>
     );
}
 
export default PedidoState;
