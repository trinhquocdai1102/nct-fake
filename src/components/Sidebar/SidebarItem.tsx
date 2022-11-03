import React, { FC, MouseEvent } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemType {
    name: string;
    path: string | null;
    icon: Function;
    background?: string;
    child?:
        | {
              name: string;
              path: string;
          }[]
        | null;
}

interface SidebarItemProps {
    item: SidebarItemType;
}

const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
    const handleClickShowChildMenu = (e: MouseEvent, item: SidebarItemType) => {
        if (!item.child) return;

        if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
        } else {
            e.currentTarget.classList.add('active');
        }
    };

    const location = useLocation();

    return (
        <li
            className={`py-2 pl-4 sidebar-parent ${
                item?.path === location.pathname &&
                'bg-gray-200 border-l-cyan-500 border-l-[3px] rounded-sm'
            }`}
            onClick={(e) => handleClickShowChildMenu(e, item)}
        >
            <Link
                to={item.path ? item.path : '#'}
                className='flex items-center justify-between'
            >
                <div
                    className='flex items-center font-semibold'
                    style={{ color: item.background }}
                >
                    <item.icon className={`w-4 h-4 mr-2`} />
                    <span className='text-black font-normal'>{item.name}</span>
                </div>
                {item.child && (
                    <span>
                        <FiChevronDown className='w-4 h-4 mr-4 text-[rgba(28,30,32,0.8)]' />
                    </span>
                )}
            </Link>

            {item.child && (
                <ul
                    className='mt-2 sidebar-child'
                    onClick={(e) => e.stopPropagation()}
                >
                    {item.child?.map((p) => (
                        <li
                            onClick={(e) => e.stopPropagation()}
                            key={p.name}
                            className={`${
                                location.pathname === p.path &&
                                'bg-gray-200 rounded-sm'
                            }`}
                        >
                            <Link
                                className={`pl-[28%] line py-[6px] w-full flex items-center text-zinc-500`}
                                to={p.path}
                            >
                                <div className='dot'></div>
                                {p.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarItem;
