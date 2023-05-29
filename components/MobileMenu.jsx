import Link from 'next/link';
import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
const MobileMenu = ({ showCatMenu, setShowCatMenu, setMobileMenu ,category,mobileMenu}) => {
    const data = [
        { id: 1, name: "Home", url: "/" },
        { id: 2, name: "About", url: "/about" },
        { id: 3, name: "Categories", subMenu: true },
        { id: 4, name: "Contact", url: "/contact" },
    ];
    const capitalizeFirstLetter = (name) =>{
        let upperCase = name?.toUpperCase()
        return upperCase.slice(0,1) + name.slice(1)
    }
    const subMenuData = [
        { id: 1, name: "Jordan", doc_count: 11 },
        { id: 2, name: "Sneakers", doc_count: 8 },
        { id: 3, name: "Running shoes", doc_count: 64 },
        { id: 4, name: "Football shoes", doc_count: 107 },
    ];
    return (
        <ul className='md:hidden flex w-full absolute top-[50px] flex-col gap-2 bg-white left-0  transition  h-[calc(100vh-50px)] px-2 duration-500 border-t'>
            {
                data.map((curEle) => {
                    return (
                        <React.Fragment key={curEle.id}>
                            {
                                !!curEle?.subMenu ? (
                                    <li className='cursor-pointer px-5 py-4 border-b flex flex-col' onClick={() => setShowCatMenu(!showCatMenu)}>
                                        <div className='flex justify-between'>
                                            {curEle.name}
                                            <RiArrowDropDownLine size={20} />
                                        </div>

                                        {showCatMenu && <ul className='bg-black/[0.05] -mx-5 mt-4 -mb-4'>
                                            {category.map(({attributes:c,id}) => {
                                                return (
                                                    <Link href={`/category/${c?.slug}`}  key={id} className='px-1 py-2 hover:text-black hover:bg-black/10 ' onClick={()=>setMobileMenu(false)}>
                                                        <li className="py-2 px-8 border-t flex justify-between">{capitalizeFirstLetter(c?.name)}
                                                            <span className='text-black/60'>({c?.products?.data?.length})</span>
                                                        </li>
                                                    </Link>)
                                            })}
                                        </ul>
                                        }
                                    </li>

                                ) : (
                                    <li key={curEle.id} className="w-full border-b  px-5 py-4">
                                        <Link href={curEle.url} onClick={()=>setMobileMenu(false)}>{curEle.name}</Link>
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

export default MobileMenu
