import React from 'react'

const ErrorComponent = ({message}) => {
    return (
        <div className="error text-danger text-center mb-3 mt-3">
         {message}
        </div>
    )
}

export default ErrorComponent