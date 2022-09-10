import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ExerciseInfo, exerciseService} from "../../services/exerciseService";
import {ExerciseDetailsInfo} from "./ExerciseDetailsInfo";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export const ExerciseDetails = () => {
  const params = useParams();

  const [exercise, setExercise] = useState<ExerciseInfo | null>();
  const [loading, setLoading] = useState(false);

  const {openWithMessage} = useSnackbarContext();

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      if (params && params.id) {
        const response = await exerciseService.getById(parseInt(params.id));
        if (response) {
          const {data, success, message} = response.data;
          if (success) setExercise(data);
          else openWithMessage(message ?? "Server error");
        } else {
          openWithMessage(NO_RESPONSE_LABEL);
        }
        setLoading(false);
      }
    };
    params.id && getInfo();
  }, [params.id]);


  return (
      <>
        {loading ? <CircularProgress/> : exercise ? (<ExerciseDetailsInfo exercise={exercise}/>) : null}
      </>
  );
};
