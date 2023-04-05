import React from 'react'

const Wrapper = ({ children, className }) => {
    return (
        <div className={`w-full max-w-[1280px] mx-auto px-5 md:px-10 ${className || ""}`}>
            {children}
        </div>
    )
}

export default Wrapper
