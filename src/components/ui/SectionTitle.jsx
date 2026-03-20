export default function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold text-secondary uppercase italic tracking-tighter ${className}`}
    >
      {children}
    </h2>
  );
}
