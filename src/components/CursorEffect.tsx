"use client";

import { useEffect, useRef } from "react";

export function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate3d(${e.clientX - 2.5}px, ${e.clientY - 2.5}px, 0)`;
    };

    const animate = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
        pos.current.x += dx * 0.18;
        pos.current.y += dy * 0.18;
        cursor.style.transform = `translate3d(${pos.current.x - 19}px, ${pos.current.y - 19}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const targetEl = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [role=button], [data-cursor]"
      );
      if (targetEl) {
        cursor.classList.add("cursor--active");
      } else {
        cursor.classList.remove("cursor--active");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor {
          position: fixed;
          top: 0; left: 0;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(214,175,100,0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s, background-color 0.25s;
        }
        .cursor--active {
          width: 54px;
          height: 54px;
          border-color: rgba(214,175,100,0.9);
          background-color: rgba(214,175,100,0.06);
        }
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 5px; height: 5px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
        }
        @media (pointer: coarse) {
          .cursor, .cursor-dot { display: none !important; }
        }
      `}</style>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
