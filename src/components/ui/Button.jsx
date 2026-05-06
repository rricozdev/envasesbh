export default function Button({ children, variant = "primary", className }) {
  const styles = {
    primary: "bg-primary text-white hover:brightness-110 active:scale-95",
    outline:
      "border-2 border-primary text-primary hover:bg-white/10 active:scale-95",
  };

  return (
    <button
      className={`w-full py-4 rounded-lg font-bold transition-all font-primary cursor-pointer ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
