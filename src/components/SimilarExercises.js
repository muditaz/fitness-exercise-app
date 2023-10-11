import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../utils/utils";
import { exerciseApiOptions } from "../constants/constants";
import { Box, Typography } from "@mui/material";
import HorizontalScrollbar from './HorizontalScrollBar'
import Loader from "./Loader";

const SimilarExercises = ({equipment, targetMuscle}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [similarTargetMuscleExercises, setSimilarTargetMuscleExercises] = useState([]);
    const [similarEquipmentExercises, setSimilarEquipmentExercises] = useState([]);

    const getData = async () => {
        try {
            if(targetMuscle && equipment) {
                const similarTargetMuscleExercises = await apiCall(`https://exercisedb.p.rapidapi.com/exercises/target/${targetMuscle}`, exerciseApiOptions);
                const similarEquipmentExercises = await apiCall(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`, exerciseApiOptions);
                setSimilarTargetMuscleExercises(similarTargetMuscleExercises);
                setSimilarEquipmentExercises(similarEquipmentExercises);
            }
        } catch(err) {
            navigate('/rapid-api-failure');
        }
    };

    useEffect(() => {
        if(similarTargetMuscleExercises.length !== 0) {
            setSimilarTargetMuscleExercises([]);
        }
        if(similarEquipmentExercises.length !== 0) {
            setSimilarEquipmentExercises([]);
        }
        getData();
    }, [id, equipment, targetMuscle]);

    return(
        <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
            <Typography sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }} fontWeight={700} color="#000" mb="33px">
                Similar <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Target Muscle</span> exercises
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                {similarTargetMuscleExercises.length !== 0 ? <HorizontalScrollbar data={similarTargetMuscleExercises} /> : <Loader />}
            </Box>
            <Typography sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px', mt: { lg: '100px', xs: '60px' } }} fontWeight={700} color="#000" mb="33px">
                Similar <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Equipment</span> exercises
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                {similarEquipmentExercises.length !== 0 ? <HorizontalScrollbar data={similarEquipmentExercises} /> : <Loader />}
            </Box>
        </Box>
    );
};

export default SimilarExercises;