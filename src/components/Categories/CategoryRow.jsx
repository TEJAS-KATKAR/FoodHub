
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodCard from "./FoodCard";

export default function CategoryRow({ title, items }) {
  const scrollRef = useRef(null);
  const dragRef = useRef({ active: false, dragging: false, startX: 0, scrollLeft: 0, blockClick: false });
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!items || items.length === 0) return null;

  const updateArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 2);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: container.clientWidth * 0.8 * direction,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    dragRef.current = {
      active: true,
      dragging: false,
      startX: e.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
      blockClick: false,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;

    const distance = e.clientX - dragRef.current.startX;

    if (!dragRef.current.dragging && Math.abs(distance) > 6) {
      dragRef.current.dragging = true;
      setIsDragging(true);
    }

    if (dragRef.current.dragging) {
      scrollRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
    }
  };

  const handlePointerUp = () => {
    if (dragRef.current.dragging) {
      dragRef.current.blockClick = true;
      setTimeout(() => {
        dragRef.current.blockClick = false;
      }, 150);
    }

    dragRef.current.active = false;
    dragRef.current.dragging = false;
    setIsDragging(false);
  };

  const handleClickCapture = (e) => {
    if (dragRef.current.blockClick) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.blockClick = false;
    }
  };

  return (
    <div className="mb-5">
      <h2 className="text-[20px] ml-2 font-bold mb-2">{title}</h2>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleClickCapture}
          className={`grid grid-rows-2 grid-flow-col auto-cols-[210px] sm:auto-cols-[230px] gap-4 overflow-x-auto pb-2 scrollbar-hide select-none touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {items.map((item) => (
            <FoodCard key={`${item.source}-${item.id}`} item={item} />
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 ${
            canScrollLeft
              ? "opacity-100 hover:bg-orange-500 hover:text-white"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 ${
            canScrollRight
              ? "opacity-100 hover:bg-orange-500 hover:text-white"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

