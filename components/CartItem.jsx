import Image from 'next/image'
import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { GrSubtract } from 'react-icons/gr'
import { removeCart, updateCart } from '@/store/slice/cartSlice'
import { useDispatch } from 'react-redux'
const CartItem = ({ data, cart }) => {
  const dispatch = useDispatch()
  const p = data?.attributes;
  // find the value
  const individualPrice = cart?.totalPrice?.find((val) => val.slug === p.slug);
  let productSizeQuantity = data?.size?.find((val) => val.selectedSize === data?.size?.[0]?.selectedSize)
  // state
  const [size, setSize] = useState({ ...productSizeQuantity })
  const [quant, setQuant] = useState(productSizeQuantity?.quantityProd);
  // function
  const getValue = (e) => {
    productSizeQuantity = data?.size?.find((val) => val.selectedSize === e.target.value)
    setSize({ ...size, ...productSizeQuantity })
    setQuant(productSizeQuantity?.quantityProd)
  }
  const increment = () => {
    dispatch(updateCart({ type: "inc", slug: p?.slug, size }))
    setQuant(quant + 1)
  }
  const decrement = () => {
    dispatch(updateCart({ type: "dec", slug: p?.slug, size }))
    setQuant(quant > 1 ? quant - 1 : quant)
  }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image src={p?.thumbnail?.data?.attributes?.url} alt='' width={200} height={200} />
      </div>
      {/* IMAGE END */}
      <div className="w-full flex flex-col ">
        <div className="flex flex-col md:flex-row justify-between">
          {/* product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p?.name}
          </div>
          {/* product subtitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p?.subtitle}
          </div>
          {/* Product Price */}
          <div className='text-sm md:text-md font-bold text-black/[0.5] mt-2'>
            MRP : {individualPrice?.finalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}
          </div>
        </div>
        {/* product subtitle */}
        <div className='"text-md font-medium text-black/[0.5] hidden md:block'>
          {p?.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select className="hover:text-black cursor-pointer focus:border-none" onChange={e => getValue(e)}>
                {data?.size?.map((curEle, i) => {
                  return <option key={i} value={curEle.selectedSize}>{curEle.selectedSize}</option>
                })}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <div className="flex gap-2">
                <span><GrSubtract className="cursor-pointer text-black/[0.5] hover:text-black text-[16px]" onClick={decrement} /></span>
                <span className='text-[16px] font-bold'>{quant}</span>
                <span><GrAdd className="cursor-pointer text-black/[0.5] hover:text-black text-[16px]" onClick={increment} /></span>
              </div>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" onClick={() => dispatch(removeCart(p?.slug))} />
        </div>
      </div>
    </div>
  )
}

export default CartItem
