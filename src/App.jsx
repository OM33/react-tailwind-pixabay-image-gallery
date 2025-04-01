import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=photo&pretty=true`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err => console.log(err)));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      
      {!isLoading && images.length === 0 && <div className="text-5xl text-center mx-auto mt-32">No images found</div> }
      {isLoading ? <div className="text-6xl text-center mx-auto mt-32">Loading</div> : 
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
      
     </div>
  )
}



export default App

