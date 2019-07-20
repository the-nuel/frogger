import { Step } from './Step';

export type ExecuteFunction<TState> = (state: TState) => Promise<TState>;

type StepOptions<TState> = {
    name: string;
    execute: ExecuteFunction<TState>;
};

/**
 * A simple step that executes a function to transform the state.
 */
export class ExecuteStep<TState> implements Step<TState> {
    name: string;
    protected execute: ExecuteFunction<TState>;

    constructor({ name, execute }: StepOptions<TState>) {
        this.name = name;
        this.execute = execute;
    }

    async run(state: TState): Promise<TState> {
        return await this.execute(state);
    }
}
