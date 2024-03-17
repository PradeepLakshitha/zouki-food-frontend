import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import QRCode from "qrcode.react"; // Adjusted import as TextField was not used
import pro from "./logo.png";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'action': 'GetAllData' },
    };

    // Using the provided API Gateway endpoint
    fetch(`https://4lomysby21.execute-api.ap-southeast-2.amazonaws.com/default/zouki-api-lambda`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is the array of products directly for simplicity
        // Adjust based on the actual response structure
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
    fetchProductDetails(data);
  };

  const fetchProductDetails = (imageUrl) => {
    // Adjust the endpoint as necessary
    fetch(`/api/productDetails?imageUrl=${imageUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  };

  return (
    <div>
      <div className="container">
        <div className="grid-container">
          {products?.map((product) => (
            <div key={product.productID} className="product-card">
              <Link to={`/product/${product.productID}`}>
                <QRCode
                  value={`https://main.d3nnq1ywmugn1z.amplifyapp.com/product/${product.productID}`}
                  size={128}
                  level="H"
                  imageSettings={{
                    src: pro,
                    excavate: true,
                    width: 80,
                    height: 30,
                  }}
                />
              </Link>
              <p>{product.proName}</p>
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
              style={{ transform: `rotate(${rotation}deg) scale(${zoom})` }}
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
};

export default ProductList;
