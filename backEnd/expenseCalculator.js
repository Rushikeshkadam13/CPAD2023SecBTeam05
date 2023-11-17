const { User, Balance, Expense, Group, PaymentNode, UserNode } = require("./structure.js");

var users = [];
users.push(new User(1));
users.push(new User(2));
users.push(new User(3));

var groups = [];
groups.push(new Group("g1", "PSR", users, ""));
groups.push(new Group("g2", "SAP", [users[0], users[2]], ""));

var expenses = [];

function getUser(uid) {
	for (const user of users) {
		if (user.uid === uid) {
			return user;
		}
	}
}

function getGroup(gid) {
	for (const group of groups) {
		if (group.gid === gid) {
			return group;
		}
	}
}

function getExpense(eid) {
	for (const expense of expenses) {
		if (expense.eid === eid) {
			return expense;
		}
	}
}

function addExpense(gid, uid, amount) {
	var expense = new Expense("e1", gid, "dinner", "");
    var group = getGroup(gid);
    var userBalances = group.userBalances;
    var groupUsers =group.users;
    var totalMembers = groupUsers.length;
    var splitAmount = amount / totalMembers;

    for (const user of groupUsers) {
        if (user != getUser(uid)) {
            var balance = userBalances.get(user);
            if (balance) {
                userBalances.set(user,  new Balance(balance.amount-splitAmount));
            }
            else {
                userBalances.set(user, new Balance(-splitAmount));
            }
        }
        else {
            var balance = userBalances.get(user);
            if (balance) {
                userBalances.set(user,  new Balance(balance.amount+amount-splitAmount));
            }
            else {
                userBalances.set(user, new Balance(amount-splitAmount));
            }
        }
    }
    // expense.userBalances = userBalances;
    group.userBalances = userBalances;
    return expense;
}

function generateUniqueId() {
  return `ID_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}



const lenders = [];
const borrowers = [];

// Function to insert a Person object while maintaining sorting by amount
function insertUserNode(person, sortedPeople) {
  sortedPeople.push(person);
  sortedPeople.sort((a, b) => b.amount - a.amount);
}

// Function to remove and return the person with the largest age
function popTopUser(sortedPeople) {
  if (sortedPeople.length === 0) {
    return undefined; // No people in the array
  }
  return sortedPeople.shift(); // Retrieve and remove the person with the largest age
}


function makePaymentGraph(gid) {

    var paymentGraph=[];
    var group = getGroup(gid);
    var userBalances = group.userBalances;
    for (const [user, balance] of userBalances) {
        
        if (balance.amount > 0) {
            const userNode = new UserNode(user.uid, balance.amount);
            insertUserNode(userNode, lenders);
        }
        else {  
            const userNode = new UserNode(user.uid, -balance.amount);
            insertUserNode(userNode, borrowers);
        }
    }

    while (lenders.length > 0) {
        const sender = popTopUser(borrowers);
        const receiver = popTopUser(lenders);

        const amountTransferred = Math.min(sender.amount , receiver.amount);
       
        paymentGraph.push(new PaymentNode(sender.uid, receiver.uid, amountTransferred));

        sender.amount -= amountTransferred;
        receiver.amount -= amountTransferred;

        if (sender.amount != 0)
            insertUserNode(sender, borrowers);

        if(receiver.amount != 0)
            insertUserNode(receiver, lenders);
    }

    return paymentGraph;
}


// insertUserNode(new Person('Alice', 25),lenders);
// insertUserNode(new Person('Bob', 30),lenders);
// insertUserNode(new Person('Charlie', 20),lenders);

// console.log(popTopUser(lenders));
// console.log(lenders);


console.log(addExpense("g1", 2, 90));
console.log(addExpense("g1", 1, 120));

console.log(makePaymentGraph("g1"))
console.log(getGroup("g1"))
// console.log(generateUniqueId());
