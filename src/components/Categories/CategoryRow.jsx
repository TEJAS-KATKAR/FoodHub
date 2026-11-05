
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodCard from "./FoodCard";

function FoodScroller({ items }) {
  const scrollRef = useRef(null);
  const dragRef = useRef({ active: false, dragging: false, startX: 0, scrollLeft: 0, blockClick: false });
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 2);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({ left: container.clientWidth * 0.8 * direction, behavior: "smooth" });
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
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className={`flex w-full min-w-0 gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 scrollbar-hide select-none touch-pan-x ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {items.map((item) => (
          <div key={`${item.source}-${item.id}`} className="w-[210px] shrink-0 sm:w-[230px]">
            <FoodCard item={item} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        className={`absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          canScrollLeft ? "opacity-100 hover:bg-orange-500 hover:text-white" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        className={`absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          canScrollRight ? "opacity-100 hover:bg-orange-500 hover:text-white" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

export default function CategoryRow({ title, items }) {
  if (!items || items.length === 0) return null;

  // Preserve the original column-first order of the two-row grid.
  const topRowItems = items.filter((_, index) => index % 2 === 0);
  const bottomRowItems = items.filter((_, index) => index % 2 !== 0);

  return (
    <div className="mb-5">
      <h2 className="mb-2 ml-2 text-[20px] font-bold">{title}</h2>

      <div className="flex flex-col gap-4">
        <FoodScroller items={topRowItems} />
        {bottomRowItems.length > 0 && <FoodScroller items={bottomRowItems} />}
      </div>
    </div>
  );
}

