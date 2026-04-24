function contextSummary(holdings, prices) {
  let totalInvestment = 0;
  let currentValue = 0;
  //================= this the each stock data which is being calculated in backend //=======
  const enriched = holdings.map((h) => {
    const ltp = prices[h.name] ?? h.avg;
    const investment = h.avg * h.qty;
    const value = ltp * h.qty;
    const pnl = value - investment;
    totalInvestment += investment;
    currentValue += value;
    return {
      name: h.name,
      qty: h.qty,
      avg: h.avg,
      ltp,
      pnl,
    };
  });
  //=====================================================
  const totalPnL = currentValue - totalInvestment;
  const sorted = [...enriched].sort((a, b) => b.pnl - a.pnl);
  const bestStock = sorted[0];
  const worstStock = sorted[sorted.length - 1];
  return {
    totalPnL,
    totalInvestment: Math.round(totalInvestment),
    currentValue: Math.round(currentValue),
    stocks: enriched,
    bestStock,
    worstStock,
  };
}
//=============================detect Intent //========================================
function detectIntent(message) {
  const msg = message.toLowerCase();

  // 🔥 FAST (no LLM)
  if (msg.includes("p&l") || msg.includes("profit") || msg.includes("loss")) {
    return "profit_direct";
  }

  if (msg.includes("balance") || msg.includes("fund")) {
    return "funds_direct";
  }

  if (msg.includes("position")) {
    return "positions_direct";
  }

  // 🔥 LLM REQUIRED
  if (msg.includes("should") || msg.includes("advice")) {
    return "advice";
  }

  if (msg.includes("why") || msg.includes("reason")) {
    return "explanation";
  }

  return "general";
}
//=============================== buildContext//================================
function buildContext(intent, summary, message) {
  const {
    totalInvestment,
    currentValue,
    totalPnL,
    stocks,
    bestStock,
    worstStock,
  } = summary;

  // 🔹 PROFIT
  if (intent === "profit") {
    return `TI:${totalInvestment}|CV:${currentValue}|PNL:${totalPnL}|B:${bestStock.name}|${bestStock.pnl}|W:${worstStock.name}|${worstStock.pnl}|Q:${message}`;
  }

  // 🔹 STOCK (only ONE stock → huge saving)
  if (intent === "stock") {
    const stock = stocks.find((s) =>
      message.toLowerCase().includes(s.name.toLowerCase()),
    );

    if (!stock) return `ERR:NF|Q:${message}`;

    return `S:${stock.name}|${stock.qty}|${stock.avg}|${stock.ltp}|${stock.pnl}|Q:${message}`;
  }

  // 🔹 INVESTMENT
  if (intent === "investment") {
    const stock = stocks.find((s) =>
      message.toLowerCase().includes(s.name.toLowerCase()),
    );

    if (!stock) {
      return `TI:${totalInvestment}|Q:${message}`;
    }

    const inv = stock.avg * stock.qty;

    return `S:${stock.name}|INV:${Math.round(inv)}|Q:${message}`;
  }

  // 🔹 GENERAL (top 3 only)
  return `B:${bestStock.name}|${bestStock.pnl}|W:${worstStock.name}|${worstStock.pnl}|T:${stocks
    .sort((a, b) => b.pnl - a.pnl)
    .slice(0, 3)
    .map((s) => `${s.name}|${s.pnl}`)
    .join(",")}|Q:${message}`;
}
module.exports = {
  buildContext,
  contextSummary,
  detectIntent,
};
