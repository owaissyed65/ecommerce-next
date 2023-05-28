import ProductDetailCarousel from '@/components/ProductDetailCarousel'
import RelatedProducts from '@/components/RelatedProduct'
import Wrapper from '@/components/Wrapper'
import { addToCart } from '@/store/slice/cartSlice'
import fetchDataFromApi from '@/utils/api'
import getDiscountedPricePercentage from '@/utils/productpricerange'
import React from 'react'
import { useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productDetail = ({ product, products }) => {

    const p = product?.data?.[0]?.attributes;
    const [selectedSize, setSelectedSize] = useState(null)
    const [ShowError, setError] = useState(false)
    const dispatch = useDispatch()
    const notify = (term, msg) => {
        toast.success(`${term}: ${msg}`, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailCarousel images={p.image.data} />
                    </div>
                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>

                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div>
                        {/* PRODUCT PRICE */}
                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>
                        {/* PRODUCT SIZE RANGE START */}
                        <div className="mb-10">
                            {/* HEADING START */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>
                            {/* HEADING END */}
                            {/* SIZE START */}
                            <div id="gridSize" className="grid grid-cols-3 gap-2 ">
                                {p?.size?.data?.map((item, id) => {
                                    return (
                                        <div key={id} className={`border rounded-md text-center py-3 font-medium 
                                    ${item?.enabled ? 'hover:border-black cursor-pointer' : 'cursor-not-allowed bg-black/50 opacity-50'} ${selectedSize === item?.size && item?.enabled ? `border-black` : ''}`} onClick={() => {
                                                item?.enabled ? setSelectedSize(() => item.size) : setSelectedSize(() => null)
                                                if (item?.enabled) {
                                                    setError(false)
                                                } else {
                                                    setError(true)
                                                    document.getElementById('gridSize').scrollIntoView({
                                                        block: 'center',
                                                        behavior: 'smooth'
                                                    })
                                                }

                                            }}>
                                            {item.size}
                                        </div>
                                    )
                                })}
                            </div>
                            {ShowError && <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>}
                            <button
                                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-5"
                                onClick={() => {
                                    if (!selectedSize) {
                                        setError(true)
                                        document.getElementById('gridSize').scrollIntoView({
                                            block: 'center',
                                            behavior: 'smooth'
                                        })
                                    }
                                    else {
                                        setError(false)
                                        notify("Success", `${p.name} has been added in cart 😊`)
                                        dispatch(addToCart({
                                            ...product?.data?.[0],
                                            size: [{ selectedSize }],
                                            oneQuantityPrice: p?.price,
                                        }))
                                    }
                                }}
                            >
                                Add to Cart
                            </button>
                            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 relative before:w-0 before:h-[100%] before:rounded-full before:absolute before:transition-all hover:before:w-full before:left-0 before:duration-500 hover:before:bg-black/30
                             mb-10 ">
                                Whishlist
                                <IoMdHeartEmpty size={20} />
                            </button>
                            <div>
                                <div className="text-lg font-bold mb-5">
                                    Product Details
                                </div>
                                <div className="markdown text-md mb-5" >
                                    <ReactMarkdown>{p?.description}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RelatedProducts products={products} />
            </Wrapper>
        </div>
    )
}

export default productDetail
export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {

    const product = await fetchDataFromApi(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products,
        },
    };
}
