import React from 'react'
import { useParams } from 'react-router-dom'
const AgriServiceCategory = () => {
    let {category} = useParams()
  return (
    <div>AgriServiceCategory : {category}</div>
  )
}

export default AgriServiceCategory