import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { GoStar, GoStarFill } from "react-icons/go";
import { useDispatch } from "react-redux";
import { createRating } from "../../../slices/ratingAndReviewsSlice";

const RateAndReviewModal = ({
  isRateAndReviewModalOpen,
  handleRateAndReviewModal,
  serviceIdToPass,
}) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  console.log(serviceIdToPass);

  const handleMouseEnter = (star) => {
    setHoveredStar(star);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleRatingClick = (star) => {
    setSelectedRating(star);
  };

  const handleSave = () => {
    dispatch(
      createRating({
        rating: selectedRating,
        serviceId: serviceIdToPass,
        review,
      })
    );

    setReview("");
    setSelectedRating(0);
    handleRateAndReviewModal();
  };

  return (
    <AnimatePresence>
      {isRateAndReviewModalOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/4 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleRateAndReviewModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
            >
              <IoIosClose size={24} />
            </button>

            <h1 className="text-lg mb-4">Add Review</h1>

            {/* Rate */}
            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;

                return (
                  <div
                    key={starValue}
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(starValue)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleRatingClick(starValue)}
                  >
                    {hoveredStar >= starValue || selectedRating >= starValue ? (
                      <GoStarFill size={30} className="text-yellow-500" />
                    ) : (
                      <GoStar size={30} className="text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Review */}
            <div className="flex flex-col mb-4">
              <label htmlFor="review" className="mb-2">
                Add Your Experience
              </label>

              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share details of your experience for this course"
                className="outline-none border rounded-md p-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-end gap-2 mt-5">
              <button
                className="text-white bg-red-500 rounded-md p-2"
                onClick={() => {
                  setReview("");
                  setSelectedRating(0);
                  handleRateAndReviewModal();
                }}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-500 rounded-md p-2"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RateAndReviewModal;
