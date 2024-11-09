import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  FaUsers,
  FaRupeeSign,
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
import { getTotalServicesCount } from "../../../slices/serviceSlice";
import { getRevenue } from "../../../slices/orderSlice";
import { getAllServices } from "../../../slices/serviceSlice";
import { getAllOrders } from "../../../slices/orderSlice";
import { ThreeDots } from "react-loader-spinner";

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
  const { ratingAndReviews, isLoadingRatings } = useSelector(
    (state) => state.ratingAndReviews
  );
  const totalServicesCount = useSelector(
    (state) => state.service.totalServicesCount
  );
  const isLoadingServices = useSelector((state) => state.service.isLoading);
  const totalPartnerCount = useSelector(
    (state) => state.partner.totalPartnerCount
  );
  const isLoadingPartners = useSelector((state) => state.partner.isLoading);
  const totalRevenue = useSelector((state) => state.order.totalRevenue);
  const isOrderLoading = useSelector((state) => state.order.isOrderLoading);
  const allOrders = useSelector((state) => state.order.orders);
  const pendingOrdersCount = allOrders?.filter(
    (order) => order.status.status === "pending"
  ).length;
  const refundCompleted = allOrders?.filter(
    (order) => order.status.status === "refund completed"
  ).length;
  const completedServicesCount = allOrders?.filter(
    (order) => order.status.status === "service completed"
  ).length;
  const canceledServicesCount = allOrders?.filter(
    (order) =>
      order.status.status === "cancelled by customer" ||
      order.status.status === "cancelled by provider"
  ).length;

  useEffect(() => {
    dispatch(getUserCount());
    dispatch(getAllRatingsAndAverage());
    dispatch(getTotalPartnerCount());
    dispatch(getTotalServicesCount());
    dispatch(getRevenue());
    dispatch(getAllServices());
    dispatch(getAllOrders());
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
      {/* One single container for all KPI Cards */}
      <div style={styles.kpiContainer} >

        {/* Row 1 */}
        <div style={styles.kpiCard}>
          <FaUsers size={35} style={{ ...styles.icon, color: "#34D399" }} />
          <div>
            <h3 style={styles.kpiTitle}>Total Users</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingUsers ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                userCount?.totalUsers?.toLocaleString()
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaConciergeBell size={35} style={{ ...styles.icon, color: "#F59E0B" }} />
          <div>
            <h3 style={styles.kpiTitle}>Total Services</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingServices ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                totalServicesCount
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaRupeeSign size={35} style={{ ...styles.icon, color: "#F472B6" }} />
          <div>
            <h3 style={styles.kpiTitle}>Total Revenue</h3>
            <h2 style={styles.kpiValue}>
              {isOrderLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                `₹${totalRevenue.toLocaleString()}`
              )}
            </h2>
          </div>
        </div>

        {/* Row 2 */}
        <div style={styles.kpiCard}>
          <FaTasks size={35} style={{ ...styles.icon, color: "#3B82F6" }} />
          <div>
            <h3 style={styles.kpiTitle}>Active Providers</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingPartners ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                totalPartnerCount.totalPartners
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaClock size={35} style={{ ...styles.icon, color: "#8B5CF6" }} />
          <div>
            <h3 style={styles.kpiTitle}>Pending Bookings</h3>
            <h2 style={styles.kpiValue}>
              {isOrderLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                pendingOrdersCount
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaCheckCircle size={35} style={{ ...styles.icon, color: "#10B981" }} />
          <div>
            <h3 style={styles.kpiTitle}>Completed Services</h3>
            <h2 style={styles.kpiValue}>
              {isOrderLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                completedServicesCount
              )}
            </h2>
          </div>
        </div>

        {/* Row 3 */}
        <div style={styles.kpiCard}>
          <FaTimesCircle size={35} style={{ ...styles.icon, color: "#EF4444" }} />
          <div>
            <h3 style={styles.kpiTitle}>Canceled Services</h3>
            <h2 style={styles.kpiValue}>
              {isOrderLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                canceledServicesCount
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaClipboardCheck size={35} style={{ ...styles.icon, color: "#F97316" }} />
          <div>
            <h3 style={styles.kpiTitle}>Refund Completed</h3>
            <h2 style={styles.kpiValue}>
              {isOrderLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                refundCompleted
              )}
            </h2>
          </div>
        </div>

        <div style={styles.kpiCard}>
          <FaSmile size={35} style={{ ...styles.icon, color: "#FFD700" }} />
          <div>
            <h3 style={styles.kpiTitle}>Satisfaction Score</h3>
            <h2 style={styles.kpiValue}>
              {isLoadingRatings ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : ratingAndReviews &&
                ratingAndReviews.averageRating !== undefined ? (
                ratingAndReviews.averageRating.toFixed(2)
              ) : (
                "N/A"
              )}{" "}
              / 5
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    height: "100vh",
   // Full viewport height
  },
  kpiContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns by default (large screens)
    gap: "10px",
    marginBottom: "40px",
    width: "100%", // Full width
    maxWidth: "1400px", // Maximum width for large screens
    marginLeft: "22px", // Center horizontally
    marginRight: "auto", // Center horizontally

  },
  kpiCard: {
    width:"345px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  kpiTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  kpiValue: {
    fontSize: "24px",
    fontWeight: "700",
  },
  icon: {
    marginRight: "10px",
  },

  // Media Queries for responsiveness
  "@media (max-width: 1200px)": {
    kpiContainer: {
      gridTemplateColumns: "repeat(2, 1fr)", // 2 columns on medium-large screens
    },
  },
  "@media (max-width: 1024px)": {
    kpiContainer: {
      gridTemplateColumns: "1fr", // 1 column on medium screens
    },
    container: {
      height: "auto", // Increase height for medium screens
    },
  },
  "@media (max-width: 768px)": {
    kpiContainer: {
      gridTemplateColumns: "1fr", // 1 column for small screens
      gap: "30px", // Increase gap between cards for better spacing
    },
    container: {
      height: "auto", // Increase height for small screens
    },
    kpiCard: {
      padding: "25px", // Adjust padding for better spacing on small screens
    },
    kpiTitle: {
      fontSize: "14px", // Adjust title size for smaller screens
    },
    kpiValue: {
      fontSize: "22px", // Adjust value size
    },
    icon: {
      marginRight: "8px", // Adjust icon margin
    },
  },
  "@media (max-width: 480px)": {
    kpiCard: {
      padding: "15px", // Further adjust padding for smaller mobile screens
    },
    kpiTitle: {
      fontSize: "12px", // Further adjust title size
    },
    kpiValue: {
      fontSize: "20px", // Further adjust value size
    },
    icon: {
      marginRight: "5px", // Further adjust icon margin
    },
  },
};






export default AdminDashboard;
