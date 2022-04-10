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
        client: [],
        products: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    const holaMundoEnUserReducer = () => {
        console.log('Hello world');        
    }

    return ( 
        <PedidoContext.Provider        
            value={{
                holaMundoEnUserReducer
            }}
        > {children}
        </PedidoContext.Provider>
     );
}
 
export default PedidoState;
