import { useLocation, Link } from "react-router-dom";
import {
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/") {
    return (
      <footer className="bg-white shadow-lg border-t border-gray-300 rounded-2xl ">
        {/* Top Area */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-7 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600 text-sm">
          {/* Logo + Description */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-0">
              <img
                src={SignWhispersLogo}
                alt="Logo"
                className="size-16 inset-0"
              />
              <h1 className="text-base sm:text-lg font-bold text-black inset-1">
                Sign<span className="text-blue-700">Whispers</span>
              </h1>
            </div>

            <p className="leading-relaxed max-w-xs mx-auto sm:mx-0">
              Making communication accessible for everyone through the power of
              artificial intelligence.
            </p>
          </div>

          {/* Product */}
          <div className="text-center sm:text-left">
            <h3 className="text-black font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h3 className="text-black font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-blue-600 transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="text-center sm:text-left">
            <h3 className="text-black font-bold mb-4">Connect</h3>
            <div className="flex justify-center sm:justify-start gap-4 text-lg sm:text-xl">
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 transition duration-300 transform hover:scale-110"
              >
                <FaTwitter />
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 transition duration-300 transform hover:scale-110"
              >
                <FaGithub />
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 transition duration-300 transform hover:scale-110"
              >
                <FaFacebook />
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 transition duration-300 transform hover:scale-110"
              >
                <FaInstagram />
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 transition duration-300 transform hover:scale-110"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        <BottomBar />
      </footer>
    );
  }

  if (path === "/reviews") {
    return (
      <footer className="bg-white border-t border-gray-200 ">
        <BottomBar />
      </footer>
    );
  }

  return null;
};

/* Bottom Bar */
const BottomBar = () => (
  <div className="border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 text-center sm:text-left gap-2">
      <p>© 2024 SignWhispers. All rights reserved.</p>

      <div className="flex gap-5">
        <Link to="/" className="hover:text-blue-600 transition duration-300">
          Privacy Policy
        </Link>
        <Link to="/" className="hover:text-blue-600 transition duration-300">
          Terms of Service
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
