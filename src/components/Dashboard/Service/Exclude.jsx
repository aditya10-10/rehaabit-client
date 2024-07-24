import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createExclude } from '../../../slices/serviceSlice';

const Exclude = () => {
  const dispatch = useDispatch();

  const {serviceId} = useSelector((state) => state.service)
  const {excludes} = useSelector((state) => state.service.service)

  console.log(serviceId)

  const [formData, setFormData] = useState({
    serviceId: "",
    content: "",
  });

  formData.serviceId =  serviceId

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(createExclude({formData}));
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
          Exclusions
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

      {excludes && excludes.map((include) => {
        const {_id, content} = include;

        return <span key={_id} className='flex'>{content}</span>
      })}

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

export default Exclude