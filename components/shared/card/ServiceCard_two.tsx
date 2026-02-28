import React from "react";

export interface ServiceCard_twoProps {
  serviceNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const ServiceCard_two: React.FC<ServiceCard_twoProps> = ({
  serviceNumber,
  title,
  description,
  icon,
  features,
}) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Angled tab on the left */}
      <div className="absolute left-0 top-0 w-16 h-24 bg-[#1a4d3e] rounded-tl-3xl rounded-bl-lg z-10 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{serviceNumber}</span>
      </div>

      {/* Main card */}
      <div className="ml-8 bg-[#1a4d3e] rounded-2xl p-8 pt-6 pb-8 relative overflow-hidden">
        {/* Service label */}
        <div className="text-white/70 text-xs font-medium mb-3 tracking-wide">
          Service_{serviceNumber}
        </div>

        {/* Icon - positioned top right */}
        <div className="absolute top-6 right-6">{icon}</div>

        {/* Title */}
        <h3 className="text-white text-2xl font-bold mb-3 pr-16">{title}</h3>

        {/* Description */}
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-white shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-white text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Decorative angled bottom edge */}
        <div className="absolute bottom-0 right-0 w-32 h-12 bg-[#153a2f] transform skew-x-12 translate-x-8"></div>
      </div>
    </div>
  );
};

export default ServiceCard_two;
