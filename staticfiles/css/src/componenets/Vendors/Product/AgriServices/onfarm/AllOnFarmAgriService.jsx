import React from 'react'
import Card from './onfarmCard/Card.jsx'
const AllOnFarmAgriService = () => {
    const cardData = [
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322484/pro/ozkimkfb416rybarndnd.jpg",
            title: "Cultivation Type",
            info: "Discover various farming methods employed in Karnataka's agricultural landscape, including open cultivation, greenhouse farming, and other innovative techniques."
        },
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322484/pro/fmxqg0yga3d6ywuysril.jpg",
            title: "Service Type",
            info: "Here is the information about the Farm Size. Farm management, Crop selection, Nutrients & pests. "
        },
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322484/pro/qilbmd7w1sron7sueeya.jpg",
            title: "Farm Size",
            info: "Here is the information about the Farm Size. Big, Medium, Small."
        },
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322483/pro/xgfhaqpsfokv1nju4pce.jpg",
            title: "Crop Type",
            info: "Here is the information about the Crop type. Vegetables, Fruits, Flowers, Other field crops, Perennial crops."
        },
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322484/pro/c9aptkb4n07ltzelrkkb.jpg",
            title: "Irrigation",
            info: "Here is the information about the Irrigation. Drip, Sprinkler, others."
        },
        {
            serviceImage: "https://res.cloudinary.com/dq7vggsop/image/upload/v1717322485/pro/a0qz79fctp7ihuc8vqjq.jpg",
            title: "Allied Activities",
            info: "Here is the information about the Allied Activities. Dairy, Goat, Poultry, Apiculture."
        },

    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    serviceImage={card.serviceImage}
                    title={card.title}
                    info={card.info}
                />
            ))}
        </div>
    )
}

export default AllOnFarmAgriService