//  {(() => {
//                 const CountUp: React.FC<{
//                   target: number;
//                   duration?: number;
//                 }> = ({ target, duration = 800 }) => {
//                   const [value, setValue] = React.useState(1);

//                   React.useEffect(() => {
//                     let current = 1;
//                     const steps = Math.max(target - 1, 1);
//                     const interval = Math.max(Math.floor(duration / steps), 20);
//                     const id = setInterval(() => {
//                       current += 1;
//                       setValue(current);
//                       if (current >= target) clearInterval(id);
//                     }, interval);
//                     return () => clearInterval(id);
//                   }, [target, duration]);

//                 };

//                 return <CountUp target={11} />;
//               })()}

"use client";
import React from "react";

interface CountUpProps {
  target: number;
  duration?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  target,
  duration = 800,
  className,
}) => {
  const [value, setValue] = React.useState(1);

  React.useEffect(() => {
    let current = 1;
    const steps = Math.max(target - 1, 1);
    const interval = Math.max(Math.floor(duration / steps), 20);
    const id = setInterval(() => {
      current += 1;
      setValue(current);
      if (current >= target) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [target, duration]);

  return <span className={className}>{value}</span>;
};

export default CountUp;
