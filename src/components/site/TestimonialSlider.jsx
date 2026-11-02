"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function TestimonialCard({ item }) {
  const author = item.name || item.author || "Client";
    const quote = item.message || item.quote || "";
    const rating = item._id?.toString().slice(-1) % 2 === 0 ? 4 : 5;
  const role =
    [item.designation, item.company].filter(Boolean).join(" · ") ||
    item.role ||
    "";

  const initials = author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
        .join("");
    

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[var(--theme-border)] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-0.5 text-amber-500">
          <div className="flex gap-0.5 text-amber-500">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </div>
        </div>

        <Quote size={23} className="text-[var(--theme-primary)] opacity-20" />
      </div>

      <p className="line-clamp-4 flex-1 text-[12px] leading-6 text-[var(--theme-muted)]">
        "{quote}"
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-[var(--theme-border)] pt-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--theme-primary)]/10 font-bold text-[var(--theme-primary)]">
          {item.image ? (
            <img
              src={item.image}
              alt={author}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[var(--theme-ink)]">
            {author}
          </h3>
          <p className="truncate text-[11px] text-[var(--theme-muted)]">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}


export default function TestimonialSlider({ items = [] }) {
  const swiperRef = useRef(null);

  if (!items.length) return null;

  return (
    <section className="w-full py-8">
      <div className="container-site">
        {/* Heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--theme-primary)]">
              CLIENT TESTIMONIALS
            </span>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--theme-ink)] sm:text-3xl">
              What Our Clients Say
            </h2>

            <p className="mt-2 text-xs text-[var(--theme-muted)]">
              Experiences shared by our valued clients.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border)] bg-white text-[var(--theme-dark)] transition hover:bg-[var(--theme-primary)] hover:text-white"
            >
              <ArrowLeft size={16} color="#a7a8aa" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border)] bg-white text-[var(--theme-ink)] transition hover:bg-[var(--theme-primary)] hover:text-white"
            >
              <ArrowRight size={16} color="#a7a8aa" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          loop={items.length > 3}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={650}
          grabCursor
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
          }}
          className="testimonial-swiper"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
