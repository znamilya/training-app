import { LoadingButton } from "@mui/lab";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type StartButtonProps = Omit<Parameters<typeof LoadingButton>[0], "startIcon">;

const StartButton = (props: StartButtonProps) => {
    return (
        <LoadingButton {...props} startIcon={<PlayArrowIcon />}>
            Start
        </LoadingButton>
    );
};

export default StartButton;
