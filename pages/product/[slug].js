import ProductDetailCarousel from '@/components/ProductDetailCarousel'
import Wrapper from '@/components/Wrapper'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
const productDetail = () => {
    return (
        <div className="w-full md:py-20">
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ProductDetailCarousel />
                    </div>
                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            jordan Retro 6 G
                        </div>

                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            Man's Shoe
                        </div>
                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;6000
                            </p>
                            <p className="text-base  font-medium line-through">
                                &#8377;4800
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">

                                20% off
                            </p>
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
                                <div className="markdown text-md mb-5">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident asperiores quae nisi hic vitae explicabo itaque obcaecati natus eos eveniet sequi eum enim sit expedita architecto autem, molestias commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil molestiae quis inventore mollitia ut dolore vero sapiente voluptate, suscipit autem aspernatur illo praesentium temporibus hic molestias nisi est explicabo quidem unde quia excepturi error minima. Esse consequatur quod facere nulla. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, natus nesciunt. Earum possimus, amet voluptatibus sed enim delectus cumque culpa laudantium necessitatibus beatae optio excepturi tenetur ipsa sit atque natus reprehenderit? Minus quas, officia aliquam fugit culpa vel. Pariatur nisi eum harum neque quibusdam atque cum nam, nesciunt accusamus cupiditate?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default productDetail
