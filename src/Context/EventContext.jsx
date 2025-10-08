import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState({
    hosting: [],
    attending: [],
    previous: [],
  });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [query, setQuery] = useState("");

  // ================================
  // ✅ Load user + token from localStorage on mount
  // ================================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);

      // Standardize the stored user ID
      const id = storedUser._id || storedUser.id;
      if (id) localStorage.setItem("userId", id);
    }
  }, []);

  // ================================
  // ✅ FETCH ALL EVENTS
  // ================================
  const fetchAllEvents = async (searchQuery = "", filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${import.meta.env.VITE_EVENT_URL}/all`;

      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (filters.location) params.append("location", filters.location);
      if (filters.category) params.append("category", filters.category);
      if (filters.tags) params.append("tags", filters.tags);
      if (filters.price === "free") params.append("maxPrice", 0);
      if (filters.price === "paid") params.append("minPrice", 1);

      if ([...params].length > 0) {
        url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
      }

      console.log("🌍 Fetching all events from:", url);

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

      console.log("✅ All events fetched:", data.events);
      setAllEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("❌ Error fetching events:", err.message);
      setError(err.message);
      setAllEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // ✅ FETCH UPCOMING EVENTS
  // ================================
  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${import.meta.env.VITE_EVENT_URL}/upcoming`;
      console.log("🌍 Fetching upcoming events from:", url);

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch upcoming events");

      console.log("✅ Upcoming events fetched:", data.events);
      setUpcomingEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("❌ Error fetching upcoming events:", err.message);
      setError(err.message);
      setUpcomingEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // ✅ FETCH USER’S HOSTING / ATTENDING / PREVIOUS EVENTS
  // ================================
  const fetchUsersEvents = async (type, providedId) => {
    try {
      setLoading(true);
      setError(null);

      // Wait until user and token are available
      const storedToken = token || localStorage.getItem("token");
      const storedUser = user || JSON.parse(localStorage.getItem("user"));
      const id = providedId || storedUser?._id || storedUser?.id;

      if (!id || !storedToken) {
        console.warn("⚠️ Missing user ID or token. Skipping fetch.");
        return;
      }

      let endpoint = "";
      if (type === "hosting") endpoint = `/hosting/${id}`;
      else if (type === "attending") endpoint = `/attending/${id}`;
      else if (type === "previous") endpoint = `/previous/${id}`;
      else throw new Error("Invalid event type for fetchUsersEvents");

      const url = `${import.meta.env.VITE_EVENT_URL}${endpoint}`;

      console.log(`🌍 Fetching ${type} events from:`, url);
      console.log("🔑 Using token:", storedToken.slice(0, 15) + "...");

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed to fetch ${type} events`);

      setUserEvents((prev) => ({
        ...prev,
        [type]: Array.isArray(data.events) ? data.events : [],
      }));

      console.log(`✅ ${type} events fetched:`, data.events);
    } catch (err) {
      console.error(`❌ Error fetching ${type} events:`, err.message);
      setError(err.message);
      setUserEvents((prev) => ({ ...prev, [type]: [] }));
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // ✅ Auto-fetch all events when query changes
  // ================================
  useEffect(() => {
    fetchAllEvents(query);
  }, [query]);

  // ================================
  // ✅ Provider
  // ================================
  return (
    <EventContext.Provider
      value={{
        user,
        token,
        fetchAllEvents,
        fetchUpcomingEvents,
        fetchUsersEvents,
        allEvents,
        upcomingEvents,
        userEvents,
        query,
        setQuery,
        loading,
        error,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
