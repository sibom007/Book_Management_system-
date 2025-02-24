import { FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <div className=" p-5 bg-tertiary  w-full">
      <div className="flex justify-around mt-4">
        <div className="w-1/3">
          <h2 className="font-semibold">Contact Us</h2>
          <p>info@example.com</p>
        </div>
        <div className="w-1/3">
          <h2 className="font-semibold">Follow Us</h2>
          <p>Social Media Links</p>
          <div className="flex gap-5">
            <FcGoogle className="size-7 mt-2" />
            <FaSquareInstagram className="size-7 mt-2 text-Ssecondary" />
            <FaLinkedin className="size-7 mt-2 text-blue-200" />
          </div>
        </div>
        <div className="w-1/3">
          <h2 className="font-semibold">User Preferences</h2>
          <p>Your favorite topics: Technology, Design, Development</p>
        </div>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
  );
};

export default Footer;
