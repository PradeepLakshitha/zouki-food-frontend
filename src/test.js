// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { TextField } from '@material-ui/core';
import QRCode from 'qrcode.react'; // Import QRCode component

function ProductList() {
  const [products, setProducts] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`https://i5jtnibbtbyxbt6cjv2bhqzd4a0pdogx.lambda-url.ap-southeast-2.on.aws/`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handleCloseZoomedImage = () => {
    setZoomedImage(null);
    setRotation(0);
    setZoom(1);
  };

  const handleRotateImage = () => {
    setRotation(rotation + 90);
  };

  const handleZoomImage = (increment) => {
    setZoom(zoom + increment);
  };

  const handleQRCodeScan = (data) => {
    // Assuming data contains only the image URL
    // You can directly fetch the product details using this URL from the database
    fetchProductDetails(data);
  };

  const fetchProductDetails = (imageUrl) => {
    fetch(`/api/productDetails?imageUrl=${imageUrl}`) // Adjust the endpoint based on your backend API
      .then(response => response.json())
      .then(data => {
        console.log("Product details:", data);
        // Optionally, you can set the retrieved product details to state or perform other actions
      })
      .catch(error => console.error('Error fetching product details:', error));
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Products</h2>
        <div className="grid-container">
          {products.map(product => (
            <div key={product.productID} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.imgUrl}
                  alt={product.proName}
                  className="product-image"
                  onClick={() => handleImageClick(product.imgUrl)}
                />
                <div className="product-name">{product.proName}</div>
              </div>
              <div className="details-container">
                <div className="subheader"><strong>Ingredients:</strong></div>
                <div className="ingredients">{product.ing}</div>
                <div className="subheader"><strong>Allergens:</strong></div>
                <div className="allergens">{product.aller}</div>
              </div>
              <div className="qr-code">
                <QRCode 
                  value={product.imgUrl} // Only encode the image URL into the QR code
                  size={128} 
                  level="H" 
                  onScan={handleQRCodeScan}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {zoomedImage && (
        <div className="zoomed-image-container">
          <div className="zoomed-image">
            <img
              src={zoomedImage}
              alt="Zoomed"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
              }}
              className="zoomed-image-element"
            />
            <div className="buttons">
              <button onClick={() => handleZoomImage(0.1)}>Zoom In</button>
              <button onClick={() => handleZoomImage(-0.1)}>Zoom Out</button>
              <button onClick={handleRotateImage}>Rotate</button>
              <button onClick={handleCloseZoomedImage}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
