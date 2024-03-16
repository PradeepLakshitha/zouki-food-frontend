import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField } from "@material-ui/core";
import QRCode from "qrcode.react";

// Import the logo image z
import logo from "./logo.png";
import loadingGif from "./loading-loader.gif"; // Import your loading GIF filefgdfgf

const ProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true); // State for loading animation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(
      `https://i5jtnibbtbyxbt6cjv2bhqzd4a0pdogx.lambda-url.ap-southeast-2.on.aws/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Once data is fetched, stop loading animation
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
    console.log('updating product details with develop branch');
    fetch(`/api/productDetails?imageUrl=${imageUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product details:", data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  return (
    <div>
      {loading ? (
        <div className="loading-animation">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div className="container">
          <div className="grid-container">
            {products?.map((product) => (
              <div key={product.productID} className="product-card">
                <center>
                  <img src={logo} alt="Logo" className="product-logo" />
                </center>
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
                  <div className="subheader">
                    <strong>Ingredients:</strong>
                  </div>
                  <div className="ingredients">{product.ing}</div>
                  <div className="subheader">
                    <strong>Allergens:</strong>
                  </div>
                  <div className="allergens">{product.aller}</div>
                </div>
                <div className="disclaimer">
                  <p style={{ color: "black", fontWeight: "bold" }}>DISCLAIMER:</p>
                  <p style={{ color: "red"}}>
                    This product is produced in a facility where the environment
                    contains milk, peanuts, sesame, soy, tree nuts, gluten, lupin,
                    crustacean & fish. Although the safest methods are
                    implemented, accidental or unintentional cross-contamination
                    may occur. Therefore, please be aware that we cannot
                    completely guarantee the absence of undeclared allergens.
                  </p>
                </div>
                <div className="qr-code">
                  <QRCode
                    value={`https://main.d3nnq1ywmugn1z.amplifyapp.com/product/${product.productID}`}
                    size={128}
                    level="H"
                    onScan={handleQRCodeScan}
                    imageSettings={{
                      src: logo,
                      excavate: true,
                      width: 80,
                      height: 30,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
