import React from "react";
import state_data from "../general_data/states";
import Select from "react-select";

const StateFormField = ({ state, setState }) => {
  const states = state_data.map((state) => ({
    label: state.select,
    value: state.value,
  }));

  states.sort();

  return (
    <>
      <span>Select State:</span>
      <Select
        id="state"
        options={states}
        onChange={(e) => setState(e.value)}
        defaultInputValue={state}
        styles={{
          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            width: 350,
          }),
        }}
      />
    </>
  );
};

export default StateFormField;
