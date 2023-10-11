import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { apiCall } from "../utils/utils";
import { exerciseApiOptions } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import HorizontalScrollbar from "./HorizontalScrollBar";
import { useDispatch, useSelector } from "react-redux";

const SearchExercises = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const bodyParts = useSelector((state) => {return(state.bodyParts)});
    const navigate = useNavigate();

    const getDataForBodyParts = async () => {
        try {
            const bodyPartsData = await apiCall('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseApiOptions);
            dispatch({ type: 'setBodyParts', payload: bodyPartsData });   
        } catch(err) {
            navigate('/rapid-api-failure');
        }
    };

    useEffect(() => {
        if(bodyParts.length === 0)
        getDataForBodyParts();
    }, []);

    const getDataForExercises = async () => {
        const exercisesData = await apiCall('https://exercisedb.p.rapidapi.com/exercises?limit=1000', exerciseApiOptions);
        const searchedExercises = exercisesData.filter(
            (item) => item.name.toLowerCase().includes(search) || item.target.toLowerCase().includes(search) || item.equipment.toLowerCase().includes(search) || item.bodyPart.toLowerCase().includes(search)
        );
        window.scrollTo({ top: 1230, left: 100, behavior: 'smooth' });
        setSearch('');
        dispatch({ type: 'setExercises', payload: searchedExercises.length === 0 ? null : searchedExercises });
    }; 

    const handleClick = () => {
        if(search) {
            getDataForExercises();
        }
    }

    return(
        <Stack sx={{ml: { sm: '50px' }, alignItems: { lg: 'center' }}} mt="50px" justifyContent="center" p="20px">
            <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' }, textAlign: { lg: 'center' } }} mb="49px">
                Awesome Exercises You Should Know
            </Typography>
            <Box position="relative" mb="72px">
                <TextField
                height="76px"
                sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '800px', xs: '250px' }, backgroundColor: '#fff', borderRadius: '40px' }}
                value={search}
                onChange={(e) => {setSearch(e.target.value.toLowerCase());}}
                placeholder="Search Exercises"
                type="text"
                />
                <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: {lg: '0px'}, fontSize: { lg: '20px', xs: '14px' } }} onClick={handleClick}>
                Search
                </Button>
            </Box>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                <HorizontalScrollbar data={bodyParts} bodyParts={true} />
            </Box>
        </Stack>
    );
};

export default SearchExercises;