import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField } from "@material-ui/core";
import QRCode from "qrcode.react";

// Import the logo image
import logo from "./logo.png";
import loadingGif from "./loading-loader.gif"; // Import your loading GIF file

const ProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <div className="loading-animation">
          {/* Add your loading GIF here */}
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div className="container">
          <div className="grid-container">
            {/* Product cards */}
            {products?.map((product) => (
              <div key={product.productID} className="product-card">
                {/* Logo image */}
                <center>
                  <img src={logo} alt="Logo" className="product-logo" />
                </center>
                {/* Rest of your product card code */}
                <div className="product-image-container">
                  {/* Product image */}
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
                      src: logo, // Replace 'path_to_your_logo' with the path to your logo
                      excavate: true,
                      width: 80,
                      height: 30, // Keep true to crop the image in the shape of QR Code
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
