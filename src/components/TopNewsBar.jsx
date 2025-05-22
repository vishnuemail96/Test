import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const TopNewsBar = () => {
  return (
    <div className="w-full bg-[#1E3A8A] text-white text-sm font-light py-2">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2 sm:gap-0">
        {/* Left Section: Follow Us */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span>Follow us</span>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-[#FFB703]">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="hover:text-[#FFB703]">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="hover:text-[#FFB703]">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="hover:text-[#FFB703]">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
          <span className="hover:underline cursor-pointer">New Batches</span>
        </div>

        {/* Right Section: Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <span className="flex items-center gap-1">
            <FaPhone className="text-xs" />
            <a href="tel:+91987654321">+91 987654321</a>
          </span>
          <span className="flex items-center gap-1">
            <FaEnvelope className="text-xs" />
            <a href="mailto:support@orbilearn.com">support@orbilearn.com</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNewsBar;
