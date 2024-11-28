import cn from "utils/cn";

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: string;
  htmlType?: string;
};

const Button = ({ id, children, title, type, className, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      className={cn(
        `${className || ""}`,
        type === "submit" && "bg-primary text-white cursor-pointer hover:opacity-75",
        type === "cancel" &&
          "text-primary bg-white font-bold shadow-md cursor-pointer hover:opacity-75",
        type === "disabled" && "text-neutral-400 bg-neutral-200 font-semibold"
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick && onClick(e)}
    >
      <span className="btn-text">{children || title}</span>
    </button>
  );
};

export default Button;
