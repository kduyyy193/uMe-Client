import React from "react";
import { useForm } from "react-hook-form";
import { App, Button, Modal } from "antd";
import { RHFTextField } from "components/Form";
import { REGEX_EMAIL } from "configs/auth";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

type FormInputs = {
  email: string;
};

const ForgotPassword: React.FC<IProps> = ({ open, handleClose }) => {
  const { message } = App.useApp();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      message.success(`We sent a recovery link to you at ${data.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    if (isSubmitting) return;
    handleClose();
  };

  const afterClose = () => {
    reset();
  };

  return (
    <div>
      <Modal open={open} footer={null} onCancel={onClose} afterClose={afterClose}>
        <div>
          <p className="text-6 leading-7.25 text-dark font-semibold">Forgot your Password?</p>
          <div className="mt-5.75">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-8">
                <div className="col-span-12">
                  <RHFTextField
                    control={control}
                    name={"email"}
                    label="Email"
                    placeholder="Enter email"
                    rules={{
                      required: "This is a required field!",
                      pattern: {
                        value: REGEX_EMAIL,
                        message: "Please enter a valid email address!",
                      },
                    }}
                  />
                </div>
                <div className="col-span-12 gap-y-2">
                  <div className="flex flex-col gap-y-2">
                    <Button
                      block
                      type="primary"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </Button>
                    <Button block type="text" onClick={handleClose} disabled={isSubmitting}>
                      <p className="text-tertiary">Back to Sign in</p>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
