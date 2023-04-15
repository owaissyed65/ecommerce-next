import Image from 'next/image'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const CartItem = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src='./product-1.webp' alt='' />
      </div>
      {/* IMAGE END */}
      <div className="w-full flex flex-col ">
        <div className="flex flex-col md:flex-row justify-between">
          {/* product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Jordan Retro G G
          </div>
          {/* product subtitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Men&apos;s Golf Shoe
          </div>
          {/* Product Price */}
          <div className='text-sm md:text-md font-bold text-black/[0.5] mt-2'>
            MRP : &#8377;20000
          </div>
        </div>
        {/* product subtitle */}
        <div className='"text-md font-medium text-black/[0.5] hidden md:block'>
          Men&apos;s Golf Shoe
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select className="hover:text-black cursor-pointer focus:border-none">
                <option>Uk 6</option>
                <option>Uk 6.2</option>
                <option>Uk 6.4</option>
                <option>Uk 6.5</option>
                <option>Uk 6.6</option>
                <option>Uk 6.7</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select className="hover:text-black cursor-pointer focus:border-none">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  )
}

export default CartItem
