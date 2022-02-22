import { RootStyled } from "./TaslCounter.styled";

export type TaskCounterProps = {
    value: number;
    totalCount?: number;
};

const resolveProgressColor = (value: number, totalCount: number): string => {
    if (value === 0) return "error.main";
    if (value === totalCount) return "success.main";

    return "warning.main";
};

const TaskCounter = ({ value, totalCount }: TaskCounterProps) => {
    return (
        <RootStyled
            sx={
                totalCount
                    ? {
                          color: resolveProgressColor(value, totalCount),
                      }
                    : {}
            }
        >
            {totalCount ? (
                <span>
                    {value} / {totalCount}
                </span>
            ) : (
                <span>{value}</span>
            )}
        </RootStyled>
    );
};

export default TaskCounter;
