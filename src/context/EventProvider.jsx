import React, { useState, useEffect } from "react";
import { EventContext } from "./EventContext";

const EventProvider = ({ children }) => {
  // Temporary local storage for events until backend is implemented
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    const storedJoinedEvents = localStorage.getItem("joinedEvents");

    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Add some sample events for demonstration
      const sampleEvents = [
        {
          id: "1",
          title: "Tree Plantation Drive - Hossainpur",
          description:
            "Join us for a massive tree plantation drive in Hossainpur, Kishoreganj. We aim to plant 500+ trees to make our environment greener. Bring your friends and family!",
          eventType: "Plantation",
          thumbnail:
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
          location: "Hossainpur, Kishoreganj",
          eventDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 7 days from now
          creatorEmail: "demo@example.com",
          creatorName: "Demo User",
          creatorPhoto: "https://via.placeholder.com/150",
          createdAt: new Date().toISOString(),
          participants: [],
        },
        {
          id: "2",
          title: "Road Cleaning Campaign - Mirpur 10",
          description:
            "Help us clean the roads of Mirpur 10, Dhaka. Together we can make our neighborhood cleaner and healthier. All cleaning supplies will be provided.",
          eventType: "Cleanup",
          thumbnail:
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
          location: "Mirpur 10, Dhaka",
          eventDate: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
          ).toISOString(), // 3 days from now
          creatorEmail: "demo@example.com",
          creatorName: "Demo User",
          creatorPhoto: "https://via.placeholder.com/150",
          createdAt: new Date().toISOString(),
          participants: [],
        },
        {
          id: "3",
          title: "Community Food Drive - Gulshan",
          description:
            "Organize and distribute food to the needy in Gulshan area. Your contribution can make someone's day better. Volunteers needed!",
          eventType: "Donation",
          thumbnail:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
          location: "Gulshan, Dhaka",
          eventDate: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(), // 14 days from now
          creatorEmail: "demo@example.com",
          creatorName: "Demo User",
          creatorPhoto: "https://via.placeholder.com/150",
          createdAt: new Date().toISOString(),
          participants: [],
        },
      ];
      setEvents(sampleEvents);
      localStorage.setItem("events", JSON.stringify(sampleEvents));
    }

    if (storedJoinedEvents) {
      setJoinedEvents(JSON.parse(storedJoinedEvents));
    }
  }, []);

  // Add a new event
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      participants: [],
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    return newEvent;
  };

  // Get event by ID
  const getEventById = (id) => {
    return events.find((event) => event.id === id);
  };

  // Join an event
  const joinEvent = (eventId, userData) => {
    const eventIndex = events.findIndex((event) => event.id === eventId);
    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      const participant = {
        email: userData.email,
        name: userData.displayName,
        photo: userData.photoURL,
        joinedAt: new Date().toISOString(),
      };

      // Check if user already joined
      const alreadyJoined = updatedEvents[eventIndex].participants.some(
        (p) => p.email === userData.email
      );

      if (!alreadyJoined) {
        updatedEvents[eventIndex].participants.push(participant);
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        // Track joined events for user
        const updatedJoinedEvents = [...joinedEvents, eventId];
        setJoinedEvents(updatedJoinedEvents);
        localStorage.setItem(
          "joinedEvents",
          JSON.stringify(updatedJoinedEvents)
        );

        return true;
      }
      return false; // Already joined
    }
    return false;
  };

  // Check if user has joined an event
  const hasJoinedEvent = (eventId, userEmail) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      return event.participants.some((p) => p.email === userEmail);
    }
    return false;
  };

  // Get upcoming events (filter out past events)
  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter((event) => new Date(event.eventDate) > now);
  };

  // Get events joined by a specific user, sorted by event date
  const getUserJoinedEvents = (userEmail) => {
    if (!userEmail) return [];

    const joinedEventsList = events.filter((event) =>
      event.participants.some((p) => p.email === userEmail)
    );

    // Sort by event date (ascending - earliest first)
    return joinedEventsList.sort(
      (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
    );
  };

  // Get events created by a specific user
  const getUserCreatedEvents = (userEmail) => {
    if (!userEmail) return [];

    return events
      .filter((event) => event.creatorEmail === userEmail)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date, newest first
  };

  // Update an event (only by creator)
  const updateEvent = (eventId, updatedData, userEmail) => {
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
      // Check if user is the creator
      if (events[eventIndex].creatorEmail !== userEmail) {
        return {
          success: false,
          message: "You can only update your own events",
        };
      }

      const updatedEvents = [...events];
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        ...updatedData,
        id: eventId, // Ensure ID doesn't change
        creatorEmail: events[eventIndex].creatorEmail, // Ensure creator doesn't change
        creatorName: events[eventIndex].creatorName,
        creatorPhoto: events[eventIndex].creatorPhoto,
        createdAt: events[eventIndex].createdAt,
        participants: events[eventIndex].participants, // Preserve participants
      };

      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return { success: true, message: "Event updated successfully" };
    }

    return { success: false, message: "Event not found" };
  };

  // Delete an event (only by creator)
  const deleteEvent = (eventId, userEmail) => {
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
      // Check if user is the creator
      if (events[eventIndex].creatorEmail !== userEmail) {
        return {
          success: false,
          message: "You can only delete your own events",
        };
      }

      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      // Remove from joined events if anyone joined
      const updatedJoinedEvents = joinedEvents.filter((id) => id !== eventId);
      setJoinedEvents(updatedJoinedEvents);
      localStorage.setItem("joinedEvents", JSON.stringify(updatedJoinedEvents));

      return { success: true, message: "Event deleted successfully" };
    }

    return { success: false, message: "Event not found" };
  };

  const eventInfo = {
    events,
    addEvent,
    getEventById,
    joinEvent,
    hasJoinedEvent,
    getUpcomingEvents,
    getUserJoinedEvents,
    getUserCreatedEvents,
    updateEvent,
    deleteEvent,
    joinedEvents,
  };

  return (
    <EventContext.Provider value={eventInfo}>{children}</EventContext.Provider>
  );
};

export default EventProvider;
