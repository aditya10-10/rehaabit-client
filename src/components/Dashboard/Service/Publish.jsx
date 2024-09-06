import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editService } from "../../../slices/serviceSlice";

const Publish = () => {
  const dispatch = useDispatch();

  const { serviceId } = useSelector((state) => state.service);
  const { status, priceStatus } = useSelector((state) => state.service.service);

  //   console.log(serviceId);
  //   console.log(includes);

  const [formData, setFormData] = useState({
    serviceId: "",
    status: status || "Draft",
    priceStatus: priceStatus || "priced",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, serviceId }));
  }, [serviceId]);

  const handleStatusChange = () => {
    const updatedStatus = formData.status === "Draft" ? "Published" : "Draft";
    setFormData((prevFormData) => ({ ...prevFormData, status: updatedStatus }));

    dispatch(editService({ formData: { ...formData, status: updatedStatus } }));
  };

  const handlePriceStatusChange = () => {
    const updatedPriceStatus =
      formData.priceStatus === "priced" ? "non-priced" : "priced";
    setFormData((prevFormData) => ({
      ...prevFormData,
      priceStatus: updatedPriceStatus,
    }));

    dispatch(
      editService({
        formData: { ...formData, priceStatus: updatedPriceStatus },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);
    dispatch(editService({ formData }));
  };

  return (
    <form className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Public Settings
        </label>

        <div className="flex flex-col">
          <div>
            <input
              id="status"
              name="status"
              type="checkbox"
              onChange={handleStatusChange}
              className="mr-2"
              checked={formData.status === "Published"}
            />

            {formData.status === "Published" ? (
              <span className="text-gray-500">This Service is Published</span>
            ) : (
              <span className="text-gray-500">Make this Service Public</span>
            )}
          </div>

          <div>
            <input
              id="priceStatus"
              name="priceStatus"
              type="checkbox"
              onChange={handlePriceStatusChange}
              className="mr-2"
              checked={formData.priceStatus === "non-priced"}
            />

            {formData.priceStatus === "non-priced" ? (
              <span className="text-gray-500">This Service is Non Priced</span>
            ) : (
              <span className="text-gray-500">
                Make this Service Non Priced
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Publish;
