import { Link } from "react-router-dom";
import TeamSection from "../components/TeamSection.jsx";
import { teamMembers } from "../data/teamMembers.js";

function HomePage() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-panel__content">
          <span className="eyebrow">Task I integrated into the final stack</span>
          <h1 className="hero-panel__title">
            Welcome to Code Guardians inside Booking System Phase 7
          </h1>
          <p className="hero-panel__text">
            The original React team page now lives inside the full application.
            The routed form page and database-backed read view are available from
            the same navigation so the project works as one connected system.
          </p>
          <div className="hero-panel__actions">
            <Link className="button button--primary" to="/request">
              Open the request form
            </Link>
            <Link className="button button--secondary" to="/submissions">
              View saved requests
            </Link>
          </div>
        </div>

        <aside className="hero-card">
          <h2 className="hero-card__title">Integration highlights</h2>
          <ul className="hero-card__list">
            <li>Task I landing page preserved as reusable React components.</li>
            <li>Task J form now posts to your own backend API.</li>
            <li>Submitted rows are stored in PostgreSQL and displayed back.</li>
          </ul>
        </aside>
      </section>

      <TeamSection members={teamMembers} />
    </>
  );
}

export default HomePage;
