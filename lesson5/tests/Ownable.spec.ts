import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Ownable } from '../wrappers/Ownable';
import '@ton/test-utils';

describe('Ownable', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ownable: SandboxContract<Ownable>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownable = blockchain.openContract(await Ownable.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ownable.send(
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
            to: ownable.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ownable are ready to use
    });
});
