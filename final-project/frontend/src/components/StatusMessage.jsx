function StatusMessage({ type = "info", children }) {
  if (!children) {
    return null;
  }

  return <p className={`status-message status-message--${type}`}>{children}</p>;
}

export default StatusMessage;
