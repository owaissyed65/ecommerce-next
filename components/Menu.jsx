import Link from 'next/link';
import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
const Menu = ({ showCatMenu, setShowCatMenu }) => {
    const data = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "About", url: "/about" },
        { id: 3, name: "Categories", subMenu: true },
        { id: 4, name: "Contact", url: "/contact" },
    ];

    const subMenuData = [
        { id: 1, name: "Jordan", doc_count: 11 },
        { id: 2, name: "Sneakers", doc_count: 8 },
        { id: 3, name: "Running shoes", doc_count: 64 },
        { id: 4, name: "Football shoes", doc_count: 107 },
    ];
    return (
        <ul className='hidden md:flex gap-9 items-center text-black font-medium '>
            {
                data.map((curEle) => {
                    return (
                        <React.Fragment key={curEle.id}>
                            {
                                curEle.subMenu ? (
                                    <li className='flex cursor-pointer relative gap-1' onMouseEnter={() => setShowCatMenu(true)} onClick={() => { !showCatMenu ? setShowCatMenu(true) : setShowCatMenu(false) }}> {curEle.name}

                                        <RiArrowDropDownLine size={20} />

                                        {showCatMenu && <ul className=' flex flex-col font-medium absolute top-8 whitespace-nowrap shadow-lg min-w-[250px] px-1 py-1 bg-white' onMouseLeave={() => setShowCatMenu(false)}>
                                            {subMenuData.map((data) => {
                                                return <Link href='/' className='px-1 py-2 hover:text-black hover:bg-black/10  ' key={data.id}><li className="flex justify-between gap-[6px] text-sm  " >{data.name} <span className='text-black/60'>{data.doc_count}</span></li> </Link>
                                            })}
                                        </ul>
                                        }
                                    </li>

                                ) : (
                                    <li key={curEle.id}>
                                        <Link href={curEle.url} className='transition duration-300 hover:text-black/75 relative after:absolute after:bottom-[-5px] after:left-0 overflow-hidden after:transition-all after:w-0 after:h-[3px] after:duration-500 after:bg-black/25 hover:after:w-full'>{curEle.name}</Link>
                                    </li>
                                )
                            }
                        </React.Fragment >
                    )
                })
            }

        </ul >
    )
}

export default Menu
