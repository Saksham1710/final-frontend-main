import React from 'react';
import PhotoContainer from '../components/PhotoContainer.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PhotoGallery() {

const [arts, setArts] = useState([]);

const getArt = async() => {
  try {
    const response = await axios.get('https://final-backend-art.onrender.com/api/arts');
    setArts(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getArt();
},[]);
console.log(arts);


  return (
    <div className="photo-gallery">
      {arts.map((art) => (
        <PhotoContainer id={art._id} src={art.src} initialBid={{ user: art.bids[0].user, bid: art.bids[0].bid }} />
      ))}
    </div>
  );
}

export default PhotoGallery;
