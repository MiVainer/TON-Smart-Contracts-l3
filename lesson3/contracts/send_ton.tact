import "@stdlib/deploy";

message Withdraw{
    amount: Int as coins;
}

contract SendTon with Deployable {
    const MinTonForStorage: Int = ton("0.01"); // 1kb for 2.5 year
    
    owner: Address;
    init() {
        self.owner = sender();
        
    }

    fun onlyOwner(){
        require(sender() == self.owner, "only owner is allowed to withdraw");
    }

    receive(){
                // accept incomint TON ransfer
    }

    receive("withdraw all"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }
    receive("withdraw safe"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: myBalance() - context().value - self.MinTonForStorage,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: Withdraw){
        self.onlyOwner();
        let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
        require(amount>0, "Insufficient balance");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }


    get fun balance(): Int{
        return myBalance();
    }

}
