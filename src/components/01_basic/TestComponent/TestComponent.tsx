import { useState } from "react";

const TestComponent = () => {
    const [isSwohn, setIsShown] = useState(false);

    return (
        <>
            <button
                name="Show"
                onClick={() => {
                    setTimeout(() => {
                        setIsShown(true);
                    }, 500);
                }}
            >
                Show
            </button>
            {isSwohn ? <div>Jopa</div> : null}
        </>
    );
};

export default TestComponent;
