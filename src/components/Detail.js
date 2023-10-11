import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { exerciseApiOptions } from "../constants/constants";
import { apiCall } from '../utils/utils';
import Loader from './Loader';
import { Button, Stack, Typography } from "@mui/material";
import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({setExerciseName, setEquipment, setTargetMuscle}) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [exerciseDetail, setExerciseDetail] = useState(null);

    const getExerciseDetail = async () => {
        try {
            const exerciseDetail = await apiCall(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exerciseApiOptions);
            setExerciseName(exerciseDetail.name);
            setEquipment(exerciseDetail.equipment);
            setTargetMuscle(exerciseDetail.target);
            setExerciseDetail(exerciseDetail);
        } catch(err) {
            navigate('/rapid-api-failure');
        }
    };

    useEffect(() => {
        if(exerciseDetail !== null) {
            setExerciseDetail(null);
        }
        getExerciseDetail();
    }, [id]);

    if(!exerciseDetail)
    return(<Loader />);

    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    const extraDetail = [
        {
          icon: BodyPartImage,
          name: bodyPart,
        },
        {
          icon: TargetImage,
          name: target,
        },
        {
          icon: EquipmentImage,
          name: equipment,
        },
      ];
    return(
        <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
            <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
            <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
                <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
                    {name}
                </Typography>
                <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
                    Exercises keep you strong.{' '}
                    <span style={{ textTransform: 'capitalize' }}>{name}</span> bup is one
                    of the best exercises to target your {target}. It will help you improve your{' '}
                    mood and gain energy.
                </Typography>
                {extraDetail?.map((item) => (
                <Stack key={item.name} direction="row" gap="24px" alignItems="center">
                    <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
                        <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
                    </Button>
                    <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
                        {item.name}
                    </Typography>
                </Stack>
                ))}
            </Stack>
        </Stack>
    );
    
};

export default Detail;