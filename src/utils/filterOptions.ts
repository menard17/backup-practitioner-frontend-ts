export const dateFilterOptions = Object.freeze({
  today: { title: "Today", addDays: 0 },
  tomorrow: { title: "Tomorrow", addDays: 1 },
  next7Days: { title: "Next 7 Days", addDays: 7 },
  next14Days: { title: "Next 14 Days", addDays: 14 },
  next30Days: { title: "Next 30 Days", addDays: 30 },
  divider: { divider: true },
  yesterday: { title: "Yesterday", addDays: -1 },
  last7Days: { title: "Last 7 Days", addDays: -7 },
  last14Days: { title: "Last 14 Days", addDays: -14 },
  last30Days: { title: "Last 30 Days", addDays: -30 },
});

export const statusFilterOptions = Object.freeze({
  booked: { title: "Booked", status: "booked" },
  cancelled: { title: "Cancelled", status: "cancelled" },
  fulfilled: { title: "Fulfilled", status: "fulfilled" },
  noShow: { title: "No Show", status: "noshow" },
});
