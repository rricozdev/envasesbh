export function HighlightCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition duration-300">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-primary group-hover:scale-110 transition">
        <Icon size={22} />
      </div>

      <h3 className="text-lg font-semibold text-secondary mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}