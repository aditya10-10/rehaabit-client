import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import RateAndReviewModal from "./RateAndReviewModal";
import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";

const OrdersList = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { ratingAndReviews } = useSelector((state) => state.ratingAndReviews);

  // console.log(ratingAndReviews);
  // console.log(orders);

  const [isRateAndReviewModalOpen, setIsRateAndReviewModalOpen] =
    useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);

  const handleRateAndReviewModal = () => {
    setIsRateAndReviewModalOpen(!isRateAndReviewModalOpen);
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

  return (
    <>
      <RateAndReviewModal
        isRateAndReviewModalOpen={isRateAndReviewModalOpen}
        handleRateAndReviewModal={handleRateAndReviewModal}
        serviceIdToPass={serviceIdToPass}
      />

      <table className="w-full">
        <thead>
          <tr className="flex gap-x-10 rounded-t-md border-b px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase">
              Orders
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Total Price
            </th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-full">
          {orders.map((order) => {
            const { _id, services, status, createdAt } = order;

            return services.map((item, index) => {
              const userReview = ratingAndReviews.find(
                (review) => review.service === item.serviceId
              );

              const rating = userReview ? userReview.rating : 0;

              return (
                <tr key={item._id} className="flex gap-x-10 border-b px-6 py-2">
                  <td className="flex flex-1 gap-x-4">
                    <img
                      src={item.thumbnail}
                      alt="thumbnail"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold">
                        {item.serviceName}
                      </p>
                      <p className="text-[12px]">
                        Placed on: {formattedDate(createdAt)}
                      </p>

                      <p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium text-green-500">
                        <FaCheck size={8} />
                        {status.status}
                      </p>

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
                  </td>
                  <td className="text-sm font-medium">
                    ₹ {item.qty * item.price}
                  </td>
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
