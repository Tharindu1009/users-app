import CN from "classnames";
import './Button.scss';
import { ArrowLeft } from '@mui/icons-material';

function Button({ text, type, isSelected, handleClick }) {

    const PrimaryButtonClasses = CN({
        "btn btn__primary": type === "primary",
        "btn btn__back": type === "back",
        "btn btn__curved": type === "curved",
        "btn btn__curved__selected": isSelected,
    });

    const handleOnClick = () => {
        handleClick(type, text);
    }

    return (
        <button type="button" className={PrimaryButtonClasses} onClick={() => handleOnClick()}>
            {type == "back" && <ArrowLeft className="icon" color="primary" fontSize="small"/>}{text}
        </button>
    );
}

export default Button;