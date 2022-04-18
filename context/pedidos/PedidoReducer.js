import {
    SELECT_CUSTOMER,
    SELECT_PRODUCT,
    PRODUCTS_QUANTIY,
    UPDATE_TOTAL
} from '../../types';

export default ( state, action ) => {
    switch(action.type) {
        case SELECT_CUSTOMER: 
            return {
                ...state,
                client: action.payload
            }
        case  SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCTS_QUANTIY:
            return {
                ...state,
                products: state.products.map( producto => producto.id === action.payload.id ? producto = action.payload : producto )
            }
        case UPDATE_TOTAL:
            return {
                ...state,
                total: state.products.reduce( (nuevoTotal, articulo) => nuevoTotal += articulo.price * articulo.quantity, 0)
            }

        default: 
            return state
    }
}