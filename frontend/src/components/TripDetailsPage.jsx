import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "../assets/black-rock-logo.png";
import trips from "../data/tripsData";

function TripDetailsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const localReservations =
    JSON.parse(localStorage.getItem("reservations")) || [];

  const normalizedLocalReservations = localReservations.map((trip) => ({
    id: trip._id,
    vehicleName: trip.vehicleName || "Reserved Vehicle",
    totalPrice: trip.totalPrice || 0,
    dateRange: trip.dateRange || "Trip dates unavailable",
    status: trip.status || "Upcoming",
    imageClass: trip.imageClass || "trip-image",
    pickupLocation: trip.pickupLocation || "Orlando, FL",
    dropoffLocation: trip.pickupLocation || "Orlando, FL",
    milesDriven: 0,
    tripType: "Upcoming Reservation",
    bookedOn: new Date().toLocaleDateString(),
    insurance: "Standard Coverage",
    description:
      "This reservation was created in the live reservation flow and saved for the current session.",
  }));

  const allTrips = [...normalizedLocalReservations, ...trips];

  const trip = allTrips.find((t) => t.id === tripId);

  if (!trip) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-top">
              <div className="sidebar-brand">
                <img src={logo} alt="Black Rock Solutions logo" className="sidebar-logo" />
                <div className="sidebar-brand-copy">
                  <h1>Black Rock Solutions</h1>
                </div>
              </div>

              <nav className="sidebar-nav">
                <button className="sidebar-nav-item" onClick={() => navigate("/browse")}>
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
              </nav>
            </div>

            <div className="sidebar-bottom">
              <button className="btn btn-secondary dashboard-btn-sm" onClick={() => navigate("/")}>
                Logout
              </button>
            </div>
          </aside>

          <main className="dashboard-main">
            <section className="dashboard-card trips-panel">
              <div className="empty-state">
                <h3>Trip not found.</h3>
                <p>The selected trip could not be located.</p>
                <div className="empty-state-actions">
                  <button
                    className="btn btn-primary dashboard-btn-sm"
                    onClick={() => navigate("/trips")}
                  >
                    Back to My Trips
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <img src={logo} alt="Black Rock Solutions logo" className="sidebar-logo" />
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
              <h2>Trip Details</h2>
              <p>Review reservation details, status, and trip information.</p>
            </div>

            <div className="dashboard-topbar-actions">
              <button
                className="btn btn-secondary dashboard-btn-sm"
                onClick={() => navigate("/trips")}
              >
                Back to My Trips
              </button>
            </div>
          </section>

          <section className="vehicle-details-layout">
            <article className="dashboard-card vehicle-details-main">
              <div className={`vehicle-details-image ${trip.imageClass}`}></div>

              <div className="vehicle-details-content">
                <div className="vehicle-details-price-row">
                  <div>
                    <p className="vehicle-details-label">Trip</p>
                    <h3 className="vehicle-details-price">{trip.vehicleName}</h3>
                  </div>

                  <span className="vehicle-details-type-badge">{trip.status}</span>
                </div>

                <div className="vehicle-details-section">
                  <h4>Trip Overview</h4>
                  <p>{trip.description}</p>
                </div>

                <div className="vehicle-details-section">
                  <h4>Trip Summary</h4>
                  <div className="trip-details-grid">
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Date Range</span>
                      <strong>{trip.dateRange}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Total Cost</span>
                      <strong>${trip.totalPrice}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Miles Driven</span>
                      <strong>{trip.milesDriven}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Trip Type</span>
                      <strong>{trip.tripType}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Pickup</span>
                      <strong>{trip.pickupLocation}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Dropoff</span>
                      <strong>{trip.dropoffLocation}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Booked On</span>
                      <strong>{trip.bookedOn}</strong>
                    </div>
                    <div className="trip-detail-box">
                      <span className="trip-detail-box-label">Insurance</span>
                      <strong>{trip.insurance}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <aside className="dashboard-card vehicle-details-side">
              <div className="vehicle-details-side-section">
                <p className="vehicle-details-label">Reservation Status:</p>
                <h4>{trip.status}</h4>
                <p>
                  Reservation details are being shown from either the saved session
                  reservation or the static trip dataset.
                </p>
              </div>

              <div className="vehicle-details-side-section">
                <p className="vehicle-details-label">Notes</p>
                <ul className="vehicle-details-list">
                  <li>Trip costs shown in USD</li>
                  <li>Session reservations appear here immediately</li>
                  <li>Status and dates can later be fully API-driven</li>
                </ul>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TripDetailsPage;