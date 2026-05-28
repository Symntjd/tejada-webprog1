import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

function SignUpPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    type: "viewer",
    username: "",
    password: "",
    address: "",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createUser(formValues);

      setSuccessMessage("Account created successfully. You can now sign in.");

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create account."
      );
    }
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
        Sign Up
      </p>

      <h1 className="mt-3 text-3xl font-bold text-black">
        Create your account
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        Join the dog breed guide and start browsing helpful breed articles in a
        clean and organized layout.
      </p>

      {errorMessage && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Age
            </label>
            <input
              type="text"
              name="age"
              value={formValues.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-black">
              Gender
            </label>
            <select
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formValues.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            placeholder="Create username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/signin" className="font-semibold text-blue-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;