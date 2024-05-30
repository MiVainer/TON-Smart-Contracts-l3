import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DepCounter } from '../wrappers/DepCounter';
import '@ton/test-utils';

describe('DepCounter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let depCounter: SandboxContract<DepCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        depCounter = blockchain.openContract(await DepCounter.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await depCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: depCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and depCounter are ready to use
    });
});
