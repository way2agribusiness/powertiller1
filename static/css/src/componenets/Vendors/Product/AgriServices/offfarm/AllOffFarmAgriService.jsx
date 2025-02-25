import React from 'react'
import Card from './offFarmCard/Card'

function AllOffFarmAgriService() {
  const farmData = [
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416211/z4lbwbjbnqywxxc1diyf.jpg',
      title: 'Detail Project Report',
      info: 'A comprehensive document outlining your proposed agricultural project. It includes feasibility studies, resource requirements, production plans, financial projections, and risk assessments. A well-prepared DPR is crucial for securing loans, grants, and attracting investors.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416188/iwcqh3k5qxraosednwxk.jpg',
      title: 'Crop Selection',
      info: 'Choosing the right crops is critical for success. Consider factors like climate, soil conditions, water availability, market demand, government support, intercropping opportunities, and your farming experience.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416320/bvqlsi0tz0u0pcxjtw2k.jpg',
      title: 'Technology Identificaion',
      info: 'Modern technologies can significantly improve productivity and efficiency. Options include precision agriculture, irrigation technologies, farm machinery, renewable energy solutions, and post-harvest technologies. Identifying and adopting appropriate technologies can optimize resource use and increase yield.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416154/u9bnnqal0q6ab2qiug4l.jpg',
      title: 'Bank Funding',
      info: 'Several loan schemes support agricultural activities in India. Explore options like Kisan Credit Card (KCC) for short-term loans, Priority Sector Lending (PSL) for agriculture, and government-sponsored loan schemes for specific crops or projects. Understanding loan options, eligibility criteria, and interest rates is essential.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416643/nhunleogub6utxisazxr.jpg',
      title: 'Govt. Subsidies',
      info: 'The Indian government offers various subsidies to promote agriculture and support farmers. These may include input subsidies on seeds, fertilizers, and pesticides, interest subvention on agricultural loans, machinery and equipment subsidies, soil health cards, and crop insurance schemes. Knowing these subsidies can help reduce costs and improve income.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416301/caa0nwxvuwyx5rygybva.jpg',
      title: 'Primary Processing',
      info: 'Primary processing involves basic post-harvest treatments to prepare crops for storage, marketing, or further processing. Examples include cleaning and drying of grains, sorting and grading of fruits and vegetables, milling of grains, and ginning of cotton. It helps minimize post-harvest losses and improve marketability.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416277/ber7isgwap2wesey1i2j.jpg',
      title: 'Marketing Support',
      info: 'Effective marketing is crucial for maximizing farm income. Marketing support may include access to local markets and farmer producer organizations, e-commerce platforms for online sales, value addition through branding and packaging, cold chain infrastructure for perishable produce, and market research for informed decisions.'
    },
    {
      serviceImage: 'https://res.cloudinary.com/dq7vggsop/image/upload/v1717416239/lha4ldp5ylbtb4xdtlxa.jpg',
      title: 'Labour Supply',
      info: 'Availability of skilled and reliable agricultural labor is often a challenge. Potential solutions include connecting farmers with labor providers, training programs for rural youth to develop farm skills, and promoting mechanization and labor-saving technologies. Finding affordable and reliable labor is essential for smooth farm operations.'
    },


  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {farmData.map((card, index) => (
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

export default AllOffFarmAgriService