import React from 'react';
import BidForm from '../components/AddBidForm.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PhotoContainer({ id,src, initialBid }) {
  const key = id;

  const [art, setArt] = useState(null);


  const getArt = async () => {
    try {
      const response = await axios.get('https://final-backend-art.onrender.com/api/art/'+key);
      console.log("Data",response.data);
      setArt(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getArt();
  }, [key]); // Dependency array includes `key` to prevent unnecessary calls
  

  return (
    <div className="photo-container">
      <div className="photo">
        <img src={src} alt="" width="200" />
      </div>
      <div className="comments-section">
        <h4>Bids</h4>
        <ul>
        {art && art.bids && art.bids.map((bid) => (
  <li key={bid._id}>
    <p><strong>{bid.user}</strong> - ${bid.bid}</p>
  </li>
))}

        </ul>
      </div>
      <BidForm id={key}/>
      <hr />
    </div>
  );
}

export default PhotoContainer;
 