import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHowDoesItWorks } from "../../../slices/serviceSlice";

const HowDoesItWorks = () => {
  const dispatch = useDispatch();

  const {serviceId} = useSelector((state) => state.service)

  console.log(serviceId)

  const [formData, setFormData] = useState({
    serviceId: "",
    point: "",
  });

  formData.serviceId = serviceId

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(createHowDoesItWorks({formData}))
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="howDoesItWorks"
        >
          How Does It Works?
        </label>
        <textarea
          id="point"
          name="point"
          type="text"
          value={formData.point}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default HowDoesItWorks