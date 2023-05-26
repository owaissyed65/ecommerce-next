import ProductDetailCarousel from '@/components/ProductDetailCarousel'
import RelatedProducts from '@/components/RelatedProduct'
import Wrapper from '@/components/Wrapper'
import fetchDataFromApi from '@/utils/api'
import getDiscountedPricePercentage from '@/utils/productpricerange'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
const productDetail = ({ product, products }) => {
    const p = product?.data?.[0]?.attributes;
    return (
        <div className="w-full md:py-20">
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
                            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    uk7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    uk7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    uk7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    uk7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    uk7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50r">
                                    uk7
                                </div>
                            </div>
                            <div className="text-red-600 mt-1">
                                Size selection is required
                            </div>
                            <button
                                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
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
                                <ReactMarkdown>{p.description}</ReactMarkdown> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RelatedProducts products={products}/>
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
