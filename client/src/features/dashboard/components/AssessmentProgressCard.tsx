//client\src\features\dashboard\components\AssessmentProgressCard.tsx

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";

import Card from "../../../components/ui/Card";
import type { AssessmentProgressItem } from "../dashboard.types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type AssessmentProgressCardProps = {
  items: AssessmentProgressItem[];
};

const wrapSectionLabel = (
  label: string,
  maxLineLength = 15,
): string | string[] => {
  const words = label.trim().split(/\s+/);

  if (words.length <= 1) {
    return label;
  }

  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine
      ? `${currentLine} ${word}`
      : word;

    if (
      currentLine &&
      candidate.length > maxLineLength
    ) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = candidate;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length === 1 ? lines[0] : lines;
};

const AssessmentProgressCard = ({
  items,
}: AssessmentProgressCardProps) => {
  const attemptedCount = items.filter(
    (item) => item.score !== null,
  ).length;

  const hasAttempts = attemptedCount > 0;

  const data: ChartData<"bar", (number | null)[], string> = {
    labels: items.map((item) => item.sectionTitle),
    datasets: [
      {
        label: "Latest final test score",
        data: items.map((item) => item.score),
        backgroundColor: items.map((item) =>
          item.passed === false
            ? "rgba(245, 158, 11, 0.20)"
            : "rgba(59, 130, 246, 0.18)",
        ),
        borderColor: items.map((item) =>
          item.passed === false
            ? "rgb(217, 119, 6)"
            : "rgb(37, 99, 235)",
        ),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
        minBarLength: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 4,
        right: 6,
        bottom: 4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const index = context[0]?.dataIndex ?? 0;
            return items[index]?.sectionTitle ?? "";
          },
          label: (context: TooltipItem<"bar">) => {
            const item = items[context.dataIndex];
            const value = item?.score ?? null;

            if (value === null) {
              return "Not attempted yet";
            }

            return `Latest score: ${value}%`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "#e2e8f0",
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: "#64748b",
          padding: 10,
          font: {
            size: 11,
            weight: 600,
          },
          callback: function (value) {
            const label = this.getLabelForValue(
              Number(value),
            );

            return wrapSectionLabel(label);
          },
        },
      },
    },
  };

  return (
    <Card className="min-h-[430px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Assessment Progress
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Final Test Scores
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Latest final-test score for each theory section.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {attemptedCount}/{items.length} attempted
        </span>
      </div>

      {hasAttempts ? (
        <div className="mt-6 w-full min-w-0 overflow-x-auto pb-2">
          <div className="h-[310px] w-full min-w-[900px]">
            <Bar
              data={data}
              options={options}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 flex h-[310px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BarChart3
                size={23}
                aria-hidden="true"
              />
            </div>

            <h4 className="mt-4 text-base font-bold text-slate-900">
              No final tests attempted yet
            </h4>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Your latest score for each theory section will appear here after you complete a final section test.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AssessmentProgressCard;
