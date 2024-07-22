import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createInclude } from '../../../slices/serviceSlice';

const Include = () => {
  const dispatch = useDispatch();

  const {service} = useSelector((state) => state.service)

  console.log(service?.service?._id)

  
  const [formData, setFormData] = useState({
    serviceId: "",
    content: "",
  });

  formData.serviceId = "669cf0b7ddc8a269cec61d43" || service?.service?._id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(createInclude({formData}))
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Inclusions
        </label>
        
        <textarea
          id="content"
          name="content"
          type="text"
          value={formData.content}
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

export default Include