import React, { useContext, useState, useEffect } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const ProductSummary = ({ producto }) => {

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext);  
    const { quantityProducts } = pedidoContext;


    const [ summaryQty, setQty ] = useState(0);

    const { nombre,  price } = producto;

    useEffect(() => {
        updateQty();
    }, [ summaryQty ])

    const updateQty = () => {
        const newProduct = {...producto, quantity: Number( summaryQty )}
        quantityProducts(newProduct);
        
    }

    return ( 
        <div className="flex justify-center mt-5">
            <div className="flex justify-between w-full max-w-lg">
                <p className="text-sm w-full">
                    {nombre}
                </p>
                <p className="w-full">
                    {price}€
                </p>
                <input 
                    type="number"
                    placeholder="Cantidad"
                    className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                    onChange={ e => setQty(e.target.value) }
                    value={summaryQty}
                />
            </div>
        </div>
     );
}
 
export default ProductSummary;