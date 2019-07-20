import { ExecuteOrFallbackStep } from "../ExecuteOrFallbackStep";

describe('ExecuteOrFallbackStep', () => {
    it('uses the value from execute if there is one', async () => {
        const execute = jest.fn((state) => Promise.resolve(state));
        const fallback = jest.fn();
        
        const step = new ExecuteOrFallbackStep<string>({ 
            name: 'test',
            execute,
            fallback,
        });

        const result = await step.run('state');

        expect(execute).toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();
        expect(result).toBe('state');
    });

    it('uses the fallback value if execute fails', async () => {
        const execute = jest.fn(() => Promise.resolve(undefined));
        const fallback = jest.fn((state) => Promise.resolve(state));
        
        const step = new ExecuteOrFallbackStep<string>({ 
            name: 'test',
            execute,
            fallback,
        });

        const result = await step.run('fallback');

        expect(execute).toHaveBeenCalled();
        expect(fallback).toHaveBeenCalled();
        expect(result).toBe('fallback');
    });
});
