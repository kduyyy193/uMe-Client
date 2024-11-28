import editIcon from "assets/svg/edit.svg";
import checkIcon from "assets/svg/check_circle.svg";
import trashIcon from "assets/svg/trash.svg";
import classNames from "classnames";
import { Tooltip } from "antd";

type ActionProps = {
  allowEdit?: boolean;
  allowApprove?: boolean;
  allowDelete?: boolean;
};

type ActionsPropsType = {
  action: ActionProps;
  onEdit?: () => void;
  onApprove?: () => void;
  onDelete?: () => void;
};

const Actions = ({
  action,
  onEdit = () => {},
  onApprove = () => {},
  onDelete = () => {},
}: ActionsPropsType) => {
  return (
    <div className={classNames("w-full flex items-center gap-2 justify-center")}>
      {action?.allowEdit && (
        <Tooltip title={"Edit"}>
          <div onClick={onEdit} className="hover:opacity-75 w-6 h-6 cursor-pointer">
            <img src={editIcon} alt="Edit" />
          </div>
        </Tooltip>
      )}
      {action?.allowApprove && (
        <Tooltip title={"Approve"}>
          <div onClick={onApprove} className="hover:opacity-75 w-6 h-6 cursor-pointer">
            <img src={checkIcon} alt="Approve" />
          </div>
        </Tooltip>
      )}
      {action?.allowDelete && (
        <Tooltip title={"Delete"}>
          <div onClick={onDelete} className="hover:opacity-75 w-6 h-6 cursor-pointer">
            <img src={trashIcon} alt="Delete" />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Actions;
