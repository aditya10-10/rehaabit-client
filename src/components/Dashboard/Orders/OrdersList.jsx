import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import RateAndReviewModal from "./RateAndReviewModal";
import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { updateOrderStatus } from "../../../slices/orderSlice";

const OrdersList = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localOrders, setLocalOrders] = useState(orders);
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };
  const { user } = useSelector((state) => state.profile);
  const { ratingAndReviews = [], isLoading } = useSelector(
    (state) => state.ratingAndReviews
  );
  const [isRateAndReviewModalOpen, setIsRateAndReviewModalOpen] =
    useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleDropdownClick = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  const handleDropdownChange = (e) => {
    const status = e.target.value;
    dispatch(updateOrderStatus({ orderId: openDropdownId, status }));
        setLocalOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === openDropdownId) {
              return {
                ...order,
                status: { ...order.status, status }
              };
            }
            return order;
          })
        );
    setOpenDropdownId(null);
  }
  const handleRateAndReviewModal = () => {
    setIsRateAndReviewModalOpen(!isRateAndReviewModalOpen);
    setSelectedOrder(null);
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

  // Ensure that the component does not try to render until data is available
  if (isLoading || !Array.isArray(ratingAndReviews)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RateAndReviewModal
        isRateAndReviewModalOpen={isRateAndReviewModalOpen}
        handleRateAndReviewModal={handleRateAndReviewModal}
        serviceIdToPass={serviceIdToPass}
      />
      
      {/**Order Details Modal for Mobile phone */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transition-transform transform duration-300 mx-4">
            <span
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setSelectedOrder(null)}
            >
              <IoIosClose size={24} />
            </span>
            <h2 className="text-xl font-bold mb-6 text-center border-b pb-2">Order Details</h2>

            {selectedOrder.services.map((item) => {
              const userReview =
                ratingAndReviews.find((review) => review.service === item.serviceId);

              const rating = userReview ? userReview.rating : 0;

              return (
                <div key={item._id} className="mb-6 flex flex-col items-center">
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="h-24 w-24 rounded-lg object-cover mb-4 shadow"
                  />
                  <div className="text-sm font-medium">
                    <div><strong>Service Name:</strong> {item.serviceName}</div>
                    <div><strong>Status:</strong> {selectedOrder.status.status}</div>
                    <div><strong>Placed on:</strong> {formattedDate(selectedOrder.createdAt)}</div>
                    {item.qty > 1 && <div><strong>Quantity:</strong> {item.qty}</div>}
                    <div className="text-lg font-semibold"><strong>Total Price:</strong> ₹ {item.qty * item.price}</div>
                  </div>

                  <div className="mt-4">
                    {userReview ? (
                      <div className="flex items-center gap-1">
                        {renderStars(rating)}
                        <span className="text-gray-500 text-sm">({rating}/5)</span>
                      </div>
                    ) : (
                      <button
                        className="bg-blue-500 text-white rounded px-4 py-2"
                        onClick={() => {
                          setServiceIdToPass(item._id);
                          handleRateAndReviewModal();
                        }}
                      >
                        Rate and Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="flex gap-x-10 rounded-t-md border-b px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase">
              Orders
            </th>
            <th className={`text-left text-sm font-medium uppercase ${user.accountType === "Admin" && 'pr-32'}`}>
              Total Price
            </th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-full">
          {localOrders.map((order) => {
            const { _id, services, status, createdAt } = order;
            return services.map((item, index) => {
              const userReview =
                (Array.isArray(ratingAndReviews) &&
                  ratingAndReviews.find(
                    (review) => review.service === item.serviceId
                  )) ||
                null;

              const rating = userReview ? userReview.rating : 0;

              return (
                <tr key={item._id} className="flex gap-x-10 border-b px-6 py-2">

                  {/**Small Screens */}
                  <td className="hidden max-md:block flex-1 gap-x-4" onClick={() => handleOrderClick(order)}>
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold">
                        {item.serviceName}
                      </p>
                      <p className="text-[12px] max-md:block hidden">
                        {new Date(createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="flex w-fit  flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium text-green-500">
                        <FaCheck size={8} />
                        {status.status}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm font-medium hidden max-md:block">
                    ₹ {item.qty * item.price}
                  </td>

                  {/**Large Screens */}
                  <td className="hidden sm:flex flex-1 gap-x-4">
                    <img
                      src={item.thumbnail}
                      alt="thumbnail"
                      className="h-20 w-20 max-md:hidden rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold">
                        {item.serviceName}
                      </p>
                      <p className="text-[12px] md:block max-md:hidden">
                        Placed on: {formattedDate(createdAt)}
                      </p>
                      <p className="text-[12px] max-md:block hidden">
                        Placed on: {new Date(createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="flex w-fit  flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium text-green-500">
                        <FaCheck size={8} />
                        {status.status}
                      </p>

                      {userReview ? (
                        <div className="flex max-md:hidden items-center gap-1">
                          {renderStars(rating)}
                          <span className="text-gray-500 text-sm">
                            ({rating}/5)
                          </span>
                        </div>
                      ) : (
                        <button
                          className="text-blue-500 text-sm max-md:hidden"
                          onClick={() => {
                            setServiceIdToPass(item._id);
                            handleRateAndReviewModal();
                          }}
                        >
                          Rate And Review It
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="text-sm font-medium hidden sm:table-cell">
                    ₹ {item.qty * item.price}
                  </td>
                  {
                    user.accountType === "Admin" && (
                      <div className="relative inline-block">
                        <button
                          className="bg-slate-400 text-white rounded px-4 py-2"
                          onClick={() => handleDropdownClick(_id)}
                        >
                          Edit Order
                        </button>
                        {openDropdownId === _id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
                    )
                  }
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </>
  );
};

export default OrdersList;
