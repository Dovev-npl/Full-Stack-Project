import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import logo from "../assets/images/logo-no-background.png";

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Header logo={logo} />
      <main className="app-main">
        <div className="app-container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
