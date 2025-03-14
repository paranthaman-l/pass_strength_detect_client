"use client";
const error = ({ error, reset }) => {
    return (
        <div>
            <h1>Something Bad Occurred</h1>
            <button onClick={()=>reset()}></button>
        </div>
    )
}

export default error