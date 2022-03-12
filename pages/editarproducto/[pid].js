import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const EditarProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // console.log(id);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            // onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Producto"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.nombre}
              />
            </div>
            {/* {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock Disponible
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="number"
                placeholder="Cantidad Disponible"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.stock}
              />
            </div>
            {/* {formik.touched.stock && formik.errors.stock ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.stock}</p>
              </div>
            ) : null} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Precio Producto"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.price}
              />
            </div>
            {/* {formik.touched.price && formik.errors.price ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null} */}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Guardar cambios"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarProducto;
