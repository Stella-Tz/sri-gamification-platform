//client\src\features\dashboard\components\CourseProgressCard.tsx

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Card from "../../../components/ui/Card";

type CourseProgressCardProps = {
  completedSections: number;
  totalSections: number;
  progressPercentage: number;
};

const CourseProgressCard = ({
  completedSections,
  totalSections,
  progressPercentage,
}: CourseProgressCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInView = useInView(chartRef, {
    once: true,
    amount: 0.6,
  });

  useEffect(() => {
    if (!chartInView) {
      return;
    }

    let start: number | null = null;
    let frameId = 0;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValue(eased * progressPercentage);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [chartInView, progressPercentage]);

  return (
    <Card className="h-full">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
        Learning Progress
      </p>

      <h3 className="mt-2 text-2xl font-bold text-slate-900">
        Course Progress
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Progress across lessons, learning quizzes and final section tests.
      </p>

      <div className="mt-7 flex flex-col items-center">
        <div ref={chartRef} className="h-40 w-40">
          <CircularProgressbar
            value={animatedValue}
            text={`${Math.round(animatedValue)}%`}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#4f46e5",
              trailColor: "#e2e8f0",
              textColor: "#0f172a",
              textSize: "16px",
              strokeLinecap: "round",
            })}
          />
        </div>

        <p className="mt-6 text-sm font-semibold text-slate-500">
          <span className="font-extrabold text-blue-950">
            {completedSections} / {totalSections}
          </span>{" "}
          sections
        </p>
      </div>
    </Card>
  );
};

export default CourseProgressCard;
