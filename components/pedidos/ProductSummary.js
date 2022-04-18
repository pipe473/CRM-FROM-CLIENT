import React from 'react';

const ProductSummary = ({ producto }) => {

    const { nombre,  price } = producto;

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
                />
            </div>
        </div>
     );
}
 
export default ProductSummary;