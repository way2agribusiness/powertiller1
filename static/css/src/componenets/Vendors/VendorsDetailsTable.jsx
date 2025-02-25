import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { add, format } from 'date-fns'
import { useAuth } from '../../User/AuthProvider'

const cardStyle = {
    display: 'flex',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
};
const VendorsDetailsTable = () => {
    const { auth } = useAuth();
    const currentUserData = auth.userData;
    const userID = currentUserData._id;

    const [vendorData, setVendorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/${userID}`) 

                    // `http://localhost:5000/api/v1/vendor/${userID}`);
                setVendorData(response.data)
                console.log("Check the vendor Profile", response.data)
            } catch (err) {
                console.error('Error fetching vendor data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userID) {
            fetchVendorData();
        }
    }, [userID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    console.log("Current Vendor Data in Profile page: ",vendorData)
    const vendorArray = vendorData.vendor
    const formattedData = format(new Date(vendorArray.created_at), 'do MMMM yyyy');
    const formattedTime = new Date(vendorArray.created_at).toLocaleTimeString();
    return (
        <div>
            <h2>Vendor Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Field</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {vendorData && vendorData.vendor ? (
                        <>
                        <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>KAB Id</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd'}}> <span className='font-medium'>{vendorData.vendor.Kab_id}</span></td>
                            </tr>

                            <tr>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>Vendor Type</td>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                    {vendorData.vendor.vendor_type && (
                                        <span>{vendorData.vendor.vendor_type}</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Vendor Name</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{vendorData.vendor.vendor_name}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Address</td>
                                {/* {console.log("This is the actual address for the vendor:", vendorData.vendor.address)} */}
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {vendorData.vendor.address.map((address, index) => (
                                        <div key={index} style={cardStyle}>
                                            <div className='pr-2'><span className='font-medium'>State:</span> {address.state}</div>
                                            <div className='pr-2'><span className='font-medium'>City:</span> {address.city}</div>
                                            <div className='pr-2'><span className='font-medium'>Taluk:</span> {address.taluk}</div>
                                            <div className='pr-2'><span className='font-medium'>Village:</span> {address.village}</div>
                                            <div className='pr-2'><span className='font-medium'>Zip Code:</span> {address.zip_code}</div>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Supplier Address</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>

                                {vendorData.vendor.supplierAddresses.map((address, index) => (
                                    <div key={index} style={cardStyle} >
                                        <div  className='pr-2'><span className='font-medium'>State:</span> {address.state}</div>
                                        <div  className='pr-2'><span className='font-medium'>City:</span> {address.city}</div>
                                        <div  className='pr-2'><span className='font-medium'>Taluk:</span> {address.taluk}</div>
                                        <div  className='pr-2'><span className='font-medium'>Village:</span> {address.village}</div>
                                        <div  className='pr-2'><span className='font-medium'>Zip Code:</span> {address.zip_code}</div>
                                    </div>
                                ))}
                            </td>
                            </tr>
                          
                            <tr>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>Company Card Image</td>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                    {vendorData.vendor.vendor_card_image && (
                                        <>
                                        <img src={vendorData.vendor.vendor_card_image.url} alt="company-card" className='h-20'></img>
                                        </>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>Seller Status</td>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                        <>
                                        <span>{vendorData.vendor.active ? <><div className='text-green-700 font-medium'> Approved</div></>: <><div className='text-red-700'>Not Approved</div></>}</span>
                                        </>
                                </td>
                            </tr>

                            <tr>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>Product Available</td>
                                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                        <>
                                        <span>{vendorData.vendor.productExist ? <><div className='text-green-700 font-medium'> Available </div></>: <><div className='text-red-700'>Not Available</div></>}</span>
                                        </>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ padding: '10px', border: '1px solid #ddd' }}>
                                No vendor data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default VendorsDetailsTable