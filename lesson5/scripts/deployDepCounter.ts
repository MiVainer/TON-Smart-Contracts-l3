import { toNano } from '@ton/core';
import { DepCounter } from '../wrappers/DepCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const depCounter = provider.open(await DepCounter.fromInit());

    await depCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(depCounter.address);

    // run methods on `depCounter`
}
