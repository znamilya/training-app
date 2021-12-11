import { createEvent, createStore, forward, sample } from "effector";
import { createGate } from "effector-react";

const valueChange = createEvent<string>();
const formSubmit = createEvent();
const editModeOn = createEvent();
const editModeOff = createEvent();
const valueReset = createEvent();

const Gate = createGate<{ onCreate(title: string): void }>();

const $value = createStore("")
    .on(valueChange, (_, value) => value)
    .reset(valueReset);

const $editMode = createStore(false)
    .on(editModeOn, () => true)
    .on(editModeOff, () => false);

// Reset value when editing finished
forward({
    from: editModeOff,
    to: valueReset,
});

sample({
    clock: formSubmit,
    source: [Gate.state, $value],
    fn([{ onCreate }, value]) {
        onCreate(value);
    },
    target: editModeOff,
});

export { valueChange, formSubmit, editModeOn, editModeOff, Gate, $value, $editMode };
