import { NavLink } from "react-router-dom";

function Header({ logo }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="site-header__brand" to="/">
          <img className="site-header__logo" src={logo} alt="Code Guardians logo" />
          <div>
            <h1 className="site-header__title">Code Guardians</h1>
            <p className="site-header__subtitle">
              Securing Tomorrow, One Line at a Time.
            </p>
          </div>
        </NavLink>

        <nav className="site-header__nav" aria-label="Frontend navigation">
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " site-header__link--active" : ""}`
            }
            to="/"
            end
          >
            Team page
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " site-header__link--active" : ""}`
            }
            to="/request"
          >
            Request form
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " site-header__link--active" : ""}`
            }
            to="/submissions"
          >
            Saved requests
          </NavLink>
          <a className="site-header__link" href="/login">
            Existing login
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
