import { useEffect, useState } from "react";
import StatusMessage from "../components/StatusMessage.jsx";

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function SubmissionsPage() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadEntries() {
      try {
        const response = await fetch("/api/project-inquiries");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Could not load submissions.");
        }

        if (isMounted) {
          setEntries(payload.data || []);
          setState({ loading: false, error: "" });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            loading: false,
            error: error.message || "Could not load submissions.",
          });
        }
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="content-panel">
      <div className="section-heading">
        <span className="eyebrow">Read operation</span>
        <h1 className="section-heading__title">Saved project requests</h1>
        <p className="section-heading__text">
          This extra subpage fetches previously stored rows from the backend API
          and shows them in the frontend, which covers the higher-level version
          of the assignment.
        </p>
      </div>

      {state.loading ? <StatusMessage>Loading saved requests...</StatusMessage> : null}
      {state.error ? <StatusMessage type="error">{state.error}</StatusMessage> : null}

      {!state.loading && !state.error ? (
        <div className="submission-grid">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <article className="submission-card" key={entry.id}>
                <div className="submission-card__top">
                  <h2>{entry.full_name}</h2>
                  <span>{formatDate(entry.created_at)}</span>
                </div>
                <p className="submission-card__meta">
                  {entry.email}
                  {entry.company_name ? ` · ${entry.company_name}` : ""}
                </p>
                <p className="submission-card__badge">{entry.project_type}</p>
                <p className="submission-card__date">
                  Preferred date: {formatDate(entry.preferred_date)}
                </p>
                <p className="submission-card__message">{entry.message}</p>
              </article>
            ))
          ) : (
            <div className="empty-state">
              No requests have been saved yet. Submit the form to create the
              first entry.
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default SubmissionsPage;
