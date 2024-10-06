import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
// import {  App } from "antd";
import Page from "components/Page";
import Button from "components/Button";
import ArrowIcon from "assets/icons/ArrowIcon";
import cn from "utils/cn";
import getNext7Days from "./helpers/get7NextDays";
import getTimeSlots from "./helpers/getTimeSlots";
import RHFInputDate, { IDay } from "./components/RHFInputDate";
import RHFInputCounter from "./components/RHFInputCounter";
import RHFInputTime from "./components/RHFInputTimes";

type FormInputs = {
  guestsCount: number;
  time: string;
  date: IDay;
};

const STEPS = [
  {
    id: "bookATable",
    text: "Book a Table",
    type: "process",
  },
  {
    id: "customerInfomation",
    text: "Customer Infomation",
    type: "process",
  },
  {
    id: "reviewSummary",
    text: "Review Summary",
    type: "process",
  },
  {
    id: "reserved",
    text: "reserved",
    type: "done",
  },
];

const Booking = () => {
  // const { message } = App.useApp();

  const [stepsState, setStepsState] = useState<string[]>([STEPS[0].id]);

  const sevenNextDays = useMemo(getNext7Days, []);
  const timeSlots = useMemo(getTimeSlots, []);

  const {
    control,
    formState: { isLoading },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      guestsCount: 1,
      date: sevenNextDays[0],
      time: timeSlots[0],
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  };

  const getTextByStep = () => {
    if (stepsState.length === 4) return "My Reservation";
    if (stepsState.length === 3) return "Confirm reservation";
    return "Continue";
  };

  const handleContinue = () => {
    if (stepsState.length >= 4) return;
    setStepsState((prev) => [...prev, STEPS[stepsState.length].id]);
  };

  const handleBack = () => {
    if (stepsState.length === 1) return;
    const _stepsState = [...stepsState];
    _stepsState.pop();
    setStepsState(_stepsState);
  };

  const renderFirstStep = () => {
    return (
      <div className="grid grid-cols-12 gap-y-5">
        <div className="col-span-12">
          <RHFInputCounter
            control={control}
            name="guestsCount"
            label="Guests"
            rules={{
              required: "This is a required field!",
            }}
            min={1}
            max={20}
            moreLabel={<span className="text-secondary ml-1 font-[300] opacity-50">(Max 20)</span>}
          />
        </div>
        <div className="col-span-12">
          <RHFInputDate
            control={control}
            days={sevenNextDays}
            name="date"
            label="Date"
            rules={{
              required: "This is a required field!",
            }}
          />
        </div>
        <div className="col-span-12">
          <RHFInputTime
            control={control}
            times={timeSlots}
            name="time"
            label="Time"
            rules={{
              required: "This is a required field!",
            }}
          />
        </div>
      </div>
    );
  };

  const renderSecondStep = () => {
    return <div>STEP 2</div>;
  };

  const renderThirdStep = () => {
    return <div>STEP 3</div>;
  };

  const renderFourthStep = () => {
    return <div>STEP 4</div>;
  };

  return (
    <Page title="EatRight - Booking">
      <div className="px-4 bg-[#fafafa] min-h-screen">
        <div className="pt-12">
          <div className="flex items-center none-print cursor-pointer flex-1">
            {stepsState.length <= 3 && (
              <>
                <div className="flex items-center mr-2" onClick={handleBack}>
                  <div className={cn("p-1 bg-white rounded-full")}>
                    <ArrowIcon />
                  </div>
                  <div className="text-lg font-semibold text-primary ml-1 flex-1">
                    {STEPS[stepsState.length - 1].text}
                  </div>
                </div>
                <div className="flex items-center ml-auto">
                  {STEPS.map((step, idx) => {
                    if (step.type === "done") return null;
                    return (
                      <div key={idx} className="relative flex items-center ml-3">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            stepsState.includes(step.id) && " bg-primary",
                            !stepsState.includes(step.id) && " bg-tertiary"
                          )}
                        ></div>
                        {idx < 2 && (
                          <div
                            className="w-6 h-1 absolute z-[-1] left-1.5"
                            style={{
                              background: "linear-gradient(270deg, #FFF2F0 27.08%, #FF3B42 100%)",
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {stepsState.length == 1 && renderFirstStep()}
              {stepsState.length == 2 && renderSecondStep()}
              {stepsState.length == 3 && renderThirdStep()}
              {stepsState.length == 4 && renderFourthStep()}
              <div className="fixed bottom-0 left-0">
                <div className="w-screen bg-white h-24 shadow-[0px_-4px_8px_0px_#0000000A] px-4">
                  <Button
                    htmlType="submit"
                    onClick={handleContinue}
                    type="submit"
                    className="mt-3 py-3 rounded-3 w-full font-semibold text-lg"
                  >
                    {isLoading ? "Loading..." : getTextByStep()}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Booking;
