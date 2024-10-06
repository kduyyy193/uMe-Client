import classNames from "classnames";

interface IProps {
    title: string;
}

interface IMap {
    [key: string]: {
        background: string;
        color: string;
    };
}

const TAG_COLORS: IMap = {
    cancel: {
        background: "bg-[#FFE2DF]",
        color: "text-[#EA4335]",
    },
    unconfirm: {
        background: "bg-[#FEDC32]",
        color: "text-[#404040]",
    },
    paid: {
        background: "bg-[#D1FFFF]",
        color: "text-[#0CAEAE]",
    },
    complete: {
        background: "bg-[#DFDFDF]",
        color: "text-light-dark",
    },
    refund: {
        background: "bg-[#DCE9FF]",
        color: "text-[#4285F4]",
    },
    processing: {
        background: "bg-[#FEDC32]",
        color: "text-[#404040]",
    },
    checkin: {
        background: "bg-[#1366AE]",
        color: "text-[#FFFFFF]",
    },
    incomplete: {
        background: "bg-[#1366AE]",
        color: "text-[#FFFFFF]",
    },
    confirm: {
        background: "bg-[#82A2C1]",
        color: "text-[#FFFFFF]",
    },
    pending: {
        background: "bg-[#FFF3DD]",
        color: "text-[#FBA705]",
    },
    canceled: {
        background: "bg-[#FFE2DF]",
        color: "text-[#EA4335]",
    },
    shipped: {
        background: "bg-transparent",
        color: "text-[#404040]",
    },
    return: {
        background: "bg-[#B73B36]",
        color: "text-[#FFFFFF]",
    },
    void: {
        background: "bg-[#B73B59]",
        color: "text-[#FFFFFF]",
    },
    "partial return": {
        background: "bg-[#000000]",
        color: "text-[#FFFFFF]",
    },
    "no show": {
        background: "bg-[#484848]",
        color: "text-[#FFFFFF]",
    },
    waiting: {
        background: "bg-[#FFD700]",
        color: "text-[#FFFFFF]",
    },
    "did not pay": {
        background: "bg-[#FF6347]",
        color: "text-[#FFFFFF]",
    },
    shipper: {
        background: "bg-[#1E90FF]",
        color: "text-[#FFFFFF]",
    },
    new: {
        background: "bg-[#42f468]",
        color: "text-[#FFFFFF]",
    },
    approved: {
        background: "bg-[#DCE9FF]",
        color: "text-[#4285F4]",
    },
    delivered: {
        background: "bg-[#FFF3DD]",
        color: "text-[#FBA705]",
    },
    received: {
        background: "bg-[#D1FFFF]",
        color: "text-[#0CAEAE]",
    },
    completed: {
        background: "bg-[#DFDFDF]",
        color: "text-[#555555]",
    },
};

const StatusTag: React.FC<IProps> = ({ title }) => {
    const { background = "bg-[#E0FFE8]", color = "text-[#34A853]" } = TAG_COLORS[title.toLowerCase()] || {};

    return (
        <div className={classNames("px-3.25 py-0.5 rounded w-fit", background)}>
            <p className={classNames("text-3 font-semibold capitalize leading-4.5", color)}>{title}</p>
        </div>
    );
};

export default StatusTag;
