import { useState } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "components/Form";
import { useNavigate } from "react-router-dom";
import { Button, App, Alert } from "antd";
import { REGEX_EMAIL } from "configs/auth";
import Page from "components/Page";
import ForgotPassword from "./components/ForgotPassword";
import cn from "utils/cn";

type FormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const { message } = App.useApp();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    if (data.email === "admin@gmail.com" && data.password === "admin123") {
      navigate("/auth/two-factor-login");
    } else {
      message.error("Incorrect email or password!");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((preVal) => !preVal);
  };

  const toggleModal = () => {
    setOpen((preVal) => !preVal);
  };

  return (
    <Page title="EatRight - Login">
      <div className="mt-40">
        <ForgotPassword open={open} handleClose={toggleModal} />
        <div className="w-full max-w-[540px]">
          <p className="text-12 leading-14.5 font-bold text-dark-light">Sign In</p>
          <p className="mt-2.5 text-4 leading-5.5 font-normal">
            If you have an account, sign in with your email address.
          </p>
          <div className="mt-4">
            <Alert
              message={
                <p>
                  Use <span className="font-bold">admin@gmail.com</span> with password{" "}
                  <span className="font-bold">admin123</span>
                </p>
              }
              type="info"
              showIcon
            />
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-5">
                <div className="col-span-12">
                  <RHFTextField
                    control={control}
                    name={"email"}
                    label="Email"
                    placeholder="Email"
                    moreclass="h-12.5 text-4 leading-5.5"
                    rules={{
                      required: "This is a required field!",
                      pattern: {
                        value: REGEX_EMAIL,
                        message: "Please enter a valid email address!",
                      },
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
                          "la-eye-slash" && !showPassword,
                          "la-eye" && showPassword
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
                    <Button className="w-full" type="text" size="large" onClick={toggleModal}>
                      <p className="text-left text-4 leading-4.75 font-semibold text-tertiary">
                        Forgot Password?
                      </p>
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
