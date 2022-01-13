import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return ( 
        <aside>
            <div className="bg-gray-800 sm:w-1/1 xl:w-1/1 sm:min-h-screen p-5">
                <p className="text-white text-2xl font-black">CRM Clientes</p>
            <nav className="mt-5 list-none">
                <li>
                    <Link href="/">
                       <a className="text-white mb-2 block">
                       Clientes
                       </a>
                    </Link>
                </li>
                <li>
                    <Link href="/pedidos">                        
                        <a className="text-white mb-2 block">
                            Pedidos
                       </a>
                    </Link>
                </li>
            </nav>
            </div>
        </aside>
     );
}
 
export default Sidebar;