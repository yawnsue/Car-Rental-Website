import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', dailyRate: '', imageUrl: '' });

  useEffect(() => { // will grab all the vecicls when the page loads up
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleAddVehicle = async (e) => { // This should add a new vehicles to the fleet
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle)
      });
      if (response.ok) {
        setNewVehicle({ make: '', model: '', dailyRate: '', imageUrl: '' }); // Clears the form
        fetchVehicles(); // Refreshes the list
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (id) => { // Almost forgot to add a delete function 
    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchVehicles(); // Refreshs the list after delete
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Administrator Dashboard - Fleet Management</h2>
      
      {/* Form to Create a New Vehicle */}
      <div style={{ border: '1px solid black', padding: '15px', marginBottom: '20px' }}>
        <h3>Add New Vehicle</h3>
        <form onSubmit={handleAddVehicle}>
          <input type="text" placeholder="Make (e.g., Honda)" value={newVehicle.make} onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})} required style={{ marginRight: '10px' }} />
          <input type="text" placeholder="Model (e.g., Pilot)" value={newVehicle.model} onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})} required style={{ marginRight: '10px' }} />
          <input type="number" placeholder="Daily Rate ($)" value={newVehicle.dailyRate} onChange={(e) => setNewVehicle({...newVehicle, dailyRate: e.target.value})} required style={{ marginRight: '10px' }} />
          <input type="text" placeholder="Image URL (Optional)" value={newVehicle.imageUrl} onChange={(e) => setNewVehicle({...newVehicle, imageUrl: e.target.value})} style={{ marginRight: '10px' }} />
          <button type="submit">Add to Fleet</button>
        </form>
      </div>

      {/* List to Read and Delete Vehicles */}
      <h3>Current Fleet Inventory</h3>
      {vehicles.length === 0 ? <p>No vehicles in the database.</p> : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {vehicles.map((vehicle) => (
            <li key={vehicle._id} style={{ borderBottom: '1px solid gray', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong>{vehicle.make} {vehicle.model}</strong> - ${vehicle.dailyRate}/day
              </span>
              <button onClick={() => handleDeleteVehicle(vehicle._id)} style={{ backgroundColor: 'red', color: 'white' }}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
