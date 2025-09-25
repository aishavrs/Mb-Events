import {createContext, useState, useEffect} from "react";
import PropTypes from "prop-types";

export const EventContext = createContext()

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState({hosting: [], attending: [], previous: []})
    const [token, setToken] = useState(null);
    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)


    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken){
            SetUser(storedUser);
            setToken(storedToken);
        }
    }, [])

    const fetchEvents = async (type) => {
        if(!user?._id) return [];

        try {
            setLoading(true);
            setError(null);

            let url = "";
            if(type === "hosting") url = `${import.meta.env.VITE_BASE_URL}/events/hosting/${user._id}`;
            if(type === "attending") url = `${import.meta.env.VITE_BASE_URL}/events/attending/${user._id}`;
            if(type === "previous") url = `${import.meta.env.VITE_BASE_URL}/events/previous/${user._id}`;

            const res = await fetch(url,{
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json()
            setEvents((prev)=>({prev, [type]: data}));
        } catch (error) {
            setError(error.message);
            return[];

        } finally{
            setLoading(false);
        }
    }

    return (
        <EventContext.Provider value={{user, token, fetchEvents, loading, error, events}}>
            {children}
        </EventContext.Provider>
    )
};

EventProvider.propTypes = {
    children: PropTypes.node.isRequired,
}