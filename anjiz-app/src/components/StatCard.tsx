interface StatCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, children, className = "" }: StatCardProps) => (
  <div className={`card bg-base-100 shadow-sm p-6 border border-gray-200 ${className}`}>
    <h3 className="font-bold mb-4 text-sm uppercase text-gray-500">{title}</h3>
    {children}
  </div>
);