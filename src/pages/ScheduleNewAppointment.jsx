import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Calendar from "react-calendar";
import { dateFixerFn } from "../customFunctions";
import { GoBackIcon, ScheduleIcon } from "../icons";
import { CustomBtnInnerContent, CustomLinkBtn } from "../components/CustomBtns";
import { Form, Formik } from "formik";
import { CustomInput, CustomAreaInput } from "../components/CustomInput";
import { createAppoitmentSchema } from "../schemas";
import { CustomSelect } from "../components/CustomSelect";
import { officeHours, utilsData } from "../utils/utilsData";
import "react-calendar/dist/Calendar.css";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function ScheduleNewAppointment() {
  const [value, onChange] = useState(new Date());

  const token = localStorage.getItem("fetchedToken");

  async function appointmentCreator(title, startTime, endTime) {
    try {
      const response = await fetch(
        utilsData.apiURL + utilsData.apiCreatNewAppointment,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            title: title,
            user: localStorage.getItem("userId"),
            startTime: startTime,
            endTime: endTime,
            createdBy: localStorage.getItem("userId"),
          }),
        }
      );

      if (response.status === 400) {
      } else if (response.status === 401) {
      } else if (response.status === 404) {
      } else {
        const json = await response.json();
        console.log(json);
        console.log("success");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }

  const onSubmit = (values, actions) => {
    appointmentCreator(
      values.title,
      dateFixerFn(value, values.startTime),
      dateFixerFn(value, values.endTime)
    );
    actions.resetForm();
  };

  const getCurrentTime = () => dayjs().format("YYYY-MM-DDTHH:mm");
  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex justify-between gap-10 mt-20">
          <div className="basis-1/2 flex flex-col justify-center items-center">
            <Typography variant="h6">
              Please select from the below options:
            </Typography>
            <Formik
              initialValues={{
                title: "",
                startTime: "",
                endTime: "",
                description: "",
              }}
              validationSchema={createAppoitmentSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form className="flex flex-col mx-auto gap-4 mt-6">
                  {/* <CustomInput
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Enter your title!"
                /> */}
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      sx={{
                        "&  .MuiOutlinedInput-root": {
                          width: "500px",
                        },
                      }}
                      id="outlined-basic"
                      label="Enter your title"
                      variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Please select the start time">
                        <TimePicker
                          className="text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1"
                          sx={{
                            "& .MuiFormControl-root": {
                              border: "0px solid transparent",
                            },
                            "& .MuiInputBase-root": {
                              width: "500px",
                              color: "#717171",
                            },
                          }}
                          defaultValue={dayjs(getCurrentTime())}
                        />
                      </DemoItem>
                    </LocalizationProvider>{" "}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Please select the end time">
                        <TimePicker
                          className="text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1"
                          sx={{
                            "& .MuiFormControl-root": {
                              border: "0px solid transparent",
                            },
                            "& .MuiInputBase-root": {
                              width: "500px",
                              color: "#717171",
                            },
                          }}
                          defaultValue={dayjs(getCurrentTime())}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                    <TextField
                      sx={{
                        "&  .MuiOutlinedInput-root": {
                          width: "500px",
                        },
                      }}
                      id="outlined-multiline-static"
                      label="Enter a Description"
                      multiline
                      rows={4}
                      defaultValue=""
                    />
                  </Box>

                  {/* <CustomSelect
                  label="Start Time"
                  name="startTime"
                  placeholder="Please select the start time"
                >
                  <option value="">Please select the start time </option>
                  {officeHours.map(({ value, label }) => {
                    return (
                      <option
                        onChange={() => {
                          console.log(value);
                        }}
                        value={value}
                        key={label}
                      >
                        {label}
                      </option>
                    );
                  })}
                </CustomSelect> */}

                  {/* <CustomSelect
                  label="Start Time"
                  name="endTime"
                  placeholder="Please select the end time"
                >
                  <option value="">Please select the end time </option>
                  {officeHours.map(({ value, label }) => {
                    return (
                      <option
                        onChange={() => {
                          console.log(value);
                        }}
                        value={value}
                        key={label}
                      >
                        {label}
                      </option>
                    );
                  })}
                </CustomSelect> */}

                  {/* <CustomAreaInput
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Enter a brief description"
                /> */}

                  <button type="submit">
                    <span className="custom-btn-styles">
                      <CustomBtnInnerContent
                        text={"Schedule"}
                        icon={<ScheduleIcon />}
                      />
                    </span>
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="basis-1/2">
            <CustomLinkBtn
              path={"../CurrentSchedule"}
              className={
                "flex justify-center items-center gap-2 bg-gradient-to-tr w-[350px] mb-6 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              }
              text={"Go Back"}
              icon={<GoBackIcon />}
            />

            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleNewAppointment;
