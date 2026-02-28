import Inner_pageLayout from "@/components/layout/Inner_pageLayout";
import LiveExchangeRate from "@/components/liveExchangeRate/LiveExchangeRate";

const page = () => {
  return (
    <Inner_pageLayout title="Live Exchange Rate">
      <LiveExchangeRate />
    </Inner_pageLayout>
  );
};

export default page;
