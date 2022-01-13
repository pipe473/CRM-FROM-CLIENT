import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

    // routing de next.js
    const router = useRouter();

    // console.log(router.pathname);    

    return ( 
        <aside>
            <div className="bg-gray-800 sm:w-1/1 xl:w-1/1 sm:min-h-screen p-5">
                <p className="text-white text-2xl font-black">CRM Clientes</p>
                <nav className="mt-5 list-none">
                    <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                        <Link href="/">
                        <a className="text-white block">
                        Clientes
                        </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"}>
                        <Link href="/pedidos">                        
                            <a className="text-white block">
                                Pedidos
                        </a>
                        </Link>
                    </li>
                    <li className={router.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"}>
                        <Link href="/productos">                        
                            <a className="text-white block">
                                Productos
                        </a>
                        </Link>
                    </li>
                </nav>
            </div>
        </aside>
     );
}
 
export default Sidebar;