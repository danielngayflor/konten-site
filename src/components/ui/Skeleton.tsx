type Props = {
  className?: string;
};

export function Skeleton({ className = '' }: Props) {
  return <div className={`skeleton-block ${className}`} />;
}
