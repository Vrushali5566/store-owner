import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function StoreOwnerDashboard() {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchMyStore();
    fetchRatings();
    fetchAverage();
  }, []);

  const fetchMyStore = async () => {
    const res = await api.get("/stores/my");
    setStore(res.data);
  };

  const fetchRatings = async () => {
    const res = await api.get("/ratings/owner/my-store");
    setRatings(res.data);
  };

  const fetchAverage = async () => {
    const res = await api.get("/stores/owner/average-rating");
    setAverage(res.data);
  };

  const updatePassword = async () => {
    await api.patch("/users/update-password", { newPassword });
    alert("Password updated successfully");
    setNewPassword("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Store Owner Dashboard</h2>

      {store ? (
        <div>
          <h3>Your Store: {store.name}</h3>
          <p>Address: {store.address}</p>

          <h3>Average Rating: {average.toFixed(2)}</h3>

          <h3>Users Who Rated Your Store</h3>
          {ratings.length === 0 ? (
            <p>No ratings yet.</p>
          ) : (
            ratings.map((rating) => (
              <div
                key={rating.id}
                style={{ border: "1px solid #ccc", padding: 8, margin: 5 }}
              >
                <p>
                  <strong>User:</strong> {rating.user.name} ({rating.user.email})
                </p>
                <p>
                  <strong>Rating:</strong> {rating.score}
                </p>
              </div>
            ))
          )}

          <h3>Update Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={updatePassword}>Update</button>

          <h3 style={{ marginTop: 20 }}>
            <button onClick={logout}>Logout</button>
          </h3>
        </div>
      ) : (
        <p>Loading store...</p>
      )}
    </div>
  );
}
