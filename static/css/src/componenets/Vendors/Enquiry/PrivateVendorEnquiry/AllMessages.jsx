import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const AllMessages = ({ messageStack }) => {
    const [clickQuery, setClickQuery] = useState(false);
    return (
        <div>
            {messageStack.map((message, index) => (
                <div className='p-7 bg-gray-300 text-xs '>
                    <h4>User Name</h4>
                    <div className='flex justify-between'>
                        <h3>First</h3>
                        <h3>Second</h3>
                    </div>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quod?</p>
                </div>
            ))}
        </div>
    )
}

export default AllMessages