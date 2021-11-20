import { RootStyled } from "./TaslCounter.styled";

export type TaskCounterProps = {
    value: number;
};

const TaskCounter = ({ value }: TaskCounterProps) => {
    return <RootStyled>({value})</RootStyled>;
};

export default TaskCounter;
