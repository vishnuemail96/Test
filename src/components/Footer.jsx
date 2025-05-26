import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] py-8 ">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold">OrbiLearn</h3>
            <p className="mt-2">Empowering your learning journey</p>
          </div>

          {/* Center Section - Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-[#19A7CD]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/courses" className="hover:text-[#19A7CD]">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-[#19A7CD]">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-[#19A7CD]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Section - Social Icons */}
            <div>
              <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#146C94]">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="hover:text-[#146C94]">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="hover:text-[#146C94]">
                  <FaLinkedinIn size={20} />
                </a>
                <a href="#" className="hover:text-[#146C94]">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 text-center">
          <p>© 2025 OrbiLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
