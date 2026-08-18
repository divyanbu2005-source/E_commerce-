import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import AdminNavbar from './AdminNavbar';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// Function to generate random light colors
const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
};

const Adminhomepage = () => {
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/products/category-count');
        const data = response.data;

        const labels = Object.keys(data);
        const counts = Object.values(data);

        // Generate random light colors
        const backgroundColors = labels.map(() => getRandomLightColor());

        setCategoryData({
          labels: labels,
          datasets: [
            {
              label: 'Product Categories',
              data: counts,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div>
    <AdminNavbar/>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundImage: 'url(/path/to/your/image.jpg)', // Background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{ width: '50%', height: '50%' }}>
        <h2 style={{ textAlign: 'center' }}>PIE CHARTS</h2>
        <Pie
          data={categoryData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default Adminhomepage;
