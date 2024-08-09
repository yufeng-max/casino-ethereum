pragma solidity >=0.5.1 <0.6.0;

contract FlawedVoting {
    mapping(address => uint256) public remainingVotes;
    uint256[] public candidates;
    address public owner;
    bool public hasEnded = false;

    modifier notEnded() {
        require(!hasEnded, "Voting has ended");
        _;
    }

    constructor(uint256 amountOfCandidates) public {
        candidates.length = amountOfCandidates;
        owner = msg.sender;
    }

    function buyVotes() public payable notEnded {
        require(msg.value >= 1 ether, "Insufficient ether sent");
        uint256 votesBought = msg.value / 1 ether;
        remainingVotes[msg.sender] += votesBought;
        uint256 refund = msg.value % 1 ether;
        if (refund > 0) {
            msg.sender.transfer(refund);
        }
    }

    function vote(uint256 candidateID, uint256 amountOfVotes) public notEnded {
        require(candidateID < candidates.length, "Invalid candidate ID");
        require(remainingVotes[msg.sender] >= amountOfVotes, "Not enough votes");
        remainingVotes[msg.sender] -= amountOfVotes;
        candidates[candidateID] += amountOfVotes;
    }

    function payoutVotes(uint256 amount) public notEnded {
        require(remainingVotes[msg.sender] >= amount, "Not enough votes");
        uint256 etherAmount = amount * 1 ether;
        remainingVotes[msg.sender] -= amount;
        msg.sender.transfer(etherAmount);
    }

    function endVoting() public notEnded {
        require(msg.sender == owner, "Only owner can end voting");
        hasEnded = true;
        msg.sender.transfer(address(this).balance);
    }

    function displayBalanceInEther() public view returns (uint256 balance) {
        return address(this).balance / 1 ether;
    }
}
