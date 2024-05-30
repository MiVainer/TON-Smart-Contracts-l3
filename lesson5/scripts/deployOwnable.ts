import { toNano } from '@ton/core';
import { Ownable } from '../wrappers/Ownable';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ownable = provider.open(await Ownable.fromInit());

    await ownable.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ownable.address);

    // run methods on `ownable`
}
