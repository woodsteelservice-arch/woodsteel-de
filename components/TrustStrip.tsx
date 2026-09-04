import { stats } from "@/lib/data";
import { CounterStat } from "./CounterStat";

export function TrustStrip() {
  return (
    <section className="relative -mt-6 sm:-mt-10 z-20 mx-4 sm:mx-5 lg:mx-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_24px_64px_rgba(63,34,17,0.12)] border border-cream/60">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-cream/60">
          {stats.map((s) => (
            <CounterStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
