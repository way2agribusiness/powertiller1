import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Button } from '@mui/material';

const SupplierAddressCard = ({ supplierAddresses, onDelete }) => {
  return (
    <div>
      {supplierAddresses.map((address, index) => (
        <div key={index} className="supplier-address-card" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>State: {address.state}</p>
          <p>City: {address.city}</p>
          <p>Zip Code: {address.zip_code}</p>
          {/* <p>Taluk: {address.taluk}</p>
          <p>Village: {address.village}</p> */}

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteRoundedIcon />}
            onClick={() => onDelete(index)} // Pass the index to the delete handler
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SupplierAddressCard;
