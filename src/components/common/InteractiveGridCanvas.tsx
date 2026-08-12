import { useEffect, useRef } from "react";

export const InteractiveGridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    const gridSize = 40;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = e.touches[0].clientX - rect.left;
        targetMouseY = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(227, 225, 220, 0.75)";

      // Draw Vertical Grid Lines with Touch Ripple Displacement
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 12) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let offsetX = 0;
          if (dist < 180) {
            const factor = Math.cos((dist / 180) * (Math.PI / 2));
            offsetX = (dx / dist) * factor * 14;
          }

          const drawX = x + offsetX;

          if (y === 0) {
            ctx.moveTo(drawX, y);
          } else {
            ctx.lineTo(drawX, y);
          }
        }
        ctx.stroke();
      }

      // Draw Horizontal Grid Lines with Touch Ripple Displacement
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let offsetY = 0;
          if (dist < 180) {
            const factor = Math.cos((dist / 180) * (Math.PI / 2));
            offsetY = (dy / dist) * factor * 14;
          }

          const drawY = y + offsetY;

          if (x === 0) {
            ctx.moveTo(x, drawY);
          } else {
            ctx.lineTo(x, drawY);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 w-full h-full z-0 opacity-75"
    />
  );
};
