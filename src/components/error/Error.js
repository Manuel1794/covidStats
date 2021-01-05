import React from 'react'

const Error = ({error}) => {
    return (
        <div>
            <p style={{color:'red'}}>{error}</p>
        </div>
    )
}

export default Error