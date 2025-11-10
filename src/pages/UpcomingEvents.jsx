import React, { useContext } from "react";
import { Link } from "react-router";
import { EventContext } from "../context/EventContext";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag } from "react-icons/fa";

const UpcomingEvents = () => {
  const { getUpcomingEvents } = useContext(EventContext);
  const upcomingEvents = getUpcomingEvents();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="py-16 px-5 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and join community events happening near you. Make a
            difference today!
          </p>
        </div>

        {/* Events Grid */}
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">
              No upcoming events at the moment.
            </p>
            <Link
              to="/create-event"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <div
                  className="h-56 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${event.thumbnail})` }}
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold">
                      {event.eventType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-2 text-gray-600">
                    <FaMapMarkerAlt
                      className="text-indigo-500 mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <FaCalendarAlt
                      className="text-indigo-500 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-sm">
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  {/* Event Type */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <FaTag
                      className="text-indigo-500 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-sm font-medium">
                      {event.eventType}
                    </span>
                  </div>

                  {/* Participants Count */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <span className="text-sm text-gray-500">
                      {event.participants.length}{" "}
                      {event.participants.length === 1
                        ? "participant"
                        : "participants"}
                    </span>
                  </div>

                  {/* View Event Button */}
                  <Link
                    to={`/event/${event.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
