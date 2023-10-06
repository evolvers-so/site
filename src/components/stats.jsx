import React from "react";
import { animated, useSpring } from 'react-spring';

const stats = [
  { id: 1, name: "co-founders", value: 2 },
  { id: 2, name: "startups", value: 100 },
  { id: 3, name: "members", value: 69420 },
];

const Stat = ({ value }) => {
  const props = useSpring({ number: value, from: { number: 0 } });
  return <animated.div>{props.number.interpolate(n => n.toFixed(0))}</animated.div>
}

const StatsComp = () => {
  return (
    <div className=" py-24 sm:py-32" style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4 border border-gray-200 rounded-full p-8  backdrop-blur"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                <Stat value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StatsComp;
