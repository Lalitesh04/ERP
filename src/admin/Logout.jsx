import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

export default function Logout() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect((e) => {
        setLoading(true);
        localStorage.removeItem("admin");
        localStorage.removeItem("student");
        localStorage.removeItem("faculty");
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            {loading && <Loader />}
        </div>
    );
}
