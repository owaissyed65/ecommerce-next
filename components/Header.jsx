import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import { IoMdHeartEmpty } from 'react-icons/io'
import { BsCart } from 'react-icons/bs'
import { BiMenuAltRight } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'
import MobileMenu from "./MobileMenu";
const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState('translate-y-0');
    const [lastScroll, setLastScroll] = useState(0);
    const controlNavbar = () => {
        if (window.scrollY > 200 ) {
            if (window.scrollY > lastScroll && !mobileMenu) {
              
                setShow('-translate-y-[80px] ')
            }
            else {
                setShow('shadow-sm')
            }
        }
        else {
            setShow('translate-y-0')
        }
        setLastScroll(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScroll])
    return (
        <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between sticky top-0 transition-transform duration-500 ${show} relative z-20 shadow-sm`}>
            <Wrapper className='flex justify-between h-[60px] items-center '>
                <Link href='/'>
                    <img src="/logo.svg" alt="" className="w-[40px] md:w-[60px]" />
                </Link>
                <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />
                {mobileMenu && <MobileMenu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} setMobileMenu={setMobileMenu} />}

                {/* <Menu/> */}
                <div className="flex gap-2 text-black items-center">
                    {/* icons start */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center relative items-center cursor-pointer hover:bg-black/[0.05]">
                        <IoMdHeartEmpty className="text-[15px] md:text-[24px] cursor-pointer" />
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full flex justify-center items-center px-[2px] md:px-[5px] text-white text-[10px] md:text-[12px] bg-red-700 absolute top-0 right-[8%]" >51</div>
                    </div>
                    <Link href="/cart">
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center relative items-center cursor-pointer hover:bg-black/[0.05]">
                        <BsCart className="text-[15px] md:text-[20px] cursor-pointer" />
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full flex justify-center items-center px-[2px] md:px-[5px] text-white text-[10px] md:text-[12px] bg-red-700 absolute top-0 right-[8%]">5</div>
                    </div>
                    </Link>
                    {/* icons end */}
                    {/* Icons for mobile */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center relative items-center cursor-pointer hover:bg-black/[0.05] md:hidden" onClick={() => { !mobileMenu ? setMobileMenu(true) : setMobileMenu(false) }}>

                        {!!mobileMenu ?
                            (<VscChromeClose className="text-[20px] cursor-pointer " />) : (
                                <BiMenuAltRight className="text-[20px] cursor-pointer " />
                            )}


                    </div>
                </div>
            </Wrapper>
        </header>
    )
};

export default Header;
