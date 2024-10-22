
      // Landing Page
      import React from "react";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Your Dream App</h1>
          <p style={styles.heroSubtitle}>
            Discover everything you need to take your business to the next level.
          </p>
          <button style={styles.ctaButton}>Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <h2 style={styles.aboutTitle}>What We Offer</h2>
          <p style={styles.aboutDescription}>
            Our platform provides all the tools you need to manage and grow your
            business. From simple solutions to advanced customization options,
            we've got you covered.
          </p>
        </div>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3>Feature 1</h3>
            <p>Simple and intuitive tools that empower your work.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Feature 2</h3>
            <p>Powerful analytics and insights to guide your strategy.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Feature 3</h3>
            <p>Customization options that fit your business needs.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
        <button style={styles.ctaButton}>Join Us Today</button>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#fff",
    backgroundImage: 'url("https://images.photowall.com/products/59504/mountain-view-1.jpg?h=699&q=85")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: "center",
    paddingBottom: "50px",
  },
  heroSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
  },
  heroContent: {
    maxWidth: "800px",
    color: "#fff",
    padding: "20px",
  },
  heroTitle: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "40px",
  },
  ctaButton: {
    backgroundColor: "#ff7f50",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    padding: "15px 30px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  ctaButtonHover: {
    transform: "scale(1.05)",
  },
  aboutSection: {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
    padding: "50px 20px",
  },
  aboutContent: {
    marginBottom: "40px",
  },
  aboutTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  aboutDescription: {
    fontSize: "1.2rem",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "20px",
    borderRadius: "10px",
    width: "250px",
    marginBottom: "20px",
    transition: "transform 0.3s ease",
  },
  featureCardHover: {
    transform: "scale(1.05)",
  },
  ctaSection: {
    padding: "50px 20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
};

export default LandingPage;

    

      // Login Form
      import React, { useState } from 'react';

export default function GlassLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  // Button hover effect
  const buttonStyle = {
    background: isButtonHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    transform: isButtonHovered ? 'scale(1.1)' : 'scale(1)',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background 0.3s ease',
    borderRadius: '10px',
    color: '#fff',
    width: '100%',
  };

  // Input hover effect
  const getInputStyle = (inputName) => ({
    ...styles.input,
    transform: isInputHovered[inputName] ? 'translateY(-3px)' : 'none',
    boxShadow: isInputHovered[inputName] ? '0px 5px 15px rgba(0, 0, 0, 0.2)' : 'inset 0 4px 10px rgba(0, 0, 0, 0.1)',
  });

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>

          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={getInputStyle('email')}
              onMouseEnter={() => setIsInputHovered({ ...isInputHovered, email: true })}
              onMouseLeave={() => setIsInputHovered({ ...isInputHovered, email: false })}
            />
          </div>

          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={getInputStyle('password')}
              onMouseEnter={() => setIsInputHovered({ ...isInputHovered, password: true })}
              onMouseLeave={() => setIsInputHovered({ ...isInputHovered, password: false })}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span style={styles.buttonText}>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://images.photowall.com/products/59504/mountain-view-1.jpg?h=699&q=85")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formWrapper: {
    backdropFilter: 'blur(10px)', // Glass effect
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    width: '300px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    fontSize: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  buttonText: {
    zIndex: 1,
  },
};

    