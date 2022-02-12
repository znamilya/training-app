import { RootStyled } from "./TaslCounter.styled";

export type TaskCounterProps = {
    value: number;
    totalCount?: number;
};

const TaskCounter = ({ value, totalCount }: TaskCounterProps) => {
    return totalCount ? (
        <RootStyled>
            {value} / {totalCount}
        </RootStyled>
    ) : (
        <RootStyled>{value}</RootStyled>
    );
};

export default TaskCounter;
