import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ImgCard = ({ image, title, desc, link }) => {
  return (
    <>
      <article className="overflow-hidden max-w-xs rounded-lg bg-gray-800 shadow-lg mx-3">
        <img alt="" src={image} className="h-56 w-full object-cover" />

        <div className="p-4 sm:p-6">
          <h3 className="text-lg font-medium text-white">{title}</h3>

          <p className="mt-2 text-sm/relaxed text-wrap text-gray-300">{desc}</p>

          <div className="flex items-center justify-center text-center mt-6 text-white">
            <Link
              to={link}
              className="p-2 flex gap-1 items-center text-sm rounded bg-fuchsia-600 hover:bg-fuchsia-800 font-medium text-white"
            >
              Try Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};
export default ImgCard;
