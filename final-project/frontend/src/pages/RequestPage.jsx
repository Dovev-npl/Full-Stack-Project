import { useState } from "react";
import StatusMessage from "../components/StatusMessage.jsx";

const initialForm = {
  fullName: "",
  email: "",
  companyName: "",
  projectType: "Full-stack booking flow",
  preferredDate: "",
  message: "",
};

function RequestPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: "", message: "" });
    setErrors({});

    try {
      const response = await fetch("/api/project-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        const nextErrors = {};

        if (Array.isArray(payload.errors)) {
          payload.errors.forEach((error) => {
            nextErrors[error.field] = error.msg;
          });
        }

        setErrors(nextErrors);
        setSubmitState({
          type: "error",
          message: payload.error || "The request could not be saved.",
        });
        return;
      }

      setFormData(initialForm);
      setSubmitState({
        type: "success",
        message:
          payload.message ||
          "Your request was saved successfully and sent through the full stack flow.",
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: "The server could not be reached. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <span className="eyebrow">Task J routed subpage</span>
        <h1 className="section-heading__title">Send a new project request</h1>
        <p className="section-heading__text">
          This form now sends its data to the Booking System backend instead of
          `httpbin`, and the backend stores the submission in PostgreSQL.
        </p>
      </div>

      <div className="request-layout">
        <form className="request-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Full name</span>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <small>{errors.fullName}</small>
          </label>

          <label className="field">
            <span>Email address</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
            <small>{errors.email}</small>
          </label>

          <label className="field">
            <span>Company name</span>
            <input
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Optional"
            />
            <small>{errors.companyName}</small>
          </label>

          <label className="field">
            <span>Project type</span>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option>Full-stack booking flow</option>
              <option>Frontend audit</option>
              <option>Database integration</option>
              <option>Security review</option>
            </select>
            <small>{errors.projectType}</small>
          </label>

          <label className="field">
            <span>Preferred date</span>
            <input
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
            />
            <small>{errors.preferredDate}</small>
          </label>

          <label className="field field--full">
            <span>Project summary</span>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe what you want to build or improve."
            />
            <small>{errors.message}</small>
          </label>

          <div className="field field--full">
            <button className="button button--primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save request"}
            </button>
            <StatusMessage type={submitState.type}>
              {submitState.message}
            </StatusMessage>
          </div>
        </form>

        <aside className="info-card">
          <h2>What happens on submit?</h2>
          <ol className="flow-list">
            <li>React sends JSON with `fetch()` to `/api/project-inquiries`.</li>
            <li>Express validates the fields and inserts the row.</li>
            <li>PostgreSQL stores the request in `project_inquiries`.</li>
            <li>The frontend shows success or error feedback immediately.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}

export default RequestPage;
