import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import {  Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_PRODUCT = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      nombre
      price
      stock
    }
  }
`;

const UPDATE_PRODUCTS = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput){
  actualizarProducto(id :$id, input: $input){
      id
      nombre
      stock
      price
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // console.log(id);

  // Consulta para obtener producto
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const [ actualizarProducto ] = useMutation(UPDATE_PRODUCTS);

  // Schema de validación
  const schemaValidation = Yup.object({
    nombre: Yup.string()
            .required('El nombre del producto es obligatorio'),
    stock: Yup.number()
              .required('Añade la cantidad disponible')
              .positive('No se aceptan números negativos')
              .integer('El stock debe ser con números enteros'),
    price: Yup.number()
                .required('El precio es obligatorio')
                .positive('No se aceptan números negativos')
})

//   console.log(data);
//   console.log(loading);
//   console.log(error);

  if (loading) return "Cargando...";

  if(!data) return "Acción no permitida!!"

  const updateInfoProduct = async values => {
    // console.log(values);    
    const { nombre, stock, price } = values;

    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            stock,
            price
          }
        }
      })

      // console.log(data);

      // Redirigir hacia productos
      router.push('/productos');

      // Mostrar alerta
      Swal.fire(
        'Correcto',
        'Producto actualizado correctamente!!',
        'success'
      )
      
      
    } catch (error) {
      console.log(error);      
    }

  }

    const { getProductById } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={getProductById}
            validationSchema={ schemaValidation }
            onSubmit={ dataValues => {
              updateInfoProduct(dataValues)
            } }
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                  </div>
                  {props.touched.nombre && props.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{props.errors.nombre}</p>
              </div>
            ) : null}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.stock}
                    />
                  </div>
                  {props.touched.stock && props.errors.stock ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{props.errors.stock}</p>
              </div>
            ) : null}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.price}
                    />
                  </div>
                  {props.touched.price && props.errors.price ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{props.errors.price}</p>
              </div>
            ) : null}
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Guardar cambios"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarProducto;
