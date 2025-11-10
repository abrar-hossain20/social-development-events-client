import React, { useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/AuthContext";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, joinEvent, hasJoinedEvent } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [isJoining, setIsJoining] = useState(false);

  const event = getEventById(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist.
          </p>
          <Link
            to="/upcoming-events"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            View All Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleJoinEvent = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to join this event");
      navigate("/signin", { state: `/event/${id}` });
      return;
    }

    // Check if already joined
    if (hasJoinedEvent(id, user.email)) {
      toast.info("You have already joined this event!");
      return;
    }

    setIsJoining(true);
    try {
      const success = joinEvent(id, user);
      if (success) {
        toast.success("Successfully joined the event!");
        // Refresh the page to show updated participant count
        window.location.reload();
      } else {
        toast.error("Failed to join the event. Please try again.");
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const isUserJoined = user && hasJoinedEvent(id, user.email);
  const isEventPast = new Date(event.eventDate) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/upcoming-events"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
        >
          ← Back to Events
        </Link>

        {/* Event Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Event Image */}
          <div
            className="h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${event.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold mb-4">
                {event.eventType}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCalendarAlt className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(event.eventDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatTime(event.eventDate)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-800">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUsers className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Participants</p>
                  <p className="font-semibold text-gray-800">
                    {event.participants.length} joined
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Event Creator */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Organized By
              </h2>
              <div className="flex items-center gap-4">
                <img
                  src={event.creatorPhoto || "https://via.placeholder.com/60"}
                  alt={event.creatorName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {event.creatorName}
                  </p>
                  <p className="text-gray-500 text-sm">{event.creatorEmail}</p>
                </div>
              </div>
            </div>

            {/* Participants List */}
            {event.participants.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Participants ({event.participants.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {event.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={
                          participant.photo || "https://via.placeholder.com/40"
                        }
                        alt={participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {participant.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {participant.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Join Event Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isEventPast ? (
                <div className="flex-1 py-4 px-6 bg-gray-200 text-gray-600 text-center rounded-lg font-semibold">
                  This event has ended
                </div>
              ) : isUserJoined ? (
                <div className="flex-1 py-4 px-6 bg-green-100 text-green-700 text-center rounded-lg font-semibold flex items-center justify-center gap-2">
                  <FaUsers size={18} />
                  You've joined this event
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={isJoining}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isJoining ? "Joining..." : "Join Event"}
                </button>
              )}

              <Link
                to="/upcoming-events"
                className="py-4 px-6 border-2 border-indigo-500 text-indigo-600 text-center rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300"
              >
                Browse More Events
              </Link>
            </div>

            {/* Login Prompt for Non-logged in Users */}
            {!user && !isEventPast && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-indigo-800 text-center">
                  Please{" "}
                  <Link
                    to="/signin"
                    state={`/event/${id}`}
                    className="font-semibold underline hover:text-indigo-600"
                  >
                    login
                  </Link>{" "}
                  to join this event
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
