const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gray-800 text-white text-sm">
      <p>&copy; {new Date().getFullYear()} SOS. All rights reserved.</p>
      <a href="/contact" className="text-blue-400 hover:underline">Contact Us</a>
    </footer>
  );
};

export default Footer;
