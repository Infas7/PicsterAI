import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const LandingPage = () => {
  return (
    <>
      <section className="bg-slate-100">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-bold sm:text-5xl">
              Generate images using
              <strong className="font-bold mt-3 text-fuchsia-700 sm:block">
                {" "}
                Artificial Intelligence.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Bring your imaginary to the reality using the power of AI
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                className="flex items-center gap-1 w-full rounded bg-fuchsia-600 px-12 py-3 text-md font-medium text-white shadow hover:bg-fuchsia-700 focus:outline-none focus:ring active:bg-fuchsia-500 sm:w-auto"
                to="/signin"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingPage;
