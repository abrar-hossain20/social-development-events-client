import React from "react";
import { Link } from "react-router";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLeaf,
  FaBroom,
  FaRecycle,
  FaBook,
} from "react-icons/fa";

const Home = () => {
  // Sample gallery images (using placeholder images for now)
  const galleryImages = [
    {
      id: 1,
      title: "Tree Plantation Drive",
      location: "Hossainpur, Kishoreganj",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=350&fit=crop",
    },
    {
      id: 2,
      title: "Road Cleaning Campaign",
      location: "Mirpur 10, Dhaka",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=350&fit=crop",
    },
    {
      id: 3,
      title: "Community Food Drive",
      location: "Gulshan, Dhaka",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=350&fit=crop",
    },
    {
      id: 4,
      title: "Beach Cleanup Initiative",
      location: "Cox's Bazar",
      image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500&h=350&fit=crop",
    },
    {
      id: 5,
      title: "Education for All",
      location: "Savar, Dhaka",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=350&fit=crop",
    },
    {
      id: 6,
      title: "Recycling Awareness",
      location: "Dhanmondi, Dhaka",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=350&fit=crop",
    },
  ];

  return (
    <div>
      {/* Banner Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Make a Difference in Your Community
          </h1>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "40px",
              opacity: "0.95",
              maxWidth: "700px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
            }}
          >
            Join thousands of volunteers creating positive social impact through
            community-driven events. Together, we can build a better tomorrow.
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/upcoming-events"
              style={{
                padding: "15px 35px",
                background: "white",
                color: "#667eea",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Explore Events
            </Link>
            <Link
              to="/register"
              style={{
                padding: "15px 35px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                transition: "background 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Why Join Our Platform?
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Discover the features that make community engagement simple and
              impactful
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <FaCalendarAlt size={30} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "12px",
                }}
              >
                Easy Event Creation
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.6" }}>
                Create and manage social development events in minutes with our
                intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <FaUsers size={30} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "12px",
                }}
              >
                Community Building
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.6" }}>
                Connect with like-minded individuals and build a stronger
                community together
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <FaMapMarkerAlt size={30} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "12px",
                }}
              >
                Local Impact
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.6" }}>
                Find and join events in your local area to make an immediate
                impact
              </p>
            </div>

            {/* Feature 4 */}
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <FaHandHoldingHeart size={30} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "12px",
                }}
              >
                Track Your Impact
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.6" }}>
                Keep track of all the events you've joined and the difference
                you've made
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Community in Action
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              See the positive change we're creating together across Bangladesh
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {galleryImages.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    height: "250px",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "20px", background: "white" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaMapMarkerAlt size={14} color="#667eea" />
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 25px",
            }}
          >
            <FaBook size={35} color="white" />
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            Stay Updated
          </h2>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "40px",
              opacity: "0.95",
              lineHeight: "1.6",
            }}
          >
            Subscribe to our newsletter and get the latest updates about
            upcoming events, community stories, and volunteer opportunities
            delivered to your inbox.
          </p>

          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: "1",
                minWidth: "280px",
                padding: "15px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                backgroundColor: "white",
                color: "#333",
                boxSizing: "border-box",
              }}
            />
            <button
              style={{
                padding: "15px 40px",
                background: "white",
                color: "#667eea",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Subscribe
            </button>
          </div>

          <p style={{ fontSize: "14px", marginTop: "20px", opacity: "0.8" }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
