interface MenuItem {
  icon: string;
  label: string;
  onClick: () => void;
}

interface FloatingCircleMenuProps {
  items: MenuItem[];
  visible: boolean;
}

const RADIUS = 80;

export function FloatingCircleMenu({ items, visible }: FloatingCircleMenuProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 100 }}
    >
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
          <button
            key={item.label}
            className={`
              pointer-events-auto absolute left-1/2 top-1/2
              flex size-10 items-center justify-center rounded-full
              bg-white/90 text-lg shadow-lg
              transition-all duration-200 ease-out
              hover:scale-110 hover:bg-white active:scale-95
              ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
            `}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${visible ? "scale(1)" : "scale(0.75)"}`,
              transitionDelay: visible ? `${index * 40}ms` : "0ms",
            }}
            title={item.label}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
            }}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
