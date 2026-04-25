if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const LLMapi = require("./utils/LLMapi");
const {
  buildContext,
  contextSummary,
  detectIntent,
} = require("./utils/SystemData");
const simulatePriceUpdate = require("./utils/mockStockData.js");
const WebSockets = require("ws");
const DataHolding = require("./init/HoldingData.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

const cors = require("cors");
const positionData = require("./init/PositionsData");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//  Dummy data insertion
// ----------------models Section----------------------------
const Holdings = require("./models/HoldingSchema");
const Orders = require("./models/OrderSchema");
const Positions = require("./models/PositionsSchema");
const Users = require("./models/User.js");
const Funds = require("./models/Funds.js");
//------------------------------------------------------------
/////-------------Utils file ------------
const generateToken = require("./utils/SecretToken.js");
//---------------------------------------------------
//-------------------Middleware Files---------------
const { isAuthenticated } = require("./middlewares/isAuthenticated.js");
const User = require("./models/User.js");

async function main() {
  try {
    await mongoose.connect(MONGOURL);
    console.log(`Database Connection has beem Successfully Set`);
    // await Positions.deleteMany({});
    // await Positions.insertMany(Data);
    console.log(`Data has been succesfully added `);
  } catch (e) {
    console.log(e);
  }
}
main();

// const orderDummy = new Orders({
//   name: "INFY",
//   price: 1555.45,
//   percent: "-1.60%",
//   model: "Sell",
// });
// orderDummy.save();
//=============================================================================
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
//============================================================================
const allowedOrigins = process.env.CLIENT_URL.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // this line allow send and recieve  cookies from front and to front-end
  }),
);
// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     credentials: true,
//   }),
// );
app.use(cookieParser());
app.use(express.json()); // body-parser
// ================= ROOT =================
app.get("/", (req, res) => {
  res.send(`Welcome to Root ROute`);
});
// ================= AUTH ROUTES =================
app.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  console.log(`OTP sent to ${mobile}`);

  res.status(200).json({ message: "OTP sent successfully" });
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invlaid Email" });
    }
    // ======================if User Exist then we will create the funds for the that user
    //==================================== we will does funds even exist  or not
    const isMatch = await user.ComparePassword(password); // this is where comparision of password occur
    if (!isMatch) {
      return res.status(401).json({ message: "Password is wroung" });
    }
    // when user have succesfully login
    const fundsexist = await Funds.findOne({ userId: user._id });
    console.log(fundsexist);
    if (!fundsexist) {
      await Funds.create({
        userId: user._id,
        balance: 2000000,
        availableCash: 2000000,
        usedMargin: 0,
        openingBalance: 2000000,
      });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // secure: false,
      // sameSite: "lax",
    });
    res.status(200).json({ message: "Login successfully", user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const Existinguser = await Users.findOne({ email });
    console.log("Signup body:", req.body);
    console.log("Existing user:", Existinguser);
    if (Existinguser) {
      return res.status(400).json({ message: "Email already Exist" });
    }
    // pre middleware run which give  change the  normalTextCode to hash Code
    const User = await Users.create({
      userName,
      email,
      password,
    });
    await Funds.create({
      userId: User._id,
      balance: 2000000,
      availableCash: 2000000,
      usedMargin: 0,
      openingBalance: 2000000,
    });
    const token = generateToken(User.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res
      .status(201)
      .json({ message: "user has been created Successfulyy", User });
  } catch (err) {
    console.log("Sing uo errir ", err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ message: "Logged Out Successfully" });
});
// this route will run before every protetc route access ./ like holding or order, ...etc
app.get("/auth/me", isAuthenticated, async (req, res) => {
  try {
    // this line , not include the password , means do want to send password to the frontend
    const userData = await Users.findById(req.user.id).select("-password");
    // in this password is not included in this
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// ================= PROTECTED ROUTES =================
app.get("/holdings", isAuthenticated, async (req, res) => {
  const Hold = await Holdings.find();
  res.send(Hold);
});
app.get("/orders", isAuthenticated, async (req, res) => {
  const orders = await Orders.find().sort({ createdAt: -1 });
  res.send(orders);
});
// post requesta are stored in body
//=========================== Order -Post ========================================
app.post("/orders", isAuthenticated, async (req, res) => {
  try {
    const { stockName, qty, price, mode } = req.body;
    const fundData = await Funds.findOne({ userId: req.user.id });
    const isIntra = stockName.includes("(INTRA)");
    const cleanName = stockName.replace("(INTRA)", "").trim();

    let existingHolding = await Holdings.findOne({ name: cleanName });
    let existingPosition = await Positions.findOne({ name: cleanName });

    const totalCost = qty * price;

    // ================= BUY =================
    if (mode === "BUY") {
      // Save order (product will be ignored if not in schema — OK for now)
      const newOrder = new Orders({
        stockName: cleanName,
        qty,
        price,
        mode,
        product: isIntra ? "MIS" : "CNC",
      });
      await newOrder.save();

      if (fundData.availableCash < totalCost) {
        return res.status(400).json({ message: "Insufficient BALANCE" });
      }

      fundData.availableCash -= totalCost;
      fundData.usedMargin += totalCost;
      await fundData.save();

      if (isIntra) {
        if (existingPosition) {
          let totalQty = existingPosition.qty + qty;
          let newAvg =
            (existingPosition.avg * existingPosition.qty + price * qty) /
            totalQty;

          existingPosition.qty = totalQty;
          existingPosition.avg = newAvg;
          existingPosition.product = "MIS";

          await existingPosition.save();
        } else {
          await Positions.create({
            name: cleanName,
            qty,
            avg: price,
            product: "MIS",
          });
        }

        return res.send("INTRA position created");
      }

      if (existingHolding) {
        let totalQty = existingHolding.qty + qty;
        let newAvg =
          (existingHolding.avg * existingHolding.qty + price * qty) / totalQty;

        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;

        await existingHolding.save();
      } else {
        await Holdings.create({
          name: cleanName,
          qty,
          avg: price,
        });
      }

      return res.send("CNC holding created");
    }

    // ================= SELL =================
    if (mode === "SELL") {
      console.log("REQ:", cleanName, qty);
      console.log("DB:", existingPosition?.qty);

      // 🔥 1. Check POSITION first
      if (existingPosition) {
        if (existingPosition.qty < qty) {
          return res.status(400).send("Insufficient position quantity");
        }

        const sellValue = price * qty;
        const buyValue = existingPosition.avg * qty;
        const profit = sellValue - buyValue;

        await new Orders({
          stockName: cleanName,
          qty,
          price,
          mode,
          realizedPnl: profit,
        }).save();

        existingPosition.qty -= qty;

        if (existingPosition.qty === 0) {
          await Positions.deleteOne({ _id: existingPosition._id });
        } else {
          await existingPosition.save();
        }

        fundData.availableCash += sellValue;
        fundData.usedMargin -= buyValue;
        fundData.balance += profit;

        await fundData.save();

        return res.send("Position closed + Funds updated");
      }

      if (!existingHolding) {
        return res.status(400).send("Stock not found");
      }

      if (existingHolding.qty < qty) {
        return res.status(400).send("Insufficient quantity");
      }

      const sellValue = price * qty;
      const buyValue = existingHolding.avg * qty;
      const profit = sellValue - buyValue;

      existingHolding.qty -= qty;

      await new Orders({
        stockName: cleanName,
        qty,
        price,
        mode,
        realizedPnl: profit,
      }).save();

      if (existingHolding.qty === 0) {
        await Holdings.deleteOne({ name: cleanName });
      } else {
        await existingHolding.save();
      }

      fundData.availableCash += sellValue;
      fundData.usedMargin -= buyValue;
      fundData.balance += profit;

      await fundData.save();

      return res.send("Holding sold + Funds updated");
    }

    res.send("Order processed");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});
//=================================================================================
app.get("/positions", isAuthenticated, async (req, res) => {
  const Post = await Positions.find();
  res.send(Post);
});
app.get("/funds", isAuthenticated, async (req, res) => {
  try {
    // in this req.user.id comes from the request
    let fund = await Funds.findOne({ userId: req.user.id });
    // console.log(data);
    res.status(200).json(fund);
  } catch (err) {
    res.status(500).json({ message: "Some error has occur here", err });
  }
});
app.post("/funds/add", isAuthenticated, async (req, res) => {
  try {
    const { amount } = req.body;
    const fundData = await Funds.findOne({ userId: req.user.id });
    fundData.balance += Number(amount);
    fundData.availableCash += Number(amount);
    fundData.openingBalance += Number(amount);

    await fundData.save();
    res.status(200).json({ message: "Funds Added " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/funds/withdraw", isAuthenticated, async (req, res) => {
  try {
    const { amount } = req.body;

    const fundData = await Funds.findOne({ userId: req.user.id });
    if (fundData.availableCash < amount) {
      return res.status(400).json({ message: "Insufficient Balance" });
    }
    fundData.balance -= amount;
    fundData.availableCash -= amount;
    fundData.openingBalance -= amount;
    await fundData.save();
  } catch (err) {
    res.status(500).json({ message: "Some error has occur here" });
  }
});
//==============================Practise Route in this =============================
// this the route used to fetch userName of the user
app.get("/me", isAuthenticated, async (req, res) => {
  // send data of the user , but not include the [password]
  res.status(200).json(req.user);
});
// in this code ,Context is the data that we send the llm api , system data + userMessage
//============================================Ai chat Route =============================================
// app.post("/aiChat", async (req, res) => {
//   try {
//     console.log("📩 Incoming:", req.body);

//     const { message, holdings, livePrices, history } = req.body;

//     if (!holdings || !livePrices) {
//       throw new Error("Missing holdings or prices");
//     }

//     const summary = contextSummary(holdings, livePrices);
//     console.log("📊 Summary:", summary);

//     const intent = detectIntent(message);
//     const context = buildContext(intent, summary, message);
//     console.log("🧠 Context:", context);

//     const response = await LLMapi(message, context, history);
//     console.log("🤖 LLM:", response);

//     res.send({ reply: response });
//   } catch (err) {
//     console.error("🔥 ERROR:", err.message, err.stack);
//     res.status(500).json({ reply: "Server error" });
//   }
// });
// =================================AI------- CHAT -===================================================
app.post("/aiChat", async (req, res) => {
  try {
    const { message, holdings, livePrices, history } = req.body;

    const summary = contextSummary(holdings, livePrices);
    const intent = detectIntent(message);

    // ================= FAST PATH (NO LLM) =================

    if (intent === "profit_direct") {
      const { totalPnL, bestStock, worstStock } = summary;

      return res.send({
        reply: `P&L: ₹${Math.round(totalPnL)}
Best: ${bestStock.name} (+₹${Math.round(bestStock.pnl)})
Worst: ${worstStock.name} (₹${Math.round(worstStock.pnl)})`,
      });
    }

    if (intent === "funds_direct") {
      return res.send({
        reply: `Your funds are available in dashboard.`,
      });
    }

    if (intent === "positions_direct") {
      return res.send({
        reply: `You have ${holdings.length} active holdings.`,
      });
    }

    // ================= LLM PATH =================

    const context = buildContext(intent, summary, message);

    const response = await LLMapi(message, context, history);

    res.send({ reply: response });
  } catch (err) {
    res.status(500).json({ reply: "Error occurred" });
  }
});
//===========================================================================================
//=====================================================================================
//======================Web Socket Server Creation HERE==================================

// app.post("/addHolding", async (req, res) => {
//   await Holdings.deleteMany({});
//   await Holdings.insertMany(DataHolding);
//   res.send(`Data has been succesfully intialized `);
// });

//-------------------------------------------------GPT Copied

//------------------------------------------------------------

////////////////////////////SING UP PAGE AND LOIN PAGE ROUTES ---------------------------------------------------

//--------------------------------------SEND-OTP-Route--------------------------------------------

//-----------------------------------------------------------------------------------------------
// app.post("/signup", isAuthenticated, async (req, res) => {
//   try {
//     const { userName, email, password, confirmPassword } = req.body;
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }
//     const existingUser = await Users.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const User = await Users.create({
//       userName: userName,
//       email: email,
//       password: password,
//     });
//     const token = generateToken(user.id);
//     // send Generated Token to the cookie section
//     res.cookie("token", token, { httpOnly: true, secure: false });
//     res
//       .status(201) // status 201, indicates specially new response has been created
//       .json({ message: "User has been Successfully Registered" }, User);
//   } catch (errr) {
//     res.status(500).json({ error: errr.message });
//   }
// });
const clients = [];

// Step 1: Start Express server
const server = app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}`);
});

// Step 2: Attach WebSocket to SAME server
const wss = new WebSockets.Server({ server });

// Step 3: Handle connections
wss.on("connection", (ws) => {
  console.log("🟢 Frontend connected");

  clients.push(ws); // 🔥 YOU MISSED THIS

  ws.on("close", () => {
    console.log("🔴 Frontend disconnected");
    const index = clients.indexOf(ws);
    if (index > -1) clients.splice(index, 1);
  });
});

// Step 4: Send live updates
setInterval(() => {
  const updates = simulatePriceUpdate();

  clients.forEach((client) => {
    if (client.readyState === WebSockets.OPEN) {
      client.send(JSON.stringify(updates));
    }
  });
}, 7000);
