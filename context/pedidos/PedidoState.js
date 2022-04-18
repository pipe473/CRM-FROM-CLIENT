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

    // Modificar el cliente 
    const addClient = client =>{
        // console.log(client);       
        dispatch({
            type: SELECT_CUSTOMER,
            payload: client
        })
    }

    // Modifica los productos
    const addProduct = productosSeleccionados => {

        let nuevoState;
 
        if(state.products.lenght > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map( productoSeleccionado => {
                const newObject = state.products.find( productoState => productoState.id === productoSeleccionado.id )
                return{ ...productoSeleccionado, ...newObject }
            })
        } else {
            nuevoState = productosSeleccionados;
        }       
         dispatch({
             type: SELECT_PRODUCT,
             payload: nuevoState
         })
         // console.log(products);        
     }

    // Modifica las cantidades de los productos
    const quantityProducts = newProduct => {
        dispatch({
            type: PRODUCTS_QUANTIY,
            payload: newProduct
        })     
    }

    return ( 
        <PedidoContext.Provider        
            value={{
                productos: state.products,
                addClient,
                addProduct,
                quantityProducts
            }}
        > {children}
        </PedidoContext.Provider>
     );
}
 
export default PedidoState;
