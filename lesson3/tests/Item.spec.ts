import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Item } from '../wrappers/Item';
import '@ton/test-utils';
import { Item2 } from '../build/Item/tact_Item2';

describe('Item', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let item: SandboxContract<Item>;
    let item2: SandboxContract<Item2>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        item = blockchain.openContract(await Item.fromInit());
        item2 = blockchain.openContract(await Item2.fromInit());

        deployer = await blockchain.treasury('deployer');

        let deployResult = await item.send(
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
            to: item.address,
            deploy: true,
            success: true,
        });

        deployResult = await item2.send(
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
            to: item2.address,
            deploy: true,
            success: true,
        });
    });
    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and item are ready to use
    });
    
    it('should return addresses', async () => {
        const firstAddress = await Item.getMyAddress()
        const secondAddress = await Item2.getMyAddress()

        const otherAddress1 = await Item2.getOtherAddress()
        const otherAddress2 = await Item.getOtherAddress()

        console.log("firstAddress - ", firstAddress)
        console.log("otherAddress1 - ", otherAddress1)

        console.log("secondAddress - ", secondAddress)
        console.log("otherAddress2 - ", otherAddress2)

    })


});
