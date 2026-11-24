import React from "react";

interface MippciLogoProps {
  className?: string;
  imgClassName?: string;
  compact?: boolean;
}

export default function MippciLogo({ className, imgClassName, compact = false }: MippciLogoProps) {
  const vsccLogoPath = "/logos/LOGOTIPO VSCC_H-VSCC.png";

  if (compact) {
    return (
      <div 
        id="mippci-logo-header-compact" 
        className={`overflow-hidden rounded-xl flex items-center justify-center shadow-xs bg-white border border-slate-200 shrink-0 p-1.5 ${className || 'h-10 w-auto px-2'}`}
      >
        <img
          src={vsccLogoPath}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== 'https://share.google/r70V5bt80YPpJqQg8') {
              target.src = 'https://share.google/r70V5bt80YPpJqQg8';
            }
          }}
          alt="Vicepresidencia Sectorial de Comunicación y Cultura"
          className={`w-full h-full object-contain ${imgClassName || ''}`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      id="mippci-logo-header" 
      className={`overflow-hidden rounded-2xl flex items-center justify-center shadow-md bg-white border border-slate-200 shrink-0 ${className || 'w-full max-w-[320px] md:max-w-[420px] h-[96px]'}`}
    >
      <img
        src={vsccLogoPath}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== 'https://share.google/r70V5bt80YPpJqQg8') {
            target.src = 'https://share.google/r70V5bt80YPpJqQg8';
          }
        }}
        alt="Vicepresidencia Sectorial de Comunicación y Cultura"
        className={`w-full h-full object-contain p-2 ${imgClassName || ''}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export { MippciLogo };
