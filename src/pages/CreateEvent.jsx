import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FaCalendarAlt } from "react-icons/fa";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState(null);

  const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Health Camp",
    "Food Drive",
    "Blood Donation",
    "Awareness Campaign",
  ];

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;

    // Validate date
    if (!eventDate) {
      toast.error("Please select an event date");
      return;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      toast.error("Event date cannot be in the past");
      return;
    }

    // Create event object
    const eventData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate: eventDate.toISOString(),
      creatorEmail: user.email,
      creatorName: user.displayName,
      creatorPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
      participants: [],
    };

    try {
      // Here you would send the data to your backend
      // For now, we'll simulate success
      console.log("Event Data:", eventData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Event created successfully!");
      navigate("/upcoming-events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create New Event
          </h1>
          <p className="text-base text-gray-600">
            Start making a difference in your community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateEvent}>
          {/* Event Title */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Road Cleaning in Mirpur 10, Dhaka"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-colors duration-300 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Describe your event, what you plan to do, and what participants should bring..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-colors duration-300 outline-none focus:border-indigo-500 font-inherit resize-y"
            />
          </div>

          {/* Event Type */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Event Type <span className="text-red-500">*</span>
            </label>
            <select
              name="eventType"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-colors duration-300 outline-none focus:border-indigo-500 bg-white cursor-pointer"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail URL */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Thumbnail Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="thumbnail"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-colors duration-300 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g., Mirpur 10, Dhaka"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-colors duration-300 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Event Date */}
          <div className="mb-8">
            <label className="block mb-2 text-gray-800 text-sm font-semibold">
              Event Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select event date"
                required
                customInput={
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg text-sm outline-none cursor-pointer"
                      readOnly
                    />
                    <FaCalendarAlt
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"
                      size={18}
                    />
                  </div>
                }
              />
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              Only future dates can be selected
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/40"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
