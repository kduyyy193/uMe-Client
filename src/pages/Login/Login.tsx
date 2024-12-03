import { useState } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "components/Form";
import { useNavigate } from "react-router-dom";
import { Button, App } from "antd";
import Page from "components/Page";
import LogoImg from "assets/images/LOGO.png";
import cn from "utils/cn";
import AuthService from "services/auth";
import useAsync from "hooks/useAsync";
import { TokenResponse } from "services/auth/types";
import { ApiResponse } from "services/types";
import { useStateContext } from "contexts/ContextProvider";
import { KEY_TOKEN } from "configs/auth";

type FormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { setToken, setUser } = useStateContext();

  const loginAPI = useAsync<ApiResponse<TokenResponse>>(AuthService.login);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const { username, password } = data;
      const response = await loginAPI.run({ username, password });
      if (response?.data) {
        console.log(response.data.user);
        setUser(response.data.user);
        setToken(response.data?.token);
        localStorage.setItem(KEY_TOKEN, response.data?.token);
        navigate("/table-view");
        return;
      }
      message.error("Incorrect email or password!");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((preVal) => !preVal);
  };

  return (
    <Page title="uMe - Login">
      <div className="p-4">
        <div className="w-full max-w-[540px] mx-auto">
          <div>
            <img className="mx-auto" src={LogoImg} alt="LOGO" />
          </div>
          <p className="text-3xl font-bold w-full mb-6 text-center mt-4">Sign In</p>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-5">
                <div className="col-span-12">
                  <RHFTextField
                    control={control}
                    name={"username"}
                    label="Username"
                    placeholder="Username"
                    moreclass="h-12.5 text-4 leading-5.5"
                    rules={{
                      required: "This is a required field!",
                    }}
                  />
                </div>
                <div className="col-span-12">
                  <RHFTextField
                    type={showPassword ? "text" : "password"}
                    control={control}
                    name={"password"}
                    label="Password"
                    placeholder="Password"
                    moreclass="h-12.5 text-4 leading-5.5"
                    endAdornment={
                      <i
                        onClick={toggleShowPassword}
                        className={cn(
                          "cursor-pointer text-lg las absolute top-2.5 right-3 z-10",
                          !showPassword && "la-eye-slash",
                          showPassword && "la-eye"
                        )}
                      />
                    }
                    rules={{
                      required: "This is a required field!",
                    }}
                  />
                </div>
                <div className="col-span-12 mt-5">
                  <div className="flex space-x-4">
                    <Button
                      loading={isSubmitting}
                      className="!px-15 w-full"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Login;
