export function SectionHeading({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      {children ? <p className="mt-5 text-lg text-muted">{children}</p> : null}
    </div>
  );
}
