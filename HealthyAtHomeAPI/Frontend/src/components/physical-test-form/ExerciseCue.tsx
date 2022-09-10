import React from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type ExerciseCueProps = {
  name: string;
  good?: boolean;
};

export const ExerciseCue: React.FC<ExerciseCueProps> = ({
                                                          name,
                                                          good = false,
                                                        }) => {
  return (
      <Box
          sx={{
            display: "flex",
          }}
      >
        {good ? <CheckIcon color={"success"}/> : <CloseIcon color={"error"}/>}
        <Typography variant={"body1"}>{name}</Typography>
      </Box>
  );
};
