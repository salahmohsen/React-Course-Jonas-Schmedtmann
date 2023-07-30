import Search from "./Search";
import NumberResults from "./NumberResults";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumberResults />
    </nav>
  );
}
