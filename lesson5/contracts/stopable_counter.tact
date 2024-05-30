import "@stdlib/deploy";
//import "@stdlib/stoppable";
import "@stdlib/ownable";


trait Stoppable with Ownable{
    owner: Address;
    stopped: Bool;

    receive("stop"){
        self.requireOwner();
        self.stopped = true;
        self.reply("stopped".asComment()); //пуш уведомление о том что транзакция прошла успешно
    }
    fun requireNotStopped() {
        require(!self.stopped, "Contract stopped");
    }

    fun requireStopped() {
        require(self.stopped, "contract not stopped");
    }

    get fun stopped(): Bool{
        return self.stopped;
    }
}


trait Resumable with Stoppable {
    stopped: Bool;
    owner: Address;

    receive("resume") {
        self.requireOwner();
        self.requireStopped();
        self.stopped = false;
        self.reply("resumed".asComment());
    }
}

message Add {
    queryId: Int as uint64;
    amount: Int as uint32;
}

contract StopableCounter with Deployable, Resumable {
    id: Int as uint32;
    counter: Int as uint32;
    stopped: Bool;
    

    init(id: Int) {
        self.id = id;
        self.counter = 0;
        self.stopped = false;
        self.owner = sender();
    }

    receive(msg: Add) {
        self.requireNotStopped();
        self.counter += msg.amount;

        // Notify the caller that the receiver was executed and forward remaining value back
        self.notify("Cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
}
