export const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gray-800 text-white text-sm">
      <p>&copy; {new Date().getFullYear()} LINK. All rights reserved.</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScdLowz24MrOgv8K9AoRObiLoZD0DFmyyLwRAnhrGedMHLjNQ/viewform?usp=sharing" className="text-blue-400 hover:underline" target="_blank">Contact Us</a>
    </footer>
  );
};

export default Footer;
