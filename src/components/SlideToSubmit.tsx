import { useState, useRef, useCallback, useEffect } from "react";
import { Send, Loader2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideToSubmitProps {
  onSubmit: () => void;
  isLoading: boolean;
  label?: string;
  loadingLabel?: string;
}

const SlideToSubmit = ({
  onSubmit,
  isLoading,
  label = "החלק כדי לתרגם",
  loadingLabel = "מתרגם...",
}: SlideToSubmitProps) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const trackWidthRef = useRef(0);
  const thumbSize = 56;

  useEffect(() => {
    if (!isLoading) setSubmitted(false);
  }, [isLoading]);

  const getMaxDrag = () => {
    if (!trackRef.current) return 200;
    return trackRef.current.offsetWidth - thumbSize - 8;
  };

  const handleStart = useCallback((clientX: number) => {
    if (isLoading || submitted) return;
    setIsDragging(true);
    startXRef.current = clientX;
    trackWidthRef.current = getMaxDrag();
  }, [isLoading, submitted]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    // RTL: dragging left means negative clientX delta
    const delta = startXRef.current - clientX;
    const clamped = Math.max(0, Math.min(delta, trackWidthRef.current));
    setDragX(clamped);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const max = trackWidthRef.current;
    if (dragX > max * 0.85) {
      setSubmitted(true);
      setDragX(max);
      onSubmit();
    } else {
      setDragX(0);
    }
  }, [isDragging, dragX, onSubmit]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  useEffect(() => {
    if (!isDragging) return;
    const onUp = () => handleEnd();
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleEnd]);

  const max = getMaxDrag();
  const progress = max > 0 ? dragX / max : 0;

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative h-14 w-full rounded-full bg-primary/10 border-2 border-primary/20 select-none overflow-hidden",
        "transition-colors",
        isDragging && "border-primary/40",
        submitted && "border-primary/60 bg-primary/20"
      )}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Progress fill */}
      <div
        className="absolute inset-y-0 right-0 bg-primary/15 rounded-full transition-none"
        style={{ width: `${dragX + thumbSize + 8}px` }}
      />

      {/* Label */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: isLoading ? 0 : 1 - progress * 1.5 }}
      >
        <div className="flex items-center gap-2 text-primary font-medium">
          <ChevronRight className="h-4 w-4 animate-pulse rtl:rotate-180" />
          <span>{label}</span>
          <ChevronRight className="h-4 w-4 animate-pulse rtl:rotate-180" />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{loadingLabel}</span>
          </div>
        </div>
      )}

      {/* Thumb */}
      {!isLoading && (
        <div
          className={cn(
            "absolute top-1 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-grab shadow-lg",
            isDragging && "cursor-grabbing scale-110",
            !isDragging && !submitted && "transition-all duration-300",
            submitted && "transition-all duration-200"
          )}
          style={{ right: `${4 + dragX}px` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <Send className="h-5 w-5 rtl:-scale-x-100" />
        </div>
      )}
    </div>
  );
};

export default SlideToSubmit;
