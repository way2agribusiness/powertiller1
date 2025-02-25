import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
const VendorData = () => {
    const [vendors, setVendors] = useState([])

    const vendorFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/allVendors`)
            setVendors(res.data)
        }
        catch (error) {
            console.log("Error fetching the vendors details");
        }
    }
    const handleDeleteVendor5 = async (vendorId) => {
        console.log("vendor Id delete", vendorId)

        const res = window.confirm('Are you sure want to delete')
        try {
            if (res) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/vendordelete/${vendorId}`); // Replace with your API endpoint
                const updatedUsers = vendors.filter((user) => user._id !== vendorId);
                setVendors(updatedUsers);
            }

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteVendor = async (vendorId) => {
        try {
            const confirmationResult = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            if(confirmationResult.isConfirmed)
                {
                    try{
                        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/vendordelete/${vendorId}`)
                        // console.log("Deleted Vendor Data", response.data);

                        const updatedVendorData = vendors.filter(item=> item._id !==vendorId)
                        setVendors(updatedVendorData)

                        Swal.fire({
                            title:"Deleted!",
                            text: "Vendor has been deleted",
                            icon:"success"
                        })

                    }
                    catch(error)
                    {
                        console.log("Error deleting vendorProfile", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the vendor",
                            icon:"error"
                        })

                        if (error.response) {
                            toast.error(`Failed to delete resource: ${error.response.data.message}`);
                          } else if (error.request) {
                            toast.error("Failed to delete resource: No response received from server");
                          } else {
                            toast.error("Failed to delete resource: Error setting up the request");
                          }
                    }
                }

        }
        catch (error) {
            console.error('Error deleting user: ', error)
        }
    }
    useEffect(() => {
        vendorFetch()
    }, [])
    return (
        <div>
            <table className="table-auto w-full text-xs">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase">

                        <th className="px-4 py-2 text-left">Vendor Name</th>
                        <th className="px-4 py-2 text-left">Vendor Type</th>
                        <th className="px-4 py-2 text-left">Active</th>
                        <th className="px-4 py-2 text-left">Product Exist</th>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Supplier Address</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors && vendors.map((vendor) => {
                        // console.log("Vendor in MAP frontend", vendor._id)
                        const vendorId = vendor.user_id;
                        // console.log("Frontend VEndors", user)

                        return (
                            <tr key={vendor._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="px-4 py-4">{vendor.vendor_name}</td>
                                <td className="px-4 py-4">{vendor.vendor_type}</td>
                                <td className="px-4 py-4">{vendor.active ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-4">{vendor.productExist ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-4">
                                    {vendor.vendor_card_image && vendor.vendor_card_image.url ? (
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={vendor.vendor_card_image.url}
                                            alt="Vendor Image"
                                        />
                                    ) : (
                                        <p>No Image</p>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {vendor.address && vendor.address.length > 0 ? (
                                        <ul>
                                            {vendor.address.map((address) => (
                                                <li key={address._id}>
                                                    {address.state}, {address.city}, {address.zip_code}
                                                    {address.taluk && `, ${address.taluk}`}
                                                    {address.village && `, ${address.village}`}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No Address</p>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {vendor.supplierAddresses && vendor.supplierAddresses.length > 0 ? (
                                        <ul>
                                            {vendor.supplierAddresses.map((address) => (
                                                <li key={address._id}>
                                                    {address.state && `, ${address.state}`}

                                                    {address.city}, {address.zip_code}
                                                    {address.taluk && `, ${address.taluk}`}
                                                    {address.village && `, ${address.village}`}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No Supplier Address</p>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none"
                                        onClick={() => handleDeleteVendor(vendor._id)}
                                    >
                                        Delete User
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default VendorData