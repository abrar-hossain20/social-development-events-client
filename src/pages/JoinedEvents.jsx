import React, { useContext } from "react";
import { Link } from "react-router";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/AuthContext";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaClock } from "react-icons/fa";

const JoinedEvents = () => {
  const { getUserJoinedEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);

  const joinedEvents = getUserJoinedEvents(user?.email);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isPastEvent = (dateString) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="py-16 px-5 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            My Joined Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Events you've registered for, sorted by date
          </p>
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
              {joinedEvents.length}{" "}
              {joinedEvents.length === 1 ? "Event" : "Events"}
            </span>
          </div>
        </div>

        {/* Events List */}
        {joinedEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-500 mb-2">
              You haven't joined any events yet
            </p>
            <p className="text-gray-400 mb-6">
              Start exploring and join events that interest you!
            </p>
            <Link
              to="/upcoming-events"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {joinedEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                  isPastEvent(event.eventDate) ? "opacity-75" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="md:w-80 h-64 md:h-auto relative flex-shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.thumbnail})` }}
                    ></div>
                    {isPastEvent(event.eventDate) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold">
                          Event Ended
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {event.title}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">
                          {event.eventType}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt
                          className="text-indigo-500 mt-1 shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Location
                          </p>
                          <p className="text-gray-800 font-medium">
                            {event.location}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt
                          className="text-indigo-500 mt-1 shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Event Date
                          </p>
                          <p className="text-gray-800 font-medium">
                            {formatDate(event.eventDate)}
                          </p>
                        </div>
                      </div>

                      {/* Event Type */}
                      <div className="flex items-start gap-3">
                        <FaTag
                          className="text-indigo-500 mt-1 shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Category
                          </p>
                          <p className="text-gray-800 font-medium">
                            {event.eventType}
                          </p>
                        </div>
                      </div>

                      {/* Participants */}
                      <div className="flex items-start gap-3">
                        <FaClock
                          className="text-indigo-500 mt-1 shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Participants
                          </p>
                          <p className="text-gray-800 font-medium">
                            {event.participants.length}{" "}
                            {event.participants.length === 1
                              ? "person"
                              : "people"}{" "}
                            joined
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      <Link
                        to={`/event/${event.id}`}
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                      >
                        View Details
                      </Link>
                      {isPastEvent(event.eventDate) ? (
                        <span className="text-sm text-gray-500 italic">
                          This event has ended
                        </span>
                      ) : (
                        <span className="text-sm text-green-600 font-medium flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          You're registered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;
