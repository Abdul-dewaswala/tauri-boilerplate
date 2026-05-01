interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col gap-2 border border-gray-200 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition">
      <span className="text-xs uppercase tracking-wider text-gray-500">
        {title}
      </span>
      <div>{children}</div>
    </div>
  );
}

export default Card;