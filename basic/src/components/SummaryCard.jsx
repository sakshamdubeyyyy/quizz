import React from 'react'

const SummaryCard = ({ title, data, icon }) => {
    return (
        <div className='p-6 m-2 bg-white shadow-lg rounded-2xl flex justify-between items-center w-full max-w-sm hover:shadow-xl transition-all'>
            <div>
                <p className='text-gray-500 text-sm'>{title}</p>
                <h1 className='text-2xl font-bold text-gray-800'>{data}</h1>
            </div>
            <div className='text-4xl'>{icon}</div>
        </div>

    )
}

export default SummaryCard
