import React from "react";
import { Link } from "react-router";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
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
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 px-5 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-5 leading-tight">
            Make a Difference in Your Community
          </h1>
          <p className="text-xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Join thousands of volunteers creating positive social impact through
            community-driven events. Together, we can build a better tomorrow.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link
              to="/upcoming-events"
              className="px-9 py-4 bg-white text-indigo-500 rounded-lg no-underline font-semibold text-base transition-all duration-300 inline-block hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Events
            </Link>
            <Link
              to="/register"
              className="px-9 py-4 bg-white/20 text-white border-2 border-white rounded-lg no-underline font-semibold text-base transition-all duration-300 inline-block hover:bg-white/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Join Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the features that make community engagement simple and
              impactful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
            {/* Feature 1 */}
            <div className="bg-white p-9 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="w-18 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaCalendarAlt size={30} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Easy Event Creation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create and manage social development events in minutes with our
                intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-9 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="w-18 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaUsers size={30} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community Building
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Connect with like-minded individuals and build a stronger
                community together
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-9 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="w-18 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaMapMarkerAlt size={30} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Local Impact
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Find and join events in your local area to make an immediate
                impact
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-9 rounded-xl text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="w-18 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaHandHoldingHeart size={30} color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Track Your Impact
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Keep track of all the events you've joined and the difference
                you've made
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Community in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the positive change we're creating together across Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <FaMapMarkerAlt size={14} className="text-indigo-500" />
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBook size={35} color="white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-10 opacity-95 leading-relaxed">
            Subscribe to our newsletter and get the latest updates about
            upcoming events, community stories, and volunteer opportunities
            delivered to your inbox.
          </p>

          <div className="max-w-2xl mx-auto flex gap-4 flex-wrap justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 min-w-[280px] px-5 py-4 border-none rounded-lg text-base outline-none text-gray-800 bg-white"
            />
            <button className="px-10 py-4 bg-white text-indigo-500 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              Subscribe
            </button>
          </div>

          <p className="text-sm mt-5 opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
