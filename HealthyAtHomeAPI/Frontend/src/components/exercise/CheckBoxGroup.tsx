import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React from "react";

type CheckBoxGroupProps = {
  values: Array<unknown>;
  labels: Array<string>;
  setValueArray: (val: any) => void;
};

export const CheckBoxGroup = ({
                                labels,
                                values,
                                setValueArray,
                              }: CheckBoxGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) setValueArray((prev: any) => [...prev, val]);
    else {
      setValueArray((prev: any[]) => prev.filter((diff) => diff !== val));
    }
  };

  return (
      <FormGroup>
        {values.map((value, i) => (
            <FormControlLabel
                key={i}
                control={<Checkbox value={value} onChange={handleChange}/>}
                label={labels[i]}
                sx={{
                  color: "#fff",
                }}
            />
        ))}
      </FormGroup>
  );
};
