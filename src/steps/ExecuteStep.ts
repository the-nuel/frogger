import { Step } from './Step';

export type ExecuteFunction<TState> = (state: TState) => Promise<TState>;

/**
 * A simple step that executes a function to transform the state.
 */
export class ExecuteStep<TState> implements Step<TState> {
    name: string;
    protected execute: ExecuteFunction<TState>;

    constructor({ name, execute }) {
        this.name = name;
        this.execute = execute;
    }

    async run(state: TState): Promise<TState> {
        return await this.execute(state);
    }
}
