import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState({ hosting: [], attending: [], previous: [] });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      localStorage.setItem("userId", storedUser._id || storedUser.id);
      setUserEvents({hosting : [],  })
    }
  }, []);

  const fetchUsersEvents = async (type, host) => {
    if (!host && type === "hosting") {
      host = localStorage.getItem("host");
    }

    let url = "";
    if (type === "hosting" && host) {
  url = `${import.meta.env.VITE_EVENT_URL}/hosting/${encodeURIComponent(host)}`;
}

    if (type === "attending") {
      url = `${import.meta.env.VITE_EVENT_URL}`/attending/`${user?._id}`;
    }
    if (type === "previous") {
      url = `${import.meta.env.VITE_EVENT_URL}`/previous/`${user?._id}`;
    }

    if (!url) return [];

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

      setUserEvents((prev) => ({ ...prev, [type]: Array.isArray(data.events) ? data.events : [] }));
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEvents = async (searchQuery = "", appliedFilters = {}) => {
  try {
    setLoading(true);
    setError(null);

    let url = `${import.meta.env.VITE_EVENT_URL}/all`;
    const params = new URLSearchParams
    if (searchQuery) params.append("query", searchQuery);
    if (appliedFilters.location) params.append("location", appliedFilters.location)
    if (appliedFilters.category) params.append("category", appliedFilters.category)
    if (appliedFilters.tags) params.append("tags", appliedFilters.tags)
    if (appliedFilters.price === "free") params.append("maxPrice", 0)
    if (appliedFilters.price === "paid") params.append("minPrice", 1)

    if ([...params].length > 0){
      url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
    }


    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch events");
    console.log(data);
    
    setAllEvents(Array.isArray(data.events) ? data.events : []);
  } catch (err) {
    setError(err.message);
    setAllEvents([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAllEvents(query);
  }, [query]);

  return (
    <EventContext.Provider
      value={{
        user,
        token,
        fetchUsersEvents,
        fetchAllEvents,
        userEvents,
        allEvents,
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