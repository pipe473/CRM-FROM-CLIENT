import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql`
  mutation newCustomer($input: CustomerInput){
    newCustomer (input: $input){
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

const GET_CLIENTS_USER = gql`
  query getCustomerSeller {
    getCustomerSeller {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const nuevoCliente = () => {

  const router = useRouter();

// Mutation para crear nuevos clientes

const [ newCustomer ] = useMutation( NUEVO_CLIENTE, {
  update(cache, { data: { newCustomer }}){
    // Obtener el objeto de cache que deseamos actualizar
    const {  getCustomerSeller } = cache.readQuery({ query: GET_CLIENTS_USER });

    // Reescribimos el cache( el cache nunca se debe modificar )
    cache.writeQuery({
      query: GET_CLIENTS_USER,
      data: {
        getCustomerSeller : [ ...getCustomerSeller, newCustomer ]
      }
    })
  }
} )

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del cliente es obligatorio"),
      apellido: Yup.string().required("El apellido del cliente es obligatorio"),
      empresa: Yup.string().required("El campo empresa es obligatorio"),
      email: Yup.string()
        .email("Email inválido")
        .required("El email del cliente es obligatorio"),
    }),
    onSubmit: async values => {
      // console.log(valores);

      const { nombre, apellido, empresa, email, telefono } = values;

      try {
        const { data } = await newCustomer({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono
            }
          }
        });
        // console.log(data.newCustomer);      
        router.push('/');  // Redireccionar hacia clientes
      } catch (error) {
        console.log(error);        
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form 
                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
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
                placeholder="Nombre Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Apellido Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.apellido}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="empresa"
                type="text"
                placeholder="Empresa Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
            </div>

            {formik.touched.empresa && formik.errors.empresa ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.empresa}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Empresa Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>
              <input
                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="text"
                placeholder="Teléfono Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>

            {formik.touched.telefono && formik.errors.telefono ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.telefono}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoCliente;
