const DATE_FORMAT = "MM/DD/YYYY";
const TIME_FORMAT = "hh:mm A";
const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A";

const TIME_RANGE_OPTIONS = [
    { value: "yesterday", label: "Yesterday" },
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
    { value: "lastWeek", label: "Last Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
    { value: "custom", label: "Custom" },
];

export { DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT, TIME_RANGE_OPTIONS };
