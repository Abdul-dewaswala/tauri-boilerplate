import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  description?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  icon,
  actions,
  description
}: SectionHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            {icon && (
              <div className="text-3xl flex-shrink-0">{icon}</div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {actions}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-600 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
