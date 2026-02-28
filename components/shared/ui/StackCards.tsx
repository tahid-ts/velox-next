"use client";
import React, { useEffect, useRef, ReactNode } from "react";

interface StackCardsProps {
  children: ReactNode;
  cardHeight?: number;
  marginY?: number;
}

const StackCards: React.FC<StackCardsProps> = ({
  children,
  cardHeight = 320,
  marginY = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const scrollY = -containerRef.current.getBoundingClientRect().top;

      itemsRef.current.forEach((card, i) => {
        if (!card) return;

        const dist = scrollY - i * (cardHeight + marginY);

        if (dist <= 0) {
          card.style.transform = "translateY(0) scale(1)";
        } else {
          const scale = Math.max(0.75, 1 - dist * 0.0007);
          card.style.transform = `translateY(${i * marginY}px) scale(${scale})`;
        }
      });

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cardHeight, marginY]);

  const count = React.Children.count(children);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${count * (cardHeight + marginY) + 600}px`, // ← this line is critical
      }}
    >
      {React.Children.map(children, (child, i) => (
        <div
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          className="sticky rounded-2xl shadow-2xl border border-gray-200 overflow-hidden will-change-transform transition-transform duration-200"
          style={{
            top: "60px",
            height: `${cardHeight}px`,
            width: "min(92%, 440px)",
            margin: "0 auto",
            background: "white",
            zIndex: count - i,
          }}
        >
          <div className="p-6 h-full">{child}</div>
        </div>
      ))}
    </div>
  );
};

export default StackCards;
