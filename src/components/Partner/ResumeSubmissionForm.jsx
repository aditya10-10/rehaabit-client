import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCandidateInformation } from "../../slices/careersSlice";
import { toast } from "sonner";

const ResumeSubmissionForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    resume: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track form submission

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];

      // Check if the file is a PDF
      if (file && file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFormData((prevFormData) => ({ ...prevFormData, resume: null }));
        return;
      }

      // Check if the file size is greater than 100 KB (100 * 1024 bytes)
      if (file && file.size > 100 * 1024) {
        setError("File size must be less than 100 KB.");
        setFormData((prevFormData) => ({ ...prevFormData, resume: null }));
        return;
      }

      setError(""); // Clear error if the file is valid
      setFormData((prevFormData) => ({
        ...prevFormData,
        resume: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Please upload a valid resume.");
      return;
    }

    setIsSubmitting(true); // Disable button once submission starts

    try {
      // Dispatch action to add candidate information
      dispatch(addCandidateInformation({ formData }));

      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        resume: null,
      });

      // Show success notification using Sooner
      toast.success("Your resume has been submitted successfully!");
    } catch (error) {
      // Show error notification using Sooner
      toast.error("Error submitting your resume.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission is complete
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-5 md:px-20 py-10 h-[auto] md:h-[1023px]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(253, 96, 55, 0.12), rgba(117, 45, 220, 0.06), rgba(255, 255, 255, 0.06), rgba(117, 45, 220, 0.06), rgba(253, 96, 55, 0.06))`,
      }}
    >
      <h2 className="text-2xl md:text-4xl capitalize font-bold mb-4">
        Contact Hiring Team
      </h2>
      <p className="text md:text-lg text-gray-500 text-center w-full md:w-[45%] mb-10">
        Ideally, we expect you to apply through our open job listings on
        LinkedIn. Please use this form if you want to reach out to the hiring
        team directly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 shadow-custom-shadow rounded-lg w-full md:w-[25%] p-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700"
          >
            Resume (PDF only, max 100 KB)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-purple-700 hover:file:bg-blue-100"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResumeSubmissionForm;
