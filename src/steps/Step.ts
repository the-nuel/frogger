export interface Step<TState> {
    name: string;
    run(state: TState): Promise<TState> | TState;
}
