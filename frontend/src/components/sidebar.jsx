import React from 'react';
import { useSocketContext } from '../contexts/socketContext';

const Sidebar = ({ currentUser, users }) => {
    console.log(currentUser)

    const { OnlineUser } = useSocketContext()
    console.log(OnlineUser)

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            {/* Top: Current user */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
                <h2 className="text-xl font-semibold">{currentUser!=null && currentUser}</h2>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-700">
                    {users != null && users.map((items, index) => (
                        <li
                            key={index}
                            className="p-4 hover:bg-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                        >
                            <span className="text-white font-semibold ">{items.name.toUpperCase()}</span>

                            <span className="p-1.5">{OnlineUser.includes(items._id)?<p className='text-green-500'>Online</p>:<p className='text-red-600'>Online</p>}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
