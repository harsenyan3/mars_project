import './SuccessFlash.css';

interface SuccessFlashProps {
  show: boolean;
}

export function SuccessFlash({ show }: SuccessFlashProps) {
  if (!show) return null;

  return (
    <div className="success-flash" role="status">
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>We'll get back to you soon 🎸</p>
      </div>
    </div>
  );
}
