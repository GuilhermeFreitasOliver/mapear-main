"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DeckCard } from "../app/curso/deckData";

type DeckCarouselProps = {
    items: DeckCard[];
};

export default function DeckCarousel({ items }: DeckCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
                        >
                            <div className="h-full rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white flex flex-col">
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <div className="mb-2 w-full max-w-[160px] mx-auto">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-slate-200 mt-auto">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-2 rounded-full shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-2 rounded-full shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
}
