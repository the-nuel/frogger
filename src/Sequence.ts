import { Step } from './steps';

export default class Sequence<TState> {
    steps: Step<TState>[];

    constructor(steps: Step<TState>[]) {
        this.steps = steps;
    }

    /**
     * Runs the sequence of steps in order.
     * @param state the initial state
     */
    async run(state: TState) {
        for(const step of this.steps) {
            state = await step.run(state);
        }

        return state;
    }
}
