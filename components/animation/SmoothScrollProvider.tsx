import { ReactLenis } from "lenis/react";
function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisOptions = {
    lerp: 0.5,
    duration: 0.9,
    smoothTouch: false,
    smooth: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrollProvider;
