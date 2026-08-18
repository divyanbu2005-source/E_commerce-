import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CustomerNavbar() {
  const navigate = useNavigate();
  
  // Retrieve email from session storage
  const email = sessionStorage.getItem('email') || '';

  const handleLogout = () => {
    sessionStorage.removeItem('email'); // Clear email from session storage
    navigate('/'); // Navigate to the home page
  };

  const handleCartDetailsClick = () => {
    navigate('/orderproductdetails'); // Navigate to OrderedProductdetails page
  };

  return (
    <div>
      <style type="text/css">
        {`
          .custom-navbar {
            background-color: #000; /* Black background color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          .navbar-brand {
            font-size: 1.5rem;
            color: #f5deb3 !important; /* Wheat color */
          }
          .nav-link {
            font-size: 1.2rem;
            color: #f5deb3 !important; /* Wheat color */
          }
          .nav-link:hover {
            color: orange !important; /* Hover color */
          }
          .logout-button {
            margin-left: 1rem;
          }
          @media (max-width: 767px) {
            .navbar-toggler {
              background-color: #28a745;
            }
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <a className="navbar-brand" href="/"><strong>VYAVASAYEE NANBAN</strong></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/customerhomepage"><strong>HOME</strong></a>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleCartDetailsClick}><strong>CART DETAILS</strong></button>
            </li>
          </ul>
          <div className="ml-auto d-flex align-items-center">
           &bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp;&bsp; <span className="email-text" style={{color: 'wheat',fontWeight:'bolder'}}>{email}</span>
            <Button variant="outline-danger" className="logout-button" onClick={handleLogout}><strong>LOGOUT</strong></Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default CustomerNavbar;
