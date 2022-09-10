import {Box, Divider, Paper, useMediaQuery, useTheme} from "@mui/material";
import React from "react";
import {PhysicalResults} from "../generate-form/GenerateWorkoutForm";
import Typography from "@mui/material/Typography";
import {LevelsOfDifficulty} from "../../enums/planOptionEnums";
import {splitCamelCase} from "../../helpers/inputValidator";
import {ImageWithText} from "../../images/ImageWithText";
import SideImage from '../../images/results-image.jpeg';

type PhysicalTestResultsProps = {
  results?: PhysicalResults;
};

export const PhysicalTestResults: React.FC<PhysicalTestResultsProps> = ({
                                                                          results
                                                                        }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const renderResults = (): JSX.Element => {
    return (
        <>
          {results &&
              Object.entries(results).map(([key, value]) => (
                  <Box
                      sx={{
                        m: 2
                      }}
                      key={key}
                  >
                    <Box component={"span"}>{splitCamelCase(key)} </Box>:
                    <Box component={"span"} sx={{color: "text.secondary"}}>
                      {" "}
                      {LevelsOfDifficulty[value]}
                    </Box>
                  </Box>
              ))}
        </>
    );
  };

  return (
      <Box>
        <Paper elevation={7} sx={{
          p: 2,
          minHeight: 500,
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          gap: 2,
        }}>
          {!isMobile &&
              <>
                <ImageWithText label={"Results"} image={SideImage} width={560} height={360}/>
                <Divider orientation={"vertical"} flexItem/>
              </>
          }
          <Box>
            <Typography
                variant={"h5"}
                color={"text.secondary"}
                sx={{
                  mb: 3
                }}
            >
              Your results are:
            </Typography>
            {renderResults()}
          </Box>
        </Paper>
      </Box>
  );
};
