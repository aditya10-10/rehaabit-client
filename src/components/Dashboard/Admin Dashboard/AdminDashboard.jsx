import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  FaUsers,
  FaDollarSign,
  FaClipboardCheck,
  FaClock,
  FaConciergeBell,
  FaCheckCircle,
  FaTimesCircle,
  FaTasks,
  FaSmile,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserCount } from "../../../slices/usersSlice";
import { getAllRatingsAndAverage } from "../../../slices/ratingAndReviewsSlice";
import { getTotalPartnerCount } from "../../../slices/partnerSlice";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state.users.userCount);
  const isLoadingUsers = useSelector((state) => state.users.isLoading);
  const { ratingAndReviews, isLoadingRatings, error } = useSelector(
    (state) => state.ratingAndReviews
  );
  const totalPartnerCount = useSelector(
    (state) => state.partner.totalPartnerCount
  );
  const isLoadingPartners = useSelector((state) => state.partner.isLoading);

  useEffect(() => {
    dispatch(getUserCount());
    dispatch(getAllRatingsAndAverage());
    dispatch(getTotalPartnerCount());
  }, [dispatch]);

  // Data for the Line Chart (Booking Trends)
  const lineData = {
    labels: [
      "5k",
      "10k",
      "15k",
      "20k",
      "25k",
      "30k",
      "35k",
      "40k",
      "45k",
      "50k",
      "55k",
      "60k",
    ],
    datasets: [
      {
        label: "Sales",
        data: [30, 40, 50, 64, 40, 35, 45, 38, 60, 50, 48, 45],
        borderColor: "#3b82f6",
        fill: true,
        tension: 0.3,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* Top KPI Cards */}
      <div style={styles.kpiContainer}>
        {/* Total Users */}
        <div style={styles.kpiCard}>
          <FaUsers size={35} style={{ ...styles.icon, color: "#34D399" }} />
          <div>
            <h3 style={styles.kpiTitle}>Total Users</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingUsers
                ? "Loading..."
                : userCount?.totalUsers?.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Total Services Provided */}
        <div style={styles.kpiCard}>
          <FaConciergeBell
            size={35}
            style={{ ...styles.icon, color: "#F59E0B" }}
          />
          <div>
            <h3 style={styles.kpiTitle}>Total Services</h3>
            <h2 style={styles.kpiValue}>12,345</h2>
          </div>
        </div>

        {/* Total Revenue */}
        <div style={styles.kpiCard}>
          <FaDollarSign
            size={35}
            style={{ ...styles.icon, color: "#F472B6" }}
          />
          <div>
            <h3 style={styles.kpiTitle}>Total Revenue</h3>
            <h2 style={styles.kpiValue}>$150,000</h2>
          </div>
        </div>

        {/* Active Service Providers */}
        <div style={styles.kpiCard}>
          <FaTasks size={35} style={{ ...styles.icon, color: "#3B82F6" }} />
          <div>
            <h3 style={styles.kpiTitle}>Active Providers</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingPartners
                ? "Loading..."
                : totalPartnerCount.totalPartners}
            </h2>
          </div>
        </div>
      </div>

      <div style={styles.kpiContainer}>
        {/* Pending Bookings */}
        <div style={styles.kpiCard}>
          <FaClock size={35} style={{ ...styles.icon, color: "#8B5CF6" }} />
          <div>
            <h3 style={styles.kpiTitle}>Pending Bookings</h3>
            <h2 style={styles.kpiValue}>540</h2>
          </div>
        </div>

        {/* Completed Services */}
        <div style={styles.kpiCard}>
          <FaCheckCircle
            size={35}
            style={{ ...styles.icon, color: "#10B981" }}
          />
          <div>
            <h3 style={styles.kpiTitle}>Completed Services</h3>
            <h2 style={styles.kpiValue}>9,876</h2>
          </div>
        </div>

        {/* Canceled Services */}
        <div style={styles.kpiCard}>
          <FaTimesCircle
            size={35}
            style={{ ...styles.icon, color: "#EF4444" }}
          />
          <div>
            <h3 style={styles.kpiTitle}>Canceled Services</h3>
            <h2 style={styles.kpiValue}>432</h2>
          </div>
        </div>

        {/* New Service Requests */}
        <div style={styles.kpiCard}>
          <FaClipboardCheck
            size={35}
            style={{ ...styles.icon, color: "#F97316" }}
          />
          <div>
            <h3 style={styles.kpiTitle}>New Requests</h3>
            <h2 style={styles.kpiValue}>65 (weekly)</h2>
          </div>
        </div>
      </div>

      <div style={styles.kpiContainer}>
        {/* Service Satisfaction Score */}
        <div style={styles.kpiCard}>
          <FaSmile size={35} style={{ ...styles.icon, color: "#FFD700" }} />
          <div>
            <h3 style={styles.kpiTitle}>Satisfaction Score</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingRatings ? "Loading..." : ratingAndReviews.averageRating}{" "}
              / 5
            </h2>
          </div>
        </div>
      </div>

      {/* Line Chart for Sales */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Sales Details</h3>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Open Sans, sans-serif",
  },
  kpiContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  kpiCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "23%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  icon: {
    marginRight: "10px",
  },
  kpiTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
  },
  kpiValue: {
    margin: "5px 0",
    fontSize: "28px",
    fontWeight: "bold",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  chartTitle: {
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#374151",
  },
};

export default AdminDashboard;