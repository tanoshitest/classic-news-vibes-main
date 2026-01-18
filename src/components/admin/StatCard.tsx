interface StatCardProps {
  label: string;
  value: string;
  description?: string;
}

const StatCard = ({ label, value, description }: StatCardProps) => {
  return (
    <div className="bg-background border border-foreground/20 p-6">
      <p className="text-sm text-muted-foreground font-sans">{label}</p>
      <p className="font-serif text-4xl font-bold text-foreground mt-2">{value}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};

export default StatCard;
