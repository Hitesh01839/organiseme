import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  return (
    <nav>
      <div className="hidden md:block">
        <DesktopNav />
      </div>

      <div className="block md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
