import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function PasswordResetPage() {
  const [password, setPassword] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //   .post(`http://localhost:3000/auth/reset-password/${token}`, {
  };

  return (
    <>
      <div className="h-screen bg-slate-300 flex justify-center items-center">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl text-white">
              Reset Your Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Enter New Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-800"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
