import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BidForm({ id }) { // Accept `id` as a prop
  const [name, setName] = useState('');
  const [bid, setBid] = useState('');
  const [art, setArt] = useState({ bids: [] }); // Default `bids` to an empty array

  const getArt = async () => {
    try {
      const response = await axios.get(`https://final-backend-art.onrender.com/api/art/${id}`);
      setArt(response.data || { bids: [] }); // Ensure there's always a `bids` array
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArt();
  }, [id]); // Depend on `id` to re-fetch when it changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedBids = [...(art.bids || []), { user: name, bid: bid }];

    const updatedArt = {
        artName: art.artName,
        serial: art.serial,
        src: art.src,
        alt: art.alt,
        bids: updatedBids
    };

    try {
        const response = await axios.put(`https://final-backend-art.onrender.com/api/art/${art._id}`, updatedArt);
        console.log('Updated art:', response.data);
        setArt(updatedArt); 
        getArt();
    } catch (error) {
        console.error('Error updating art:', error);
    }
};


  return (
    <div className="addbid">
      <form className="comment-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Add a higher bid" value={bid} onChange={(e) => setBid(e.target.value)} />
        <button type="submit">Submit Your Higher Bid</button>
      </form>
    </div>
  );
}

export default BidForm;
