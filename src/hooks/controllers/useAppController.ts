import { useContext } from "react";
import { AppContext } from "../../contexts/app";

const useAppController = () => {
    const appContext = useContext(AppContext);

    return appContext;
};

export default useAppController;
