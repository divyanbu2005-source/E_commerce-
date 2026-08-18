import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap'; // Importing React Bootstrap components
import CustomerNavbar from './CustomerNavbar';

function Customerhomepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Retrieve email from session storage
  const email = sessionStorage.getItem('email') || '';

  // Example categories
  const categories = ['Vegetables', 'Fruits', 'Dairy'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/products/all');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize with all products
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = products.filter(product =>
        product.vegetableName.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(0); // Reset to the first page on search
  }, [searchQuery, products]);

  const itemsPerPage = 24;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const getPaginatedProducts = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product, email } });
  };

  return (
    <div>
      <CustomerNavbar categories={categories} />
      <div className="container">
      <Form>
      <label><strong>SEARCH</strong></label>
      <br/>
  <FormControl
    type="search"
    placeholder="Enter the product for search using name or categories....."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ width: '250%' }} // Adjust width as needed
  />
</Form>

        {error && <p className="error">{error}</p>}
        <br/>
        <div className="grid-container">
          {getPaginatedProducts().length > 0 ? (
            getPaginatedProducts().map(product => (
              <div
                key={product.id}
                className={`product-card ${hoveredProductId === product.id ? 'product-card-hover' : ''}`}
                onClick={() => handleCardClick(product)}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div className="product-card-inner">
                  <div className="product-card-front">
                    <div className="image-container">
                      <img
                        src={`data:image/jpeg;base64,${product.vegetableImage}`}
                        alt={product.vegetableName}
                        className="image"
                      />
                      <h2 className="product-name">{product.vegetableName}</h2>
                      <h2 className="product-name">₹{product.price}</h2>
                    </div>
                  </div>
                  <div className="product-card-back" style={{ textAlign: 'justify' }}>
                    <h2 className="product-name">DESCRIPTION</h2>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        )}
      </div>
      <style>
        {`
          .container {
            padding: 20px;
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .grid-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr); /* 5 columns per row */
            gap: 20px;
            width:100%; /* 30px space on the right side */
            margin-right: 250px;
          }

          .product-card {
            perspective: 1000px;
          }

          .product-card-inner {
            background: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.20);
            text-align: center;
            cursor: pointer;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            position: relative;
            width: 290px; /* Fixed width for product card */
            height: 320px; /* Fixed height for product card */
          }

          .product-card-hover .product-card-inner {
            transform: rotateY(180deg);
          }

          .product-card-front, .product-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .product-card-back {
            background: #f8f9fa;
            transform: rotateY(180deg);
            border-radius: 8px;
            left:-0.5%;
            top:0%;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.50);
          }

          .product-name {
            margin: 10px 0;
            font-size: 1.2rem;
          }

          .image-container {
            margin: 10px 0;
          }

          .image {
            width: 100%; /* Responsive width for images */
            height: 200px;
            border-radius: 4px;
          }

          .error {
            color: red;
            font-weight: bold;
          }

          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .page-item {
            margin: 0 5px;
          }

          .page-link {
            padding: 8px 12px;
            border: 1px solid #dee2e6;
            color: #007bff;
            cursor: pointer;
          }

          .page-link:hover {
            background-color: #e9ecef;
          }

          .active .page-link {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }

          .email-display {
            margin-top: 20px;
          }

          .email-text {
            font-size: 1.2rem;
            font-weight: bold;
            color: #343a40;
          }
        `}
      </style>
    </div>
  );
}

export default Customerhomepage;
