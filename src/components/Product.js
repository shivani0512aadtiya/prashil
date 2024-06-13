import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [tableData, setTableData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://prashilexports.onrender.com/productdashboard"
        );
        setTableData(
          Array.isArray(response.data.photos) ? response.data.photos : []
        );
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProductData();
  }, []);

  const handleReadMore = (productId) => {
    console.log(productId);
    setExpandedId(productId === expandedId ? null : productId);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Spices
          </h5>
          <h1 className="mb-5">Most Popular Product</h1>
        </div>
        <div
          className="tab-className text-center wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="tab-content">
            <div className="row g-4">
              {tableData.map((product) => (
                <div key={product._id} className="col-lg-6">
                  <div className="d-flex align-items-center">
                    {product.image && product.image.url ? (
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={product.image.url}
                        alt={product.caption}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <p className="d-flex justify-content-between border-bottom pb-2">
                          No Image Available
                        </p>
                      </div>
                    )}
                    <div className="card-body">
                      {/* <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span>{product.caption.split(' ')[0]}</span>
                      </h5> */}
                      <p className="card-text">
                        {expandedId === product._id
                          ? product.caption
                          : `${product.caption.slice(0, 100)}...`}
                      </p>
                      <button
                        onClick={() => handleReadMore(product._id)}
                        style={{
                          padding: "6px 1px",
                          fontSize: "14px",
                          width: "120px",
                        }}
                        className={`btn btn-${
                          expandedId === product._id ? "secondary" : "primary"
                        }`}
                      >
                        {expandedId === product._id ? "Show Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
