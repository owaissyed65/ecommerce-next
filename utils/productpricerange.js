const getDiscountedPricePercentage = (originalPrice, price) => {
    if (originalPrice > price) {
        const discount = originalPrice - price
        const discountPercent = (discount / originalPrice) * 100
        return discountPercent.toFixed(2)
    }
    else {
        const org = originalPrice * 10
        const discount = org - price
        const discountPercent = (discount / org) * 100
        return discountPercent.toFixed(2)
    }
    
}
export default getDiscountedPricePercentage