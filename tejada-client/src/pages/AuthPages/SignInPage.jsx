import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

function SignInPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

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

    try {
      const response = await loginUser(formValues);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.type);
      localStorage.setItem("firstName", response.data.firstName);

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
        Sign In
      </p>

      <h1 className="mt-3 text-3xl font-bold text-black">Welcome back</h1>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        Sign in to continue exploring dog breed articles and organized breed
        information.
      </p>

      {errorMessage && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="h-4 w-4 accent-blue-900" />
            Remember me
          </label>

          <a href="#" className="font-semibold text-blue-900 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-900 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default SignInPage;