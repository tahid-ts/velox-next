import { RateDataPoint } from "@/components/dashboard/Currencyratechart";
import { DashboardCardProps } from "@/components/shared/card/DashboardCard";
import { CardDataType } from "@/components/shared/carousel/carousel";
import { WalletSegment } from "@/components/shared/chart/WalletDonutChart";
import { CurrencyData } from "@/components/shared/sections/home-one/LiveExchangeRatesDataTable";
import { PaymentGateway } from "@/types/paymentGateWayTypes";
import { Description } from "@/types/services_details";
import { SidebarSection } from "@/types/sidebar";
import { Home } from "lucide-react";
import {
  BsArrowDownCircleFill,
  BsArrowUpCircleFill,
  BsBriefcaseFill,
  BsCurrencyExchange,
} from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GrShieldSecurity } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";
import { MdNotificationAdd } from "react-icons/md";

export const logo = {
  logo1: "/image/logo/Logo1.png",
  logo2: "/image/logo/Logo2.png",
};

export interface NavigationConfig {
  sidebar: SidebarSection[];
  //   navbar: NavbarSection[];
}

export const DashBoardMenuItems = [
  {
    title: "Main",
    id: "guest-nav",
    items: [
      { id: "dashboard", icon: Home, label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Currency",
    items: [
      {
        id: "all-currency",
        icon: FaTags,
        label: "All Currency",
        href: "/dashboard/all-currency",
      },
      {
        id: "transaction-history",
        icon: FaMoneyCheckDollar,
        label: "Transaction History",
        href: "/dashboard/transaction-history",
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        id: "my-profile",
        icon: LuUserRound,
        label: "My Profile",
        href: "/dashboard/my-profile",
      },

      {
        id: "kyc-verification",
        icon: LuUserRound,
        href: "/dashboard/kyc-verification",
        label: "KYC Verification",
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        id: "password-&-security",
        icon: GrShieldSecurity,
        href: "/dashboard/password-&-security",
        label: "Password & Security",
      },
      {
        id: "notification-settings",
        icon: MdNotificationAdd,
        href: "/dashboard/notification-settings",
        label: "Notification Settings",
      },
    ],
  },
];
export const menuItems = [
  {
    id: "guest-nav",
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "services", label: "Services", href: "/services" },

      {
        id: "shop",
        label: "Shop",
        subItems: [
          { id: "shop", href: "/shop", label: "Shop" },
          {
            id: "product-details",
            href: "/product-details/mercedes-benz-luxury-car",
            label: "Shop Details",
          },
          { id: "cart", href: "/cart", label: "Cart" },
          { id: "checkout", href: "/checkout", label: "Check Out" },
        ],
      },

      {
        id: "page",
        label: "Pages",
        subItems: [
          {
            id: "account-setting",
            href: "/account",
            label: "Account Settings",
          },

          { id: "prebooking", href: "/prebooking", label: "Pre Booking" },
          { id: "personal-info", href: "/account", label: "Personal Info" },
          {
            id: "order-list",
            href: "/account/order-list",
            label: "Order List",
          },
          { id: "review", href: "/account/review", label: "Review" },
          { id: "faq", href: "/faq", label: "Faq" },
          { id: "privacy", href: "/privacy", label: "Privacy" },
          { id: "error", href: "/error", label: "Error 404" },
        ],
      },

      { id: "contactus", href: "/contact", label: "Contact Us" },
    ],
  },
];
export const navigationConfig = {
  sidebar: menuItems,
  navbar: menuItems,
};

export const IntroSection_one_Data = {
  bg1: "/image/intro/hero-banner1.png",
  png: "/image/intro/hero-bannerPng1.png",
};
export const IntroSection_two_Data = {
  bg1: "/image/intro/hero-banner_2.png",
  png: "/image/intro/Hero_banner_2_image1.png",
};

export const avatars = [
  "/image/intro/avatar1.png",
  "/image/intro/avatar2.png",
  "/image/intro/avatar3.png",
  "/image/intro/avatar4.png",
];

export const payment_gateway: PaymentGateway[] = [
  { id: 1, name: "Pay", img: "/image/payment gateway/payment (1).png" },
  { id: 2, name: "Payoneer", img: "/image/payment gateway/payment (4).png" },
  { id: 3, name: "Stripe", img: "/image/payment gateway/payment (2).png" },
  { id: 4, name: "Skrill", img: "/image/payment gateway/payment (2).png" },
  { id: 5, name: "MasterCard", img: "/image/payment gateway/payment (3).png" },
  { id: 6, img: "/image/payment gateway/payment (6).png" },
  { id: 7, name: "Paypal", img: "/image/payment gateway/payment (5).png" },
];

export const services = [
  {
    id: 1,
    image: "/image/services/transfer-icon.png",

    title: "Personal Transfer",
    description:
      "Fast and secure money transfers for your everyday personal financial needs.",
  },
  {
    id: 2,
    image: "/image/services/exchange-icon.png",
    title: "Currency Exchange",
    description:
      "Convert currencies instantly with accurate, real-time market rates and transparency.",
  },
  {
    id: 3,

    image: "/image/services/business-icon.png",
    title: "Business Transfers",
    description:
      "Reliable payment solutions tailored for small and large businesses with ease.",
  },
  {
    id: 4,
    image: "/image/services/global-icon.png",
    title: "Global Money Transfers",
    description:
      "Send money worldwide with quick processing, transparent fees, and guaranteed security.",
  },
  {
    id: 5,
    image: "/image/services/remittance-icon.png",
    title: "International Remittance",
    description:
      "Simple and secure overseas transfers with competitive rates and trusted support.",
  },
  {
    id: 6,
    image: "/image/services/bank-icon.png",
    title: "Local Bank Transfers",
    description:
      "Transfer funds directly to any local bank account quickly and without hassle.",
  },
];

// Currency data based on the image
export const currencyData: CurrencyData[] = [
  {
    id: "1",
    currency: "Russian Ruble",
    currencyCode: "RUB",
    flag: "🇷🇺",
    sparkline: [],
    rateByUSD: 0.0105,
    change24h: 2.34,
    chartData: 0.0105,
  },
  {
    id: "2",
    currency: "British Pound",
    currencyCode: "GBP",
    flag: "🇬🇧",
    sparkline: [],
    rateByUSD: 1.2758,
    change24h: -1.23,
    chartData: 0.0105,
  },
  {
    id: "3",
    currency: "New Zealand Dollar",
    currencyCode: "NZD",
    flag: "🇳🇿",
    sparkline: [],
    rateByUSD: 0.6156,
    change24h: 0.87,
    chartData: 0.0105,
  },
  {
    id: "4",
    currency: "Japanese Yen",
    currencyCode: "JPY",
    flag: "🇯🇵",
    sparkline: [],
    rateByUSD: 0.0067,
    change24h: -0.45,
    chartData: 0.0105,
  },
  {
    id: "5",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
    flag: "🇨🇦",
    sparkline: [],
    rateByUSD: 0.7156,
    change24h: 1.56,
    chartData: 0.0105,
  },
  {
    id: "6",
    currency: "Swiss Franc",
    currencyCode: "CHF",
    flag: "🇨🇭",
    sparkline: [],
    rateByUSD: 1.1234,
    change24h: 0.34,
    chartData: 0.0105,
  },
  {
    id: "7",
    currency: "Saudi Riyal",
    currencyCode: "SAR",
    flag: "🇸🇦",
    sparkline: [],
    rateByUSD: 0.2666,
    change24h: -0.12,
    chartData: 0.0105,
  },
];

export const currencySymbolMap: Record<string, string> = {
  "US Dollar": "$",
  "British Pound": "£",
  "Japanese Yen": "¥",
  "Russian Ruble": "₽",
  "Canadian Dollar": "C$",
  "Swiss Franc": "CHF",
  "Saudi Riyal": "﷼",
  "Turkish Lira": "₺",
  "Newzland Dollar": "NZ$",
};

export const cards: CardDataType[] = [
  {
    id: 1,
    title: "Download the App",
    icon: "/image/service card/icon.png",
    description:
      "Sign up using your basic details and unlock instant access to all our transfer services for a smooth, seamless start.",
  },
  {
    id: 2,
    title: "Create Your Account",
    icon: "/image/service card/icon2.png",
    description:
      "Sign up using your basic details and unlock instant access to all our transfer services for a smooth, seamless start.",
  },
  {
    id: 3,
    title: "Start Using",
    icon: "/image/service card/icon3.png",
    description:
      "Sign up using your basic details and unlock instant access to all our transfer services for a smooth, seamless start.",
  },
  {
    id: 4,
    title: "Track in Your Dashboard",
    icon: "/image/service card/icon4.png",
    description:
      "Sign up using your basic details and unlock instant access to all our transfer services for a smooth, seamless start.",
  },
];

export const whyVeloxCard = [
  {
    id: 1,
    image: "/image/why velox/icon.png",
    title: "Personal Transfer",
    description:
      "Fast and secure money transfers for your everyday personal financial needs.",
  },
  {
    id: 2,
    image: "/image/why velox/icon1.png",
    title: "Currency Exchange",
    description:
      "Convert currencies instantly with accurate, real-time market rates and transparency.",
  },
  {
    id: 3,
    image: "/image/why velox/icon2.png",
    title: "Business Transfers",
    description:
      "Reliable payment solutions tailored for small and large businesses with ease.",
  },
  {
    id: 4,
    image: "/image/why velox/icon3.png",
    title: "Global Money Transfers",
    description:
      "Send money worldwide with quick processing, transparent fees, and guaranteed security.",
  },
];

export const currencyTableData = [
  {
    id: "1",
    currency: "Russian Ruble",
    convertedTo: "US Dollar",
    amount: "5000-6500",
    date: "09 Dec, 2025",
  },
  {
    id: "2",
    currency: "British Pound",
    convertedTo: "Japanese Yen",
    amount: "1.2758",
    date: "09 Dec, 2025",
  },
  {
    id: "3",
    currency: "Newland Dollar",
    convertedTo: "Saudi Riyal",
    amount: "143.64",
    date: "09 Dec, 2025",
  },
  {
    id: "4",
    currency: "Japanese Yen",
    convertedTo: "US Dollar",
    amount: "0.98",
    date: "09 Dec, 2025",
  },
  {
    id: "5",
    currency: "Canadian Dollar",
    convertedTo: "US Dollar",
    amount: "3.451",
    date: "09 Dec, 2025",
  },
  {
    id: "6",
    currency: "Swiss Franc",
    convertedTo: "Turkish Lira",
    amount: "0.417",
    date: "09 Dec, 2025",
  },
  {
    id: "7",
    currency: "Saudi Riyal",
    convertedTo: "British Pound",
    amount: "1.294",
    date: "09 Dec, 2025",
  },
];

export const LiveCurrencyRatesData: CurrencyData[] = [
  {
    id: "1",
    currency: "Russian Ruble",
    currencyCode: "RUB",
    flag: "🇷🇺",
    sparkline: [],
    rateByUSD: 0.0105,
    change24h: 2.34,
    chartData: 0.0105,
  },
  {
    id: "2",
    currency: "British Pound",
    currencyCode: "GBP",
    flag: "🇬🇧",
    sparkline: [],
    rateByUSD: 1.2758,
    change24h: -1.23,
    chartData: 0.0105,
  },
  {
    id: "3",
    currency: "New Zealand Dollar",
    currencyCode: "NZD",
    flag: "🇳🇿",
    sparkline: [],
    rateByUSD: 0.6156,
    change24h: 0.87,
    chartData: 0.0105,
  },
  {
    id: "4",
    currency: "Japanese Yen",
    currencyCode: "JPY",
    flag: "🇯🇵",
    sparkline: [],
    rateByUSD: 0.0067,
    change24h: -0.45,
    chartData: 0.0105,
  },
  {
    id: "5",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
    flag: "🇨🇦",
    sparkline: [],
    rateByUSD: 0.7156,
    change24h: 1.56,
    chartData: 0.0105,
  },
  {
    id: "6",
    currency: "Swiss Franc",
    currencyCode: "CHF",
    flag: "🇨🇭",
    sparkline: [],
    rateByUSD: 1.1234,
    change24h: 0.34,
    chartData: 0.0105,
  },
  {
    id: "7",
    currency: "Saudi Riyal",
    currencyCode: "SAR",
    flag: "🇸🇦",
    sparkline: [],
    rateByUSD: 0.2666,
    change24h: -0.12,
    chartData: 0.0105,
  },
];

export const marqueeData = [
  { id: 1, content: "Deposit" },
  {
    id: 2,
    svg: `<svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4718 1.04109L21.3522 12.8233L31.0555 6.09237L31.4879 5.79279L31.7652 6.23919L35.2544 11.8559L35.5308 12.3023L35.0723 12.5574L24.7286 18.3013L35.4475 23.3113L35.9231 23.5335L35.6783 23.9978L32.5904 29.8446L32.3446 30.3089L31.8925 30.0404L21.7426 24.0018L22.6831 35.7479L22.7254 36.2687L22.2022 36.2876L15.6564 36.5161L15.1342 36.5341L15.1387 36.0114L15.2573 24.2283L5.55497 30.9602L5.12263 31.2597L4.84527 30.8133L1.35706 25.1966L1.0797 24.7502L1.5382 24.4951L11.8809 18.7502L1.16297 13.7412L0.687336 13.519L0.933176 13.0547L4.02106 7.20791L4.26592 6.74361L4.71892 7.01211L14.8678 13.0508L13.9274 1.30463L13.885 0.782831L14.4082 0.764908L20.9541 0.536375L21.4773 0.518452L21.4718 1.04109Z" stroke="white"/></svg>`,
  },
  { id: 3, type: "Exchange" },
  {
    id: 4,
    svg: `<svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2641 34.9802L14.3927 22.23L3.89472 29.5131L0.406443 23.8963L11.606 17.676L-0.000180604 12.2521L3.08779 6.4057L14.0682 12.9388L13.0505 0.228607L19.5966 1.2486e-05L19.468 12.7502L29.9659 5.4671L33.4542 11.0839L22.2547 17.3042L33.8608 22.728L30.7729 28.5745L19.7924 22.0414L20.8101 34.7516L14.2641 34.9802Z" fill="white"/></svg>`,
  },
  { id: 5, content: "Deposit" },
  {
    id: 6,
    svg: `<svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4718 1.04109L21.3522 12.8233L31.0555 6.09237L31.4879 5.79279L31.7652 6.23919L35.2544 11.8559L35.5308 12.3023L35.0723 12.5574L24.7286 18.3013L35.4475 23.3113L35.9231 23.5335L35.6783 23.9978L32.5904 29.8446L32.3446 30.3089L31.8925 30.0404L21.7426 24.0018L22.6831 35.7479L22.7254 36.2687L22.2022 36.2876L15.6564 36.5161L15.1342 36.5341L15.1387 36.0114L15.2573 24.2283L5.55497 30.9602L5.12263 31.2597L4.84527 30.8133L1.35706 25.1966L1.0797 24.7502L1.5382 24.4951L11.8809 18.7502L1.16297 13.7412L0.687336 13.519L0.933176 13.0547L4.02106 7.20791L4.26592 6.74361L4.71892 7.01211L14.8678 13.0508L13.9274 1.30463L13.885 0.782831L14.4082 0.764908L20.9541 0.536375L21.4773 0.518452L21.4718 1.04109Z" stroke="white"/></svg>`,
  },
  { id: 7, type: "Coming Soon" },
  {
    id: 8,
    svg: `<svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2641 34.9802L14.3927 22.23L3.89472 29.5131L0.406443 23.8963L11.606 17.676L-0.000180604 12.2521L3.08779 6.4057L14.0682 12.9388L13.0505 0.228607L19.5966 1.2486e-05L19.468 12.7502L29.9659 5.4671L33.4542 11.0839L22.2547 17.3042L33.8608 22.728L30.7729 28.5745L19.7924 22.0414L20.8101 34.7516L14.2641 34.9802Z" fill="white"/></svg>`,
  },
  { id: 9, content: "Deposit" },
  {
    id: 10,
    svg: `<svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4718 1.04109L21.3522 12.8233L31.0555 6.09237L31.4879 5.79279L31.7652 6.23919L35.2544 11.8559L35.5308 12.3023L35.0723 12.5574L24.7286 18.3013L35.4475 23.3113L35.9231 23.5335L35.6783 23.9978L32.5904 29.8446L32.3446 30.3089L31.8925 30.0404L21.7426 24.0018L22.6831 35.7479L22.7254 36.2687L22.2022 36.2876L15.6564 36.5161L15.1342 36.5341L15.1387 36.0114L15.2573 24.2283L5.55497 30.9602L5.12263 31.2597L4.84527 30.8133L1.35706 25.1966L1.0797 24.7502L1.5382 24.4951L11.8809 18.7502L1.16297 13.7412L0.687336 13.519L0.933176 13.0547L4.02106 7.20791L4.26592 6.74361L4.71892 7.01211L14.8678 13.0508L13.9274 1.30463L13.885 0.782831L14.4082 0.764908L20.9541 0.536375L21.4773 0.518452L21.4718 1.04109Z" stroke="white"/></svg>`,
  },
  { id: 11, type: "Coming Soon" },
  {
    id: 12,
    svg: `<svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2641 34.9802L14.3927 22.23L3.89472 29.5131L0.406443 23.8963L11.606 17.676L-0.000180604 12.2521L3.08779 6.4057L14.0682 12.9388L13.0505 0.228607L19.5966 1.2486e-05L19.468 12.7502L29.9659 5.4671L33.4542 11.0839L22.2547 17.3042L33.8608 22.728L30.7729 28.5745L19.7924 22.0414L20.8101 34.7516L14.2641 34.9802Z" fill="white"/></svg>`,
  },
  { id: 13, content: "Exchange" },
  {
    id: 14,
    svg: `<svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4718 1.04109L21.3522 12.8233L31.0555 6.09237L31.4879 5.79279L31.7652 6.23919L35.2544 11.8559L35.5308 12.3023L35.0723 12.5574L24.7286 18.3013L35.4475 23.3113L35.9231 23.5335L35.6783 23.9978L32.5904 29.8446L32.3446 30.3089L31.8925 30.0404L21.7426 24.0018L22.6831 35.7479L22.7254 36.2687L22.2022 36.2876L15.6564 36.5161L15.1342 36.5341L15.1387 36.0114L15.2573 24.2283L5.55497 30.9602L5.12263 31.2597L4.84527 30.8133L1.35706 25.1966L1.0797 24.7502L1.5382 24.4951L11.8809 18.7502L1.16297 13.7412L0.687336 13.519L0.933176 13.0547L4.02106 7.20791L4.26592 6.74361L4.71892 7.01211L14.8678 13.0508L13.9274 1.30463L13.885 0.782831L14.4082 0.764908L20.9541 0.536375L21.4773 0.518452L21.4718 1.04109Z" stroke="white"/></svg>`,
  },
  { id: 15, type: "Deposite" },
  {
    id: 16,
    svg: `<svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2641 34.9802L14.3927 22.23L3.89472 29.5131L0.406443 23.8963L11.606 17.676L-0.000180604 12.2521L3.08779 6.4057L14.0682 12.9388L13.0505 0.228607L19.5966 1.2486e-05L19.468 12.7502L29.9659 5.4671L33.4542 11.0839L22.2547 17.3042L33.8608 22.728L30.7729 28.5745L19.7924 22.0414L20.8101 34.7516L14.2641 34.9802Z" fill="white"/></svg>`,
  },
];

export const serviceSection_two = [
  {
    id: "01",
    serviceId: "Service_01",
    title: "Personal International Transfers",
    description:
      "Send money overseas quickly and securely with low fees, real-time rates, and a smooth transfer process. Enjoy fast delivery, strong protection, and a reliable way to support loved ones abroad.",
    features: [
      "Fast Delivery",
      "Real-Time Rates",
      "Secure Transfers",
      "Low Transaction Fees",
    ],
    icon: "/image/services/bank-icon.png",
    color: "#033428",
  },
  {
    id: "02",
    serviceId: "Service_02",
    title: "Real-Time Currency Exchange",
    description:
      "Get accurate, live exchange rates and instantly convert currencies with full transparency, delivering a smooth and reliable user experience.",
    features: [
      "Fast Delivery",
      "Real-Time Rates",
      "Secure Transfers",
      "Low Transaction Fees",
    ],
    icon: "/image/services/business-icon.png",
    color: "#0A4A3A",
  },
  {
    id: "03",
    serviceId: "Service_03",
    title: "Business Cross-Border Payments",
    description:
      "Simplify global transactions with fast, secure, and fully compliant payment solutions ideal for companies managing diverse international operations.",
    features: [
      "Fast Delivery",
      "Real-Time Rates",
      "Secure Transfers",
      "Low Transaction Fees",
    ],
    icon: "/image/services/exchange-icon.png",
    color: "#106047",
  },
  {
    id: "04",
    serviceId: "Service_04",
    title: "Multi-Currency Digital Wallet",
    description:
      "Store, convert, and manage multiple currencies in a secure wallet with instant updates, low fees, and enhanced control.",
    features: [
      "Fast Delivery",
      "Real-Time Rates",
      "Secure Transfers",
      "Low Transaction Fees",
    ],
    icon: "/image/services/global-icon.png",
    color: "#167754",
  },
];

export const feature: Description[] = [
  {
    id: "1",
    title: "What is a personal international transfer?",
    description:
      "A personal international transfer allows you to send money securely from your account to individuals or personal bank accounts in another country.",
  },
  {
    id: "2",
    title: "How long does an international transfer take?",
    description:
      "A personal international transfer allows you to send money securely from your account to individuals or personal bank accounts in another country.",
  },
  {
    id: "3",
    title: "Are there any fees for personal international transfers?",
    description:
      "A personal international transfer allows you to send money securely from your account to individuals or personal bank accounts in another country.",
  },
  {
    id: "4",
    title: "Which countries and currencies are supported?",
    description:
      "A personal international transfer allows you to send money securely from your account to individuals or personal bank accounts in another country.",
  },
];

export const cardsData: DashboardCardProps[] = [
  {
    variant: "green",
    icon: BsBriefcaseFill,
    label: "Total Assets Value",
    value: "$ 12345",
    onViewAll: () => alert("Total Assets – View All"),
  },
  {
    variant: "orange",
    icon: BsCurrencyExchange,
    label: "Total Currencies",
    value: "4",
    onViewAll: () => alert("Total Currencies – View All"),
  },
  {
    variant: "teal",
    icon: BsArrowDownCircleFill,
    label: "Total Deposits",
    value: "$ 890",
    onViewAll: () => alert("Total Deposits – View All"),
  },
  {
    variant: "purple",
    icon: BsArrowUpCircleFill,
    label: "Total Withdrawals",
    value: "$ 890",
    onViewAll: () => alert("Total Withdrawals – View All"),
  },
];

export const usdRateData: RateDataPoint[] = [
  { month: "Feb", rate: 4, change: 0.05 },
  { month: "Mar", rate: 8, change: 0.1 },
  { month: "Apr", rate: 8.5, change: 0.02 },
  { month: "May", rate: 20, change: 0.18 },
  { month: "Jun", rate: 21, change: 0.04 },
  { month: "Jul", rate: 15, change: -0.08 },
  { month: "Aug", rate: 15.5, change: 0.01 },
  { month: "Sep", rate: 30, change: 0.22 },
  { month: "Oct", rate: 45, change: 0.12 }, // ← active/highlighted
  { month: "Nov", rate: 37, change: -0.06 },
  { month: "Dec", rate: 51, change: 0.2 },
  { month: "Jan", rate: 59, change: 0.14 },
];

export const eurRateData: RateDataPoint[] = [
  { month: "Feb", rate: 2, change: 0.03 },
  { month: "Mar", rate: 6, change: 0.08 },
  { month: "Apr", rate: 10, change: 0.05 },
  { month: "May", rate: 14, change: 0.11 },
  { month: "Jun", rate: 18, change: 0.07 },
  { month: "Jul", rate: 12, change: -0.05 },
  { month: "Aug", rate: 22, change: 0.17 },
  { month: "Sep", rate: 28, change: 0.09 },
  { month: "Oct", rate: 40, change: 0.15 },
  { month: "Nov", rate: 34, change: -0.04 },
  { month: "Dec", rate: 48, change: 0.19 },
  { month: "Jan", rate: 55, change: 0.11 },
];

export interface WalletData {
  totalBalance: string;
  changePercent: number;
  segments: WalletSegment[];
}

export const walletData: WalletData = {
  totalBalance: "$123.45",
  changePercent: 0.12,
  segments: [
    { currency: "USD", value: 50, color: "#1B3A2D" },
    { currency: "AUD", value: 30, color: "#3DD68C" },
    { currency: "SAR", value: 20, color: "#A8F0C6" },
  ],
};
