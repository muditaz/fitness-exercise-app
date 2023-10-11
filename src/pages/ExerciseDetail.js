import { Box } from "@mui/material";
import Detail from "../components/Detail";
import { useEffect, useState } from "react";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import { useParams } from "react-router-dom";

const ExerciseDetail = () => {
    const [exerciseName, setExerciseName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [targetMuscle, setTargetMuscle] = useState('');
    const { id } = useParams();

    useEffect(() => {window.scrollTo({ top: 0, behavior: 'smooth' });}, [id]);



    return(
        <Box>
            <Detail setExerciseName={setExerciseName} setEquipment={setEquipment} setTargetMuscle={setTargetMuscle}/>
            <ExerciseVideos exerciseName={exerciseName}/>
            <SimilarExercises equipment={equipment} targetMuscle={targetMuscle} />
        </Box>
    );
};

export default ExerciseDetail;