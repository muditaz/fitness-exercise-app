import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Icon from '../assets/icons/gym.png';

const BodyPart = ({item}) => {
    const bodyPartSelected = useSelector((state) => {return(state.bodyPartSelected)});
    const dispatch = useDispatch();
    return(
        <Stack type="button" alignItems="center" justifyContent="center" className="bodyPart-card" sx={bodyPartSelected === item ? { borderTop: '4px solid #FF2625', background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' } : { background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px' }}
        onClick={() => {
        dispatch({ type: 'setBodyPart', payload: item });
        window.scrollTo({ top: 1230, left: 100, behavior: 'smooth' });
        }}
        >
        <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
        <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize">{item}</Typography>
        </Stack>
    );
};

export default BodyPart;