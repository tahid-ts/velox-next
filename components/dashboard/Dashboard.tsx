"use client";
import React, { Suspense, useEffect, useState } from "react";
import DashboardCard from "../shared/card/DashboardCard";
import { cardsData, eurRateData, usdRateData, walletData } from "@/data/data";
import ChartCard, {
  CurrencyOption,
  PeriodOption,
} from "../shared/card/ChartCard";
import { RateDataPoint } from "./Currencyratechart";

import CurrancyConverter_Dashboard from "../shared/currencyConverter/CurrancyConverter_Dashboard";

import LiveExchangeRatesDataTable from "../shared/sections/home-one/LiveExchangeRatesDataTable";
import WalletCard from "../shared/card/WalletCard";
import DashboardCardSkeletonGrid from "../shared/skeleton/DashboardCardSkeletonGrid";
import ChartCardSkeleton from "../shared/skeleton/ChartCardSkeleton";
import CurrancyConverter_Dashboard_Skeleton from "../shared/skeleton/CurrancyConverter_Dashboard_Skeleton";
import WalletCard_Skeleton from "../shared/skeleton/WalletCard_Skeleton";
const datasetByCurrency: Partial<Record<CurrencyOption, RateDataPoint[]>> = {
  USD: usdRateData,
  EUR: eurRateData,
};
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading for 1 second
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [chartData, setChartData] = useState<RateDataPoint[]>(usdRateData);

  const handleCurrencyChange = (currency: CurrencyOption) => {
    const next = datasetByCurrency[currency];
    if (next) setChartData(next);
  };

  const handlePeriodChange = (period: PeriodOption) => {
    console.log("Period changed to:", period);
  };
  return (
    <div>
      <div>
        <Suspense fallback={<DashboardCardSkeletonGrid />}>
          {cardsData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {cardsData.map((card) => (
                <DashboardCard key={card.label} {...card} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-8 gap-6">
        <div className="col-span-5">
          <Suspense fallback={<ChartCardSkeleton />}>
            {chartData && (
              <ChartCard
                title="Currency Rate Over Time"
                data={chartData}
                activeIndex={8}
                onCurrencyChange={handleCurrencyChange}
                onPeriodChange={handlePeriodChange}
              />
            )}
          </Suspense>
        </div>

        <div className="col-span-3">
          <Suspense fallback={<CurrancyConverter_Dashboard_Skeleton />}>
            {!isLoading && (
              <CurrancyConverter_Dashboard className="grid-cols-1!" />
            )}
          </Suspense>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-8 gap-6">
        <div className="col-span-5">
          <LiveExchangeRatesDataTable />
        </div>
        <div className="col-span-3">
          <Suspense fallback={<WalletCard_Skeleton />}>
            {walletData.segments && (
              <WalletCard
                title="Your Wallet"
                segments={walletData.segments}
                totalBalance={walletData.totalBalance}
                changePercent={walletData.changePercent}
                onViewDetails={() => console.log("View Details clicked")}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
