"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * GSAP-powered custom cursor with 100ms lag follower.
 * - Default: 12px walnut dot
 * - Hover [data-cursor="view"]: 60px ring with "VIEW" label
 * - Hover [data-cursor="drag"]: ring with "DRAG" label
 * - Hover [data-cursor="link"] / a / button: amber fill, 28px
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Skip on touch devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pos };
    const ringPos = { ...pos };

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xToDot(pos.x);
      yToDot(pos.y);
      xToRing(pos.x);
      yToRing(pos.y);
      dotPos.x = pos.x;
      dotPos.y = pos.y;
      ringPos.x = pos.x;
      ringPos.y = pos.y;
    };
    window.addEventListener("mousemove", onMove);

    // Variant detection via [data-cursor] / a / button
    const setVariant = (variant: string) => {
      switch (variant) {
        case "view":
          gsap.to(ring, { width: 76, height: 76, borderColor: "#6B4226", backgroundColor: "rgba(107,66,38,0)", duration: 0.3 });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(label, { opacity: 1, duration: 0.25 });
          label.textContent = "VIEW";
          break;
        case "drag":
          gsap.to(ring, { width: 76, height: 76, borderColor: "#A0622A", backgroundColor: "rgba(160,98,42,0)", duration: 0.3 });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(label, { opacity: 1, duration: 0.25 });
          label.textContent = "DRAG";
          break;
        case "add":
          gsap.to(ring, { width: 76, height: 76, borderColor: "#6B4226", backgroundColor: "rgba(107,66,38,0)", duration: 0.3 });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          gsap.to(label, { opacity: 1, duration: 0.25 });
          label.textContent = "ADD";
          break;
        case "link":
          gsap.to(ring, { width: 36, height: 36, borderColor: "#A0622A", backgroundColor: "rgba(160,98,42,0.2)", duration: 0.3 });
          gsap.to(dot, { scale: 1.3, backgroundColor: "#A0622A", duration: 0.2 });
          gsap.to(label, { opacity: 0, duration: 0.15 });
          break;
        default:
          gsap.to(ring, { width: 28, height: 28, borderColor: "rgba(107,66,38,0.45)", backgroundColor: "rgba(107,66,38,0)", duration: 0.3 });
          gsap.to(dot, { scale: 1, backgroundColor: "#6B4226", duration: 0.2 });
          gsap.to(label, { opacity: 0, duration: 0.15 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const explicit = t.closest("[data-cursor]") as HTMLElement | null;
      if (explicit) {
        setVariant(explicit.dataset.cursor || "default");
        return;
      }
      if (t.closest("a, button, [role='button'], input, textarea, select")) {
        setVariant("link");
        return;
      }
      setVariant("default");
    };
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-multiply"
        style={{ width: 28, height: 28, borderColor: "rgba(107,66,38,0.45)" }}
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tracking-[0.22em] text-walnut opacity-0 select-none"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-walnut"
        style={{ width: 8, height: 8 }}
      />
    </>
  );
}
