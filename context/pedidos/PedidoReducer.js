import {
    SELECT_CUSTOMER,
    SELECT_PRODUCT,
    PRODUCTS_QUANTIY
} from '../../types';

export default ( state, action ) => {
    switch(action.type) {
        case SELECT_CUSTOMER: 
            return {
                ...state,
                client: action.payload
            }

        default: 
            return state
    }
}