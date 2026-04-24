import { Tooltip, IconButton } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useContext } from "react";
import { ContextWindow } from "./ContextWindow";
// this is useContext() functions searches for nearest context
export default function WatchListAction({ id, onDelete }) {
  const { openWindow } = useContext(ContextWindow);

  const actions = [
    {
      label: "Buy (B)",
      icon: <TrendingUpIcon sx={{ fontSize: 15 }} />,
      className: "action-btn buy",
      onClick: () => openWindow(id, "BUY"),
    },
    {
      label: "Sell (S)",
      icon: <TrendingDownIcon sx={{ fontSize: 15 }} />,
      className: "action-btn sell",
      onClick: () => openWindow(id, "SELL"),
    },
    {
      label: "Analytics (A)",
      icon: <ShowChartIcon sx={{ fontSize: 15 }} />,
      className: "action-btn neutral",
      onClick: () => console.log(`Analytics: ${id}`),
    },
    {
      label: "Market Depth",
      icon: <BarChartIcon sx={{ fontSize: 15 }} />,
      className: "action-btn neutral",
      onClick: () => console.log(`Depth: ${id}`),
    },
    {
      label: "Delete (Del)",
      icon: <DeleteOutlineIcon sx={{ fontSize: 15 }} />,
      className: "action-btn danger",
      onClick: () => onDelete?.(id),
    },
    {
      label: "More",
      icon: <MoreHorizIcon sx={{ fontSize: 15 }} />,
      className: "action-btn neutral",
      onClick: () => console.log(`More: ${id}`),
    },
  ];

  return (
    <div className="watchlist-actions">
      {actions.map(({ label, icon, className, onClick }) => (
        <Tooltip key={label} title={label} placement="top" arrow>
          <IconButton
            size="small"
            className={className}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}
