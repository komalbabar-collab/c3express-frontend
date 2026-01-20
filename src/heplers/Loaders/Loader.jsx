import React from 'react'

const Loader = ({ small = false }) => {
    return (
        <div className="loader animation-start">
            <div id="loader2">
                <span className="circle delay-1 size-2" />
                <span className="circle delay-2 size-4" />
                <span className="circle delay-3 size-6" />
                <span className="circle delay-4 size-7" />
                <span className="circle delay-5 size-7" />
                <span className="circle delay-6 size-6" />
                <span className="circle delay-7 size-4" />
                <span className="circle delay-8 size-2" />
            </div>
        </div>
    )
}

export default Loader