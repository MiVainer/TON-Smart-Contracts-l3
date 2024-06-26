import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/trackable_counter.tact',
    options: {
        debug: true,
    },
};
