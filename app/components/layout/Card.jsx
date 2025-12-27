export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow p-5 md:p-6 ${className}`}>
      {title && (
        <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
