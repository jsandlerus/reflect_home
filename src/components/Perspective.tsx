import React from "react";

type PerspectiveProps = React.PropsWithChildren<{
  className?: string;
  perspective?: number; // px
  origin?: string; // e.g. '50% 50%'
  rotateX?: number; // deg
  rotateY?: number; // deg
  rotateZ?: number; // deg
  translateX?: string | number; // accepts '2%' or px number
  translateY?: string | number; // accepts '2%' or px number
  translateZ?: string | number; // px or string
  scale?: number;
}>;
export default function Perspective({
  className,
  children,
  perspective = 1400,
  origin = 'top left',
  rotateX = 47,
  rotateY = 31,
  rotateZ = 324,
  translateX = '2%',
  translateY =100,
  translateZ = 0,
  scale = 1.2
}: PerspectiveProps) {
  const toCssLength = (value: string | number): string =>
    typeof value === 'number' ? `${value}px` : value;

  return (
    <section className="relative"
    style={{
        paddingTop: '72px',
    }}>
        <div className="w-full max-w-[1024px]"
        style={{
            marginInline: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
        }}>
        <div className="relative user-select-none "
        style={{
            width: '100vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
        }}>
        <div className="w-full h-[900px]"
        aria-label="A screenshot of the Linear app showing the inbox and an issue that's currently in progress">
    <div
    className={`relative w-full h-full`}
    style={{
      contain: 'strict',
      perspective: '4000px',
      perspectiveOrigin: '100% 0',
      transformStyle: 'preserve-3d'
    }}
  >
    <div 
    className="absolute inset-0 rounded-lg border border-white/10"
      style={{
        border: '1px solid #1e1e1e',
        background: '#08090a',
        width: '1600px',
        height: '900px',
        margin: '200px auto auto',
        transformOrigin: 'top left',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        transform: 'translateX(2%) scale(1.2) rotateX(47deg) rotateY(31deg) rotate(324deg)',
      }}
    >
        {children}
      </div>
        </div>
        </div>
    </div>
    </div>
    </section>
  );
}


