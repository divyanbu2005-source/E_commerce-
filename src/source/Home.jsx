import React from 'react';
import HomeNavbar from './HomeNavbar';
import '../source/Appp.css'; 
function Home() {
  const homeStyles = {
    backgroundImage: `url('https://t4.ftcdn.net/jpg/06/86/07/03/360_F_686070342_JjYJcXaWwzkmRfxbAJbffTY7X7KqXa8X.jpg')`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '91.9vh', // Ensures the container takes full viewport height
    color: '#fff', // Example text color
    padding: '20px'
  };

  return (
    <div>
    <HomeNavbar />
    <div style={homeStyles}>
      <div style={{ padding: '20px',position:'absolute',top:'30%',left:'60%',fontSize:'xx-large',fontWeight:'bolder',fontFamily:"serif",cursor:'pointer' }}>
        <p><span style={{color:'yellow',textShadow:'2px 3px green'}}>FRESH AND ORGANIC</span><br/><span style={{fontFamily:'cursive',color:'orange',textShadow:'2px 3px yellow'}}>VEGETABLES</span></p>
      </div>
      <p className='content' style={{position:'absolute',top:'45%',left:'60%',color:'white',textAlign:'justify',width:'38%',cursor:'pointer'}}>
"Discover the difference with VIVASAYEE NANBAN. 
From crisp greens to robust root vegetables, we specialize in delivering farm-fresh goodness straight to your kitchen. 
Each vegetable is carefully selected for its quality and flavor, ensuring every meal is a delight. Embrace healthy eating with our diverse range of seasonal produce, conveniently available at your fingertips. 
Join us in promoting sustainability and taste the freshness in every bite. 
Start your journey towards healthier living today with VIVASAYEE NANBAN."
      </p>
    </div>
    </div>
  );
}

export default Home;
