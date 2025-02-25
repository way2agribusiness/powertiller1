import React, { useState } from 'react';
import OnFarmServiceForm from '../OnFarmServiceAdd';
const Card = ({ serviceImage, title, info }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleServiceClick = () => {
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    }
 
    return (
        <div>

            <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={serviceImage} alt={title} />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    </a>
                    <p className="mb-4 text-gray-700 dark:text-gray-400 text-justify text-sm">
                        {info}
                    </p>
                    <button
                        onClick={handleServiceClick}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Add
                        <svg
                            className="w-4 h-4 ml-1 rtl:rotate-180"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4C12.5523 4 13 4.44771 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44771 11.4477 4 12 4Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0  flex items-center justify-center z-100 bg-black bg-opacity-40 ">
                    <div className="max-w-md h-100 bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                           
                            
                        </div>
                        <OnFarmServiceForm serviceNameFinal={title}  />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Card;
