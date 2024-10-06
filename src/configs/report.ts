interface IMap {
    [key: string]: string;
}

const DASHBOARD_CHART_BG: IMap = {
    Store: "bg-success-dark",
    POS: "bg-success-dark",
    "Website/App": "bg-info",
    Website: "bg-info",
    Consumer: "bg-info",
    CallOrder: "bg-warning",
    Other: "bg-warning",
    Others: "bg-warning",
};

const DASHBOARD_REPORT_COLORS = ["#34A853", "#4285F4", "#FBA705"];

export { DASHBOARD_CHART_BG, DASHBOARD_REPORT_COLORS };
