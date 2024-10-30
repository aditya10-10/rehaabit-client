import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import RateAndReviewModal from "./RateAndReviewModal";
import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import StatusBadge from "../../../utils/StatusBadge";
import { updateOrderStatus } from "../../../slices/orderSlice";
import { cancelOrder } from "../../../slices/orderSlice";
import { IoMdClose } from "react-icons/io";
import EditOrderModal from "./EditOrderModal";
import CancelOrderModal from "./CancelOrderModal";
import { BallTriangle } from "react-loader-spinner";

const OrdersList = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localOrders, setLocalOrders] = useState(orders);
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const { ratingAndReviews = [], isLoading } = useSelector(
    (state) => state.ratingAndReviews
  );

  const defaultStages = [
    "Pending",
    "Confirmed",
    "Professional Assigned",
    "On the Way",
    "Service Completed"
  ];
  const [isRateAndReviewModalOpen, setIsRateAndReviewModalOpen] = useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleCancelOrderClick = (orderId) => {
    setOrderToCancel(orderId);
    setIsCancelModalOpen(true); // Open the confirmation modal
  };

  const handleCancelConfirm = () => {
    const cancelText = user.accountType === 'Admin' ? 'cancelled by provider' : 'cancelled by customer';
    dispatch(cancelOrder({ orderId: orderToCancel }));
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id === orderToCancel) {
          return {
            ...order,
            status: { statuses: [...order.status.statuses, { status: cancelText, updatedAt: new Date().toISOString() }] }
          };
        }
        return order;
      })
    );
    setIsCancelModalOpen(false);
  };


  const handleDropdownClick = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDropdownChange = (e) => {
    setNewStatus(e.target.value);
    setIsEditModalOpen(true);
  };
  const handleEditConfirm = () => {
    setIsEditModalOpen(false);

    dispatch(updateOrderStatus({ orderId: openDropdownId, status: newStatus }));

    setLocalOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id === openDropdownId) {
          return {
            ...order,
            status: {
              ...order.status,
              statuses: [
                ...order.status.statuses,
                { status: newStatus, updatedAt: new Date().toISOString() }
              ]
            }
          };
        }
        return order;
      })
    );

    setOpenDropdownId(null);
  };
  const handleRateAndReviewModal = () => {
    setIsRateAndReviewModalOpen(!isRateAndReviewModalOpen);
    setSelectedOrder(null);
  };

  const handleTrackOrderClick = (orderId) => {
    if (selectedOrderId === orderId) {
      setTrackingVisible(!trackingVisible);
    } else {
      setSelectedOrderId(orderId);
      setTrackingVisible(true);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index + 1 <= rating ? (
          <GoStarFill className="text-yellow-400" />
        ) : (
          <GoStar className="text-gray-400" />
        )}
      </span>
    ));
  };

  if (isLoading || !Array.isArray(ratingAndReviews)) {
    return <div className="flex justify-center items-center w-100% h-100% bg-white">
    <BallTriangle
      height={100}
      width={100}
      radius={5}  
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
  }

  const getTrackingStages = (order) => {
    const completedStages = order.status.statuses.map((status) => status.status.toLowerCase());
    const latestStatusIndex = completedStages.length - 1; // Index of the latest status

    // Check for cancellation status
    const isCancelled = completedStages.includes("cancelled by provider") ||
      completedStages.includes("cancelled by customer");

    if (isCancelled) {
      // Find the index of the first cancellation status
      const cancellationIndex = Math.max(
        completedStages.indexOf("cancelled by provider"),
        completedStages.indexOf("cancelled by customer")
      );

      // Return stages up to the cancellation point, then add cancellation stages
      return {
        trackingStages: [
          ...completedStages.slice(0, cancellationIndex).map(s => s?.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")),
          "Cancelled",
          "Refund Initiated",
          "Refund Completed"
        ],
        latestStatusIndex
      };
    }

    // If no cancellation status, return default stages with latest status index
    return {
      trackingStages: defaultStages,
      latestStatusIndex
    };
  };


  return (
    <>
      <RateAndReviewModal
        isRateAndReviewModalOpen={isRateAndReviewModalOpen}
        handleRateAndReviewModal={handleRateAndReviewModal}
        serviceIdToPass={serviceIdToPass}
      />
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
      />
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEditConfirm}
        status={newStatus}
      />
      <div className="w-full">
        {localOrders.map((order) => {
          const { _id, services, status, createdAt, orderId } = order;
          const statuses = status.statuses;
          const { trackingStages, latestStatusIndex } = getTrackingStages(order);
          return services.map((item) => {
            const userReview = ratingAndReviews.find(
              (review) => review.service === item.serviceId
            );
            const rating = userReview ? userReview.rating : 0;

            return (

              <div
                key={item._id}
                className="border font-arial rounded-lg p-4 mb-4 shadow-md  lg:pl-52"
              >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg md:text-xl">
                    Order #{orderId}
                  </h3>
                  <div className="text-right">
                    <span className="text-gray-500">Status: </span>
                    <StatusBadge status={statuses[statuses.length - 1].status} />
                  </div>
                </div>

                {/* Light line divider */}
                <div className="border-b w-full mb-4"></div>

                {/* Service and Price Section */}
                <div className="flex gap-4 items-start">
                  <img
                    src={item.thumbnail}
                    alt="Service Thumbnail"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg md:text-xl">
                      {item.serviceName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Scheduled for: {formattedDate(createdAt)}
                    </p>
                    <p className="text-sm md:text-sm">
                      <span className="font-semibold text-slate-700"> Total Price: </span>
                      ₹ {item.qty * item.price}
                    </p>
                    {statuses[statuses.length - 1].status === "service completed" && (
                      <div className="mt-2">
                        {userReview ? (
                          <div className="flex items-center gap-1">
                            {renderStars(rating)}
                            <span className="text-gray-500 text-sm">
                              ({rating}/5)
                            </span>
                          </div>
                        ) : (
                          <button
                            className="text-blue-500 text-sm"
                            onClick={() => {
                              setServiceIdToPass(item._id);
                              handleRateAndReviewModal();
                            }}
                          >
                            Rate And Review It
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons Section */}
                <div className={`mt-4 mx-10 max-sm:mx-0 max-sm:gap-4 max-md:gap-0 grid w-auto grid-cols-1 sm:grid-cols-2 ${user.accountType === "Admin" ? "gap-4" : "max-lg:gap-52 gap-96"}`}>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full px-1 py-2 rounded shadow-lg transition duration-300"
                    onClick={() => handleTrackOrderClick(_id)} // Updated
                  >
                    Track Order
                  </button>
                  <button
                    className={`${["cancelled by customer", "cancelled by provider", "refund initiated", "refund completed", "service completed"].includes(statuses[statuses.length - 1].status)
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed" // Disabled styling
                      : "bg-red-500 hover:bg-red-600 text-white" // Active styling
                      } w-full px-1 py-2 rounded shadow-lg transition duration-300`}
                    onClick={() => handleCancelOrderClick(_id)}
                    disabled={["cancelled by customer", "cancelled by provider", "refund initiated", "refund completed", "service completed"].includes(statuses[statuses.length - 1].status)} // Disable button for specific statuses
                  >
                    Cancel Order
                  </button>

                  {user.accountType === "Admin" && (
                    <div className="relative inline-block mt-4 sm:mt-0">
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white w-full px-4 py-2 rounded shadow-lg transition duration-300"
                        onClick={() => handleDropdownClick(_id)}
                      >
                        Edit Order
                      </button>
                      {openDropdownId === _id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                          <select
                            className="block w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={handleDropdownChange}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="professional assigned">Professional Assigned</option>
                            <option value="on the way">On the Way</option>
                            <option value="service started">Service Started</option>
                            <option value="service completed">Service Completed</option>
                            <option value="payment pending">Payment Pending</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled by customer">Cancelled by Customer</option>
                            <option value="cancelled by provider">Cancelled by Provider</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="refund initiated">Refund Initiated</option>
                            <option value="refund completed">Refund Completed</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tracking Info Section */}
                {trackingVisible && selectedOrderId === _id && (
                  <div className="mt-12">
                    <div className="border-b w-full mb-8"></div>
                    {/* For larger screens */}
                    <div className="hidden sm:flex justify-between items-center relative">
                      {trackingStages?.map(
                        (stage, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center"
                            style={{ flex: 1, textAlign: "center" }}
                          >
                            <div
                              className={`h-2 w-full ${index <= latestStatusIndex ? "bg-green-500" : "bg-gray-300"}`}
                              style={{
                                marginTop: "10px",
                                ...(index === 0
                                  ? { width: "50%", marginLeft: "50%" }
                                  : index === trackingStages.length - 1
                                    ? { width: "50%", marginRight: "50%" }
                                    : {}),
                              }}
                            ></div>

                            <div
                              className={`h-6 w-6 rounded-full ${index <= latestStatusIndex ? "bg-green-500" : "bg-gray-300"
                                }`}
                              style={{ position: "relative", top: "-15px" }}
                            />
                            <span className="text-sm mt-1">{stage}</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* For mobile view (vertical layout) */}
                    <div className="sm:hidden fixed inset-0 bg-white z-50 p-4 w-1/2 h-screen">
                      <button
                        className="absolute top-2 right-2 text-red-500 mt-14 text-3xl"
                        onClick={() => setTrackingVisible(false)}
                      >
                        <IoMdClose />
                      </button>

                      <div className="flex flex-col items-start h-full mt-32">
                        {trackingStages?.map(
                          (stage, index) => (
                            <div key={index} className="flex w-full items-start mb-0">
                              {/* Stage name on the left */}
                              <span className="text-sm mt-0 w-1/2">{stage}</span>

                              <div className="flex flex-col items-center w-1/2">
                                {/* Dot for stages */}
                                <div
                                  className={`h-6 w-6 rounded-full ${index <= latestStatusIndex ? "bg-green-500" : "bg-gray-300"} mb-0`}
                                />
                                {/* Line section */}
                                {index < 4 && (
                                  <div
                                    className={`h-full w-1 ${index < latestStatusIndex ? "bg-green-500" : "bg-gray-300"}`}
                                    style={{ minHeight: "90px" }} // Ensures the line covers the entire space
                                  />
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          });
        })}
      </div>
    </>
  );
};

export default OrdersList;
