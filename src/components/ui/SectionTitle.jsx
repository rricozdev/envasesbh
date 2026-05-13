export default function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-4xl font-extrabold text-dark leading-tight tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}
