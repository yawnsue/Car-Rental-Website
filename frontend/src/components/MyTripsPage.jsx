import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "../assets/black-rock-logo.png";

const demoTrips = [
  {
    _id: "demo-trip-2",
    vehicleName: "2022 Honda CRV Hybrid",
    totalPrice: 205,
    dateRange: "March 12 - March 15, 2026",
    status: "Completed",
    imageClass: "trip-image trip-image-2",
    canCancel: false,
  },
  {
    _id: "demo-trip-3",
    vehicleName: "2024 Toyota Grand Highlander",
    totalPrice: 390,
    dateRange: "January 3 - January 6, 2026",
    status: "Completed",
    imageClass: "trip-image trip-image-3",
    canCancel: false,
  },
  {
    _id: "demo-trip-4",
    vehicleName: "2023 Chevrolet Camaro ZL1",
    totalPrice: 1150,
    dateRange: "December 5 - December 8, 2025",
    status: "Completed",
    imageClass: "trip-image trip-image-4",
    canCancel: false,
  },
  {
    _id: "demo-trip-5",
    vehicleName: "2022 Kia Forte",
    totalPrice: 180,
    dateRange: "August 17 - August 20, 2025",
    status: "Completed",
    imageClass: "trip-image trip-image-5",
    canCancel: false,
  },
];

function MyTripsPage() {
  const navigate = useNavigate();

  const trips = useMemo(() => {
    const localReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    return [...localReservations, ...demoTrips];
  }, []);

  const handleCancel = (tripId) => {
    const currentReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const updated = currentReservations.filter((trip) => trip._id !== tripId);
    localStorage.setItem("reservations", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <img
                src={logo}
                alt="Black Rock Solutions logo"
                className="sidebar-logo"
              />
              <div className="sidebar-brand-copy">
                <h1>Black Rock Solutions</h1>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button className="sidebar-nav-item" onClick={() => navigate("/browse")}>
                Dashboard
              </button>
              <button className="sidebar-nav-item active" onClick={() => navigate("/trips")}>
                My Trips
              </button>
              <button className="sidebar-nav-item" onClick={() => navigate("/vehicles")}>
                Browse Vehicles
              </button>
              <button className="sidebar-nav-item" onClick={() => navigate("/reservations")}>
                Reservations
              </button>
              <button className="sidebar-nav-item" onClick={() => navigate("/account")}>
                Account
              </button>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <button className="btn btn-secondary dashboard-btn-sm" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <section className="dashboard-card dashboard-topbar">
            <div className="dashboard-topbar-copy">
              <h2>My Trips</h2>
              <p>View and manage all of your reservation activity.</p>
            </div>

            <div className="dashboard-topbar-actions">
              <button
                className="btn btn-primary dashboard-btn-sm"
                onClick={() => navigate("/vehicles")}
              >
                Browse Vehicles
              </button>
            </div>
          </section>

          <section className="dashboard-card trips-panel">
            <div className="trips-panel-header">
              <div className="trips-panel-copy">
                <h3>All Trips</h3>
                <p>Your reservation history and upcoming drives in one place.</p>
              </div>
            </div>

            <div className="trips-list">
              {trips.map((trip) => (
                <article className="trip-card" key={trip._id}>
                  <div className={trip.imageClass || "trip-image"}></div>

                  <div className="trip-info">
                    <div className="trip-title-row">
                      <h4 className="trip-title">{trip.vehicleName}</h4>
                      <span
                        className={`trip-status ${
                          trip.status === "Upcoming" || trip.status === "Confirmed"
                            ? "upcoming"
                            : "completed"
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>

                    <div className="trip-meta">
                      <div className="trip-meta-row">
                        <span className="trip-meta-dot"></span>
                        <span>{trip.dateRange}</span>
                      </div>

                      <div className="trip-meta-row">
                        <span className="trip-meta-dot"></span>
                        <span>Total: ${trip.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="trip-actions">
                    <button
                      className="btn dashboard-btn-sm trip-btn-outline"
                      onClick={() => navigate(`/trip-details/${trip._id}`)}
                    >
                      View Details
                    </button>

                    {trip.canCancel !== false && (
                      <button
                        className="btn dashboard-btn-sm trip-btn-danger"
                        onClick={() => handleCancel(trip._id)}
                      >
                        Cancel Trip
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyTripsPage;