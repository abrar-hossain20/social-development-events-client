import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/AuthContext";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageEvents = () => {
  const { getUserCreatedEvents, updateEvent, deleteEvent } =
    useContext(EventContext);
  const { user } = useContext(AuthContext);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const myEvents = getUserCreatedEvents(user?.email);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditClick = (event) => {
    setEditingEvent(event.id);
    setEditFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: new Date(event.eventDate),
    });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setEditFormData((prev) => ({
      ...prev,
      eventDate: date,
    }));
  };

  const handleUpdateSubmit = (e, eventId) => {
    e.preventDefault();

    // Validation
    if (
      !editFormData.title ||
      !editFormData.description ||
      !editFormData.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const dataToUpdate = {
      ...editFormData,
      eventDate: editFormData.eventDate.toISOString(),
    };

    const result = updateEvent(eventId, dataToUpdate, user.email);

    if (result.success) {
      toast.success(result.message);
      setEditingEvent(null);
      setEditFormData({});
    } else {
      toast.error(result.message);
    }
  };

  const handleDeleteClick = (eventId, eventTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`
    );

    if (confirmDelete) {
      const result = deleteEvent(eventId, user.email);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="py-16 px-5 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Manage My Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View, edit, and manage all events you've created
          </p>
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
              {myEvents.length} {myEvents.length === 1 ? "Event" : "Events"}
            </span>
          </div>
        </div>

        {/* Events List */}
        {myEvents.length === 0 ? (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-500 mb-2">
              You haven't created any events yet
            </p>
            <p className="text-gray-400 mb-6">
              Start creating events and make a difference in your community!
            </p>
            <Link
              to="/create-event"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {editingEvent === event.id ? (
                  // Edit Mode
                  <form
                    onSubmit={(e) => handleUpdateSubmit(e, event.id)}
                    className="p-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Edit Event
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Event Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={editFormData.description}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Event Type *
                        </label>
                        <select
                          name="eventType"
                          value={editFormData.eventType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        >
                          <option value="Plantation">Plantation</option>
                          <option value="Cleanup">Cleanup</option>
                          <option value="Donation">Donation</option>
                          <option value="Education">Education</option>
                          <option value="Health">Health</option>
                          <option value="Community">Community Service</option>
                        </select>
                      </div>

                      {/* Thumbnail URL */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Thumbnail URL *
                        </label>
                        <input
                          type="url"
                          name="thumbnail"
                          value={editFormData.thumbnail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      {/* Event Date */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Event Date *
                        </label>
                        <DatePicker
                          selected={editFormData.eventDate}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          dateFormat="MMMM d, yyyy"
                          required
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // View Mode
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-80 h-64 md:h-auto relative shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.thumbnail})` }}
                      ></div>
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

                      <p className="text-gray-600 mb-4">{event.description}</p>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <FaMapMarkerAlt
                            className="text-indigo-500"
                            size={18}
                          />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Location
                            </p>
                            <p className="text-gray-800 font-medium text-sm">
                              {event.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaCalendarAlt
                            className="text-indigo-500"
                            size={18}
                          />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Date
                            </p>
                            <p className="text-gray-800 font-medium text-sm">
                              {formatDate(event.eventDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaUsers className="text-indigo-500" size={18} />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Participants
                            </p>
                            <p className="text-gray-800 font-medium text-sm">
                              {event.participants.length}{" "}
                              {event.participants.length === 1
                                ? "person"
                                : "people"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleEditClick(event)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
                        >
                          <FaEdit /> Edit Event
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteClick(event.id, event.title)
                          }
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
                        >
                          <FaTrash /> Delete Event
                        </button>
                        <Link
                          to={`/event/${event.id}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
