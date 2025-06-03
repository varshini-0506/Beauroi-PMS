import { useForm } from "react-hook-form";

const RequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Maintenance Request Submitted:", data);
    alert("Maintenance Request Submitted Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-100 pt-10 w-full ml-[80px]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#003366]">Maintenance Request Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
            <input
              type="text"
              {...register("unitNumber", { required: "Unit number is required" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              placeholder="Enter your unit number"
            />
            {errors.unitNumber && <p className="text-red-500 text-sm mt-1">{errors.unitNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
            <select 
              {...register("issueType", { required: "Please select an issue type" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
            >
              <option value="">Select issue type...</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="structural">Structural</option>
              <option value="appliance">Appliance</option>
              <option value="other">Other</option>
            </select>
            {errors.issueType && <p className="text-red-500 text-sm mt-1">{errors.issueType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
            <select 
              {...register("priority", { required: "Please select a priority level" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
            >
              <option value="">Select priority...</option>
              <option value="low">Low - Not Urgent</option>
              <option value="medium">Medium - Needs Attention</option>
              <option value="high">High - Urgent</option>
              <option value="emergency">Emergency - Immediate Action Required</option>
            </select>
            {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description", { 
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters"
                }
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              rows="4"
              placeholder="Please describe the issue in detail..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Time</label>
            <select 
              {...register("contactTime", { required: "Please select a preferred contact time" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
            >
              <option value="">Select preferred time...</option>
              <option value="morning">Morning (8AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 8PM)</option>
            </select>
            {errors.contactTime && <p className="text-red-500 text-sm mt-1">{errors.contactTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="tel"
              {...register("contactNumber", { 
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              placeholder="Enter your contact number"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#003366] text-white p-3 rounded-md hover:bg-[#008080] transition-colors duration-300 font-medium"
          >
            Submit Maintenance Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;