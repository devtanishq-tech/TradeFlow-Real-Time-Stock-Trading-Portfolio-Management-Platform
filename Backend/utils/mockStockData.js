const BASE_STOCKS = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "Energy",
    basePrice: 2456.75,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "IT",
    basePrice: 3821.4,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    sector: "Banking",
    basePrice: 1643.2,
  },
  { symbol: "INFY", name: "Infosys Ltd", sector: "IT", basePrice: 1478.55 },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    sector: "Banking",
    basePrice: 987.3,
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd",
    sector: "FMCG",
    basePrice: 2534.85,
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    basePrice: 623.45,
  },
  {
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Ltd",
    sector: "Finance",
    basePrice: 7123.6,
  },
  { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", basePrice: 456.9 },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    sector: "Auto",
    basePrice: 834.25,
  },
  {
    symbol: "AXISBANK",
    name: "Axis Bank Ltd",
    sector: "Banking",
    basePrice: 1123.75,
  },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    sector: "Banking",
    basePrice: 1876.3,
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd",
    sector: "Infrastructure",
    basePrice: 10245.9,
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd",
    sector: "Auto",
    basePrice: 10456.2,
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    sector: "Pharma",
    basePrice: 1234.6,
  },
  {
    symbol: "TITAN",
    name: "Titan Company Ltd",
    sector: "Consumer",
    basePrice: 3456.8,
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd",
    sector: "Consumer",
    basePrice: 3178.45,
  },
  {
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement Ltd",
    sector: "Cement",
    basePrice: 9876.3,
  },
  {
    symbol: "ONGC",
    name: "Oil & Natural Gas Corp",
    sector: "Energy",
    basePrice: 234.55,
  },
  {
    symbol: "POWERGRID",
    name: "Power Grid Corp of India",
    sector: "Utilities",
    basePrice: 287.3,
  },
  {
    symbol: "GOOGL",
    basePrice: 100000,
  },
  {
    symbol: "MSFT",
    basePrice: 59000,
  },
  {
    symbol: "SGBMAY29",
    basePrice: 4727,
  },
  {
    symbol: "ADANIENT",
    basePrice: 3000,
  },

  {
    symbol: "QUICKHEAL",
    name: "Quick Heal Technologies",
    sector: "IT",
    basePrice: 7000.55,
  },
  {
    symbol: "ITC",
    name: "ITC Ltd",
    sector: "FMCG",
    basePrice: 202.0,
  },
  {
    symbol: "KPITTECH",
    name: "KPIT Technologies Ltd",
    sector: "IT",
    basePrice: 6067.43,
  },
  {
    symbol: "M&M",
    name: "Mahindra & Mahindra Ltd",
    sector: "Auto",
    basePrice: 69201.52,
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    sector: "Telecom",
    basePrice: 7000.15,
  },
  {
    symbol: "TATAPOWER",
    name: "Tata Power Ltd",
    sector: "Energy",
    basePrice: 5000.2,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    sector: "Tech",
    basePrice: 6000,
  },
  {
    symbol: "EVEREADY(INTRA)",
    name: "Eveready Industries India Ltd",
    sector: "Consumer Goods",
    basePrice: 3200.5,
  },
  {
    symbol: "JUBLFOOD(INTRA)",
    name: "Jubilant FoodWorks Ltd",
    sector: "Food & Beverage",
    basePrice: 4800.75,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc (Google)",
    sector: "Technology",
    basePrice: 100000,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    basePrice: 59000,
  },
  {
    symbol: "SGBMAY29",
    name: "Sovereign Gold Bond May 2029",
    sector: "Government Bond / Commodity",
    basePrice: 4727,
  },
  {
    symbol: "ADANIENT",
    name: "Adani Enterprises Ltd",
    sector: "Conglomerate",
    basePrice: 3000,
  },
  {
    symbol: "HUL",
    name: "Hindustan Unilever Ltd",
    sector: "FMCG",
    basePrice: 2534.85,
  },
];

const priceStore = {};

// Initialize prices
BASE_STOCKS.forEach((stock) => {
  priceStore[stock.symbol] = {
    ...stock,
    price: stock.basePrice,
    open: stock.basePrice * (1 + (Math.random() - 0.5) * 0.02),
    high: stock.basePrice * (1 + Math.random() * 0.03),
    low: stock.basePrice * (1 - Math.random() * 0.03),
    prevClose: stock.basePrice * (1 + (Math.random() - 0.5) * 0.015),
    volume: Math.floor(Math.random() * 5000000) + 500000,
    change: 0,
    changePercent: 0,
  };
  // Set initial change
  const s = priceStore[stock.symbol];
  s.change = +(s.price - s.prevClose).toFixed(2);
  s.changePercent = +((s.change / s.prevClose) * 100).toFixed(2);
});
//================================= Simultation Price===========================
const simulatePriceUpdate = () => {
  const updates = {};

  BASE_STOCKS.forEach((stock) => {
    const s = priceStore[stock.symbol];

    const volatility = 0.008; // controls randomness
    const trend = 0; // slight upward bias (market growth)

    const randomMove = (Math.random() - 0.5) * volatility;

    // reduce mean reversion strength (it’s stabilizing too much)
    const meanReversion =
      ((stock.basePrice - s.price) / stock.basePrice) * 0.0003;

    const drift = randomMove + meanReversion;
    s.price = +(s.price * (1 + drift)).toFixed(2);
    // 🔥 ADD IT RIGHT HERE
    if (Math.random() < 0.05) {
      // 5% chance
      const spike = (Math.random() - 0.5) * 0.03; // ±3%
      s.price = +(s.price * (1 + spike)).toFixed(2);
    }

    s.high = Math.max(s.high, s.price);
    s.low = Math.min(s.low, s.price);

    s.change = +(s.price - s.prevClose).toFixed(2);
    s.changePercent = +((s.change / s.prevClose) * 100).toFixed(2);

    s.volume += Math.floor(Math.random() * 10000);

    // 🔥 THIS IS WHAT YOUR FRONTEND NEEDS
    updates[s.symbol] = s.price;
  });

  return updates;
};
module.exports = simulatePriceUpdate;
