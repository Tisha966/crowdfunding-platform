import React from "react";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";
import "./Dashboard1.css";

const Dashboard1 = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.5)",
      },
    ],
  };

  const orders = [
    { name: "John C.", price: "$55", status: "Completed" },
    { name: "Matthew K.", price: "$78", status: "Pending" },
    { name: "Dominic Q.", price: "$45", status: "Cancelled" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Droiddash</div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Key Metrics</li>
            <li className="active">Analytics</li>
            <li>Documents</li>
            <li>Notifications</li>
          </ul>
        </nav>
        <div className="profile">
          <img src="/profile.png" alt="User" />
          <p>WP AR Pascal</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Viewer Demographics</h1>
          <input type="text" placeholder="Type keywords to search..." />
        </header>

        {/* Dashboard Content */}
        <div className="dashboard">
          {/* Cards */}
          <div className="cards">
            <div className="card">
              <h3>Total Sales</h3>
              <p>$59,690</p>
              <small>+12.4%</small>
            </div>
            <div className="card">
              <h3>Total Orders</h3>
              <p>4,865</p>
              <small>-5.2%</small>
            </div>
            <div className="card">
              <h3>Total Customers</h3>
              <p>2,245</p>
              <small>+3.4%</small>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <h2>Sales Report</h2>
            {/* <Line data={chartData} /> */}
          </div>

          {/* Orders List */}
          <div className="order-list-container">
            <h2>Orders List</h2>
            <table className="order-list">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard1;


