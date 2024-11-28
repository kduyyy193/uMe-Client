import classNames from "classnames";

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: string;
  htmlType?: string;
};

const Button = ({ id, children, title, type, className, style, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      className={classNames(
        `w-full flex items-center justify-center text-sm active:opacity-75 py-3 px-4 rounded-lg ${className || ""}`,
        {
          btn: type !== "disabled",
          "bg-primary-amber text-primary-#0C111D font-bold cursor-pointer":
            !type || type === "submit",
          "text-primary-amber bg-white font-bold shadow-md cursor-pointer hover:opacity-75":
            type === "cancel",
          "!text-neutral-400 !bg-neutral-200 font-semibold": type === "disabled",
        }
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick && onClick(e)}
      style={style}
    >
      <span className="btn-text">{children || title}</span>
    </button>
  );
};

export default Button;
