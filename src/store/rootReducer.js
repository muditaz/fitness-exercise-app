import initialState from "./initialState";
import { produce } from "immer";

const rootReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case 'setBodyParts': {
                draft.bodyParts = ['all', ...action.payload];
                break;
            }
            case 'setBodyPart': {
                draft.bodyPartSelected = action.payload;
                break;
            }
            case 'setExercises': {
                draft.exercises = action.payload;
                break;
            }
            default:
                break;
        }
    });
};

export default rootReducer;