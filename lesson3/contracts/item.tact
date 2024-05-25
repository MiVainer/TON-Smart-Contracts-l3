import "@stdlib/deploy";

contract Item with Deployable {
    id: Int as uint64 = 1;
    
    init() {
        
    }

    get fun myAddress(): Address{
        return myAddress();
    }

    get fun otherAddress(): Address{
        let init: StateInit = initOf Item2();
        return contractAddress(init);
    }
}

contract Item2 with Deployable {
    id: Int as uint64 = 2;
    
    init() {
        
    }

    get fun myAddress(): Address{
        return myAddress();
    }

    get fun otherAddress(): Address{
        let init: StateInit = initOf Item();
        return contractAddress(init);
    }
}