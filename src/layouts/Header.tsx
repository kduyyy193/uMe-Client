import { Dropdown, MenuProps, Image } from "antd";
import CloseIcon from "assets/icons/CloseIcon";
import MenuIcon from "assets/icons/MenuIcon";
import UserIcon from "assets/svg/user.svg";
import ArrowRightIcon from "assets/svg/arrowRight.svg";
import headerLogo from "assets/images/LOGO.png";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";

interface IHeader {
  openDrawerMenu: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
}

const Header = ({ closeDrawer, openDrawer, openDrawerMenu }: IHeader) => {
  const navigate = useNavigate();
  const { logout, user } = useStateContext();

  const items: MenuProps["items"] = [
    {
      key: "2",
      onClick: () => {
        logout();
      },
      label: <p className="py-1 px-2 text-3.75 leading-4.25 font-medium">Đăng xuất</p>,
    },
  ];

  const toggleMenu = () => {
    if (openDrawerMenu) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const renderMobile = () => {
    return (
      <div className="flex lg:hidden justify-between items-center">
        <button onClick={toggleMenu}>{openDrawerMenu ? <CloseIcon /> : <MenuIcon />}</button>
        <div>
          <Dropdown className="w-10 h-10" menu={{ items }} placement="bottomRight">
            <div className="rounded-full p-2.5 bg-lightest">
              <Image
                className="rounded-full"
                width={20}
                height={20}
                src={""}
                preview={false}
                fallback={UserIcon}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  };

  const onHome = () => {
    navigate("/");
  };

  const renderDesktop = () => {
    return (
      <div className="hidden h-full items-center justify-between sm:justify-between lg:flex">
        <div className="flex items-center gap-x-4">
          <div className="h-full pr-2.5">
            <div className="cursor-pointer" onClick={onHome}>
              <img alt="uME" width={50} src={headerLogo} />
            </div>
          </div>
          <div className="bg-dark w-0.25 h-10" />
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="flex flex-col">
              <p className="text-3 leading-3.25 text-light-dark">{"Welcome back"}</p>
              <div className="flex gap-x-1 cursor-pointer mt-1">
                <p className="text-4 font-semibold leading-3.25 text-light-dark">
                  {user?.username}
                </p>
                <img width={12} alt="Arrow Icon" src={ArrowRightIcon} />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <header className="top-0 right-0 left-0 fixed px-5 py-2.5 transition-all duration-300 ease-in-out z-50 block border-b border-footer bg-white">
      <div className="h-10 lg:h-15">
        {renderMobile()} {renderDesktop()}
      </div>
    </header>
  );
};

export default Header;
