import TradePlanningCalculator from './trade-planning-calculator';

export default function TradePlanningPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trade Planning</h2>
          <p className="text-muted-foreground">
            Plan your trade, know your risk, then execute with confidence.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {/* Left Column: Chart Placeholder */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed shadow-sm bg-card">
            <div className="text-center">
              <p className="text-2xl font-semibold text-muted-foreground">
                Price Chart
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                In this prototype, the chart is a visual placeholder.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Trade Plan Panel */}
        <div className="md:col-span-1 lg:col-span-2">
          <TradePlanningCalculator />
        </div>
      </div>
    </div>
  );
}
