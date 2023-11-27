import { useReducer } from "react";
import {
  MIN_RATING_QUANTITY,
  MAX_DISH_QUANTITY,
  MAX_RATING_QUANTITY,
  RATING_STEP,
} from "../../constants/constants";
import { Counter } from "../counter/component";

const DEFAULT_FORM_VALUE = {
  name: "",
  text: "",
  rating: MIN_RATING_QUANTITY,
};

const ACTION = {
  SET_NAME: "setName",
  SET_TEXT: "setText",
  SET_RATING: "setRating",
};

const reducer = function (state, action) {
  switch (action.type) {
    case ACTION.SET_NAME:
      return {
        ...state,
        name: action.payload,
        text: "",
        rating: MIN_RATING_QUANTITY,
      };
    case ACTION.SET_TEXT:
      return { ...state, text: action.payload };
    case ACTION.SET_RATING:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};

export const ReviewForm = () => {
  const [formValue, dispatch] = useReducer(reducer, DEFAULT_FORM_VALUE);

  const handleDecrement = () => {
    if (formValue.rating > MIN_RATING_QUANTITY) {
      dispatch({
        type: ACTION.SET_RATING,
        payload: formValue.rating - RATING_STEP,
      });
    }
  };

  const handleInecrement = () => {
    if (formValue.rating < MAX_DISH_QUANTITY) {
      dispatch({
        type: ACTION.SET_RATING,
        payload: formValue.rating + RATING_STEP,
      });
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formValue.name}
          onChange={(event) =>
            dispatch({ type: ACTION.SET_NAME, payload: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="text">Text</label>
        <input
          id="text"
          type="text"
          value={formValue.text}
          onChange={(event) =>
            dispatch({ type: ACTION.SET_TEXT, payload: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <Counter
          value={formValue.rating}
          min={MIN_RATING_QUANTITY}
          max={MAX_RATING_QUANTITY}
          onIncrement={handleInecrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
};
