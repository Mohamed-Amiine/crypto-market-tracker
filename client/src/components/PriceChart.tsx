import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { usePriceHistory } from "@/hooks/useCryptoData";
import { Skeleton } from "@/components/ui/skeleton";

Chart.register(...registerables);

interface PriceChartProps {
  cryptoId: string;
}

export default function PriceChart({ cryptoId }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { data: priceHistory, isLoading } = usePriceHistory(cryptoId, 24);

  useEffect(() => {
    if (!canvasRef.current || !priceHistory || priceHistory.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Prepare data
    const labels = priceHistory.map((point) => {
      const date = new Date(point.timestamp!);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const prices = priceHistory.map((point) => parseFloat(point.price));

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Price',
          data: prices,
          borderColor: 'hsl(221.2, 83.2%, 53.3%)',
          backgroundColor: 'hsl(221.2, 83.2%, 53.3%, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 2,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'hsl(var(--card))',
            titleColor: 'hsl(var(--foreground))',
            bodyColor: 'hsl(var(--foreground))',
            borderColor: 'hsl(var(--border))',
            borderWidth: 1,
            callbacks: {
              label: (context) => `Price: $${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              color: 'hsl(var(--border))'
            },
            ticks: {
              color: 'hsl(var(--muted-foreground))'
            }
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'hsl(var(--border))'
            },
            ticks: {
              color: 'hsl(var(--muted-foreground))',
              callback: function(value) {
                return '$' + Number(value).toLocaleString();
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [priceHistory]);

  if (isLoading) {
    return (
      <div className="chart-container">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (!priceHistory || priceHistory.length === 0) {
    return (
      <div className="chart-container flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>No price history available</p>
          <p className="text-sm">Price data will appear here once available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container" data-testid="chart-price-history">
      <canvas ref={canvasRef} />
    </div>
  );
}
