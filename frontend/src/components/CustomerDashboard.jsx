import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "../assets/black-rock-logo.png";

const demoTrips = [
  {
    _id: "reservation-1",
    vehicleName: "2023 Ford Mustang GT",
    totalPrice: 400,
    dateRange: "June 24 - June 27, 2026",
    status: "Upcoming",
    imageClass: "trip-image",
    canCancel: true,
  },
  {
    _id: "demo-trip-2",
    vehicleName: "2022 Honda CRV Hybrid",
    totalPrice: 205,
    dateRange: "March 12 - March 15, 2026",
    status: "Completed",
    imageClass: "trip-image trip-image-2",
    canCancel: false,
  },
];

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const userId = user?._id || user?.id;
      const localReservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

      try {
        if (!userId) {
          setBookings(localReservations);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/bookings/my-bookings/${userId}`,
          {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        if (!response.ok) {
          setBookings(localReservations);
          return;
        }

        const data = await response.json();

        const normalizedBackend = Array.isArray(data)
          ? data.map((booking) => ({
              _id: booking._id,
              vehicleName:
                booking.vehicle?.make && booking.vehicle?.model
                  ? `${booking.vehicle.make} ${booking.vehicle.model}`
                  : "Reserved Vehicle",
              totalPrice: booking.totalPrice,
              dateRange: `${booking.startDate?.slice(0, 10) || ""} - ${
                booking.endDate?.slice(0, 10) || ""
              }`,
              status: booking.status || "Upcoming",
              imageClass: "trip-image",
              canCancel: true,
            }))
          : [];

        setBookings([...normalizedBackend, ...localReservations]);
      } catch (err) {
        console.error(err);
        setBookings(localReservations);
      }
    };

    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (err) {
      console.error(err);
    }

    const updated = bookings.filter((b) => b._id !== bookingId);
    setBookings(updated);
    localStorage.setItem(
      "reservations",
      JSON.stringify(updated.filter((b) => String(b._id).startsWith("local-")))
    );
    alert("Booking cancelled.");
  };

  const displayTrips = bookings.length > 0 ? bookings : demoTrips;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "Administrator";

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
              <button className="sidebar-nav-item active" onClick={() => navigate("/browse")}>
                Dashboard
              </button>
              <button className="sidebar-nav-item" onClick={() => navigate("/trips")}>
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
              {isAdmin && (
                <button className="sidebar-nav-item" onClick={() => navigate("/admin")}>
                  Admin Dashboard
                </button>
              )}
            </nav>
          </div>

          <div className="sidebar-bottom">
            <button
              className="btn btn-secondary dashboard-btn-sm"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <section className="dashboard-card dashboard-topbar">
            <div className="dashboard-topbar-copy">
              <h2>Good to see you.</h2>
              <p>Here’s what’s happening with your rentals.</p>
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

          <div className="dashboard-stack">
            <section className="summary-grid">
              <article className="dashboard-card summary-card">
                <div className="summary-card-top">
                  <div className="summary-icon">📅</div>
                  <p className="summary-card-label">Upcoming Trips</p>
                </div>
                <p className="summary-card-value">{displayTrips.length}</p>
                <p className="summary-card-meta">Reservations synced from app flow</p>
              </article>

              <article className="dashboard-card summary-card">
                <div className="summary-card-top">
                  <div className="summary-icon">🚗</div>
                  <p className="summary-card-label">Total Trips</p>
                </div>
                <p className="summary-card-value">{displayTrips.length}</p>
                <p className="summary-card-meta">Current Session</p>
              </article>

              <article className="dashboard-card summary-card">
                <div className="summary-card-top">
                  <div className="summary-icon">⭐</div>
                  <p className="summary-card-label">Member Since</p>
                </div>
                <p className="summary-card-value">Aug 2025</p>
                <p className="summary-card-meta">Thank you for being with us!</p>
              </article>
            </section>

            <section className="dashboard-card trips-panel">
              <div className="trips-panel-header">
                <div className="trips-panel-copy">
                  <h3>My Trips</h3>
                </div>

                <button
                  className="btn btn-secondary dashboard-btn-sm"
                  onClick={() => navigate("/trips")}
                >
                  View All
                </button>
              </div>

              <div className="trips-list">
                {displayTrips.map((trip) => (
                  <article className="trip-card" key={trip._id}>
                    <div className={trip.imageClass}></div>

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
                          onClick={() => handleCancelBooking(trip._id)}
                        >
                          Cancel Trip
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;