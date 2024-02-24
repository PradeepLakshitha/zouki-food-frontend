import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField } from "@material-ui/core";
import QRCode from "qrcode.react"; // Import QRCode component
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
    fetch(
      `https://i5jtnibbtbyxbt6cjv2bhqzd4a0pdogx.lambda-url.ap-southeast-2.on.aws`
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of products
        const modifiedData = data.map((product) => ({
          productID: product.productID,
          proName: product.proName,
        }));
        setProducts(modifiedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // const fetchProducts = () => {
  //   fetch(
  //     `https://i5jtnibbtbyxbt6cjv2bhqzd4a0pdogx.lambda-url.ap-southeast-2.on.aws`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Assuming data is an array of products
  //       const modifiedData = data.map((product) => ({
  //         productID: product.productID,
  //         proName: product.proName,
  //       }));
  //       setProducts(modifiedData);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };

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
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
        // Optionally, you can set the retrieved product details to state or perform other actions
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  // Assuming productList is an array of products

  return (
    <div>
      <div className="container">
        <div className="grid-container">
          {products?.map((product) => (
            <div key={product.productID} className="product-card">
              <Link
                to={`https://main.d3nnq1ywmugn1z.amplifyapp.com/product/${product.productID}`}
              >
                <QRCode
                  value={`https://main.d3nnq1ywmugn1z.amplifyapp.com/product/${product.productID}`}
                  size={128}
                  level="H"
                  onScan={handleQRCodeScan}
                  imageSettings={{
                    src: pro, // Replace 'path_to_your_logo' with the path to your logo
                    excavate: true,
                    width: 80,
                    height: 30, // Keep true to crop the image in the shape of QR Code
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
};

export default ProductList;
