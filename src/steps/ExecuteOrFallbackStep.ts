import { ExecuteStep, ExecuteFunction } from './ExecuteStep';

type FallbackFunction<TState> = (state: TState) => Promise<TState>;

type StepOptions<TState> = {
    name: string;
    execute: ExecuteFunction<TState>;
    fallback: FallbackFunction<TState>;
}

export class ExecuteOrFallbackStep<TState> extends ExecuteStep<TState> {
    name: string;
    private fallback: FallbackFunction<TState>;

    constructor({ name, execute, fallback }: StepOptions<TState>) {
        super({ name, execute });
        this.fallback = fallback;
    }

    async run(state: TState): Promise<TState> {
        return await this.execute(state) || await this.fallback(state);
    }
}
