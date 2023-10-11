import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../utils/utils";
import { defaultBodyPartSelected, exerciseApiOptions, exercisesOnHomePageOnLoad, exercisesPerBodyPart } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";
import Loader from './Loader';

const Exercises = () => {
    const exercises = useSelector((state) => {return(state.exercises)});
    const bodyPartSelected = useSelector((state) => {return(state.bodyPartSelected)});
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getExercisesDataOnBodyPartChange = async () => {
        try {
            let exercisesData = [];
            if (bodyPartSelected === defaultBodyPartSelected) {
                if(isFirstRender) {
                    exercisesData = await apiCall(`https://exercisedb.p.rapidapi.com/exercises?limit=${exercisesOnHomePageOnLoad}`, exerciseApiOptions);                    
                } else {
                    exercisesData = await apiCall('https://exercisedb.p.rapidapi.com/exercises?limit=1000', exerciseApiOptions);
                }
            } else {
                exercisesData = await apiCall(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPartSelected}?limit=${exercisesPerBodyPart}`, exerciseApiOptions);
            }
            dispatch({ type: 'setExercises', payload: exercisesData });
        } catch(err) {
            navigate('/rapid-api-failure');
        }
    };

    useEffect(() => {
        if(isFirstRender)
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        if(exercises !== [])
        dispatch({ type: 'setExercises', payload: [] });
        getExercisesDataOnBodyPartChange();
    }, [bodyPartSelected]);

    useEffect(() => {
        if(currentPage !== 1)
        setCurrentPage(1);
    }, [exercises]);

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1230, behavior: 'smooth' });
    };

    let currentExercises;
    if(exercises) {
        const indexOfLastExercise = currentPage * exercisesOnHomePageOnLoad;
        const indexOfFirstExercise = indexOfLastExercise - exercisesOnHomePageOnLoad;
        currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
    }

    return(<Box id="exercises" sx={{ mt: { lg: '19px' } }} mt="50px" p="20px">
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
        {!currentExercises ? <h1>Sorry, No results were found!!</h1> : (currentExercises.length === 0 ? <Loader /> : <>
            <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
                {currentExercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}
            </Stack>
            <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
                {exercises.length > exercisesOnHomePageOnLoad && (
                    <Pagination color="standard" shape="rounded" defaultPage={1} count={Math.ceil(exercises.length / exercisesOnHomePageOnLoad)} page={currentPage} onChange={paginate} size="large" />
                )}
            </Stack>
        </>)}
        
    </Box>);
}

export default Exercises;