class User {
	constructor(uid) {
		this.uid = uid;
	}
}

class Balance {
	constructor(amount) {
		this.amount = amount;
	}
}

class Expense {
	constructor(eid, gid, title, timestamp) {
		this.eid = eid;
		this.isSettled = false;
		this.userBalances = new Map(); // Map of User to Balance
		this.gid = gid;
		this.title = title;
		this.timestamp = timestamp;
	}
}

class Group {
	constructor(gid, title, users, description) {
		this.gid = gid;
		this.users = users;
		this.title = title;
		this.description = description;
		this.userBalances = new Map();
	}
}

class PaymentNode {
	constructor(from, to, amount) {
		this.from = from;
		this.to = to;
		this.amount = amount;
	}
}

class UserNode {
	constructor(uid, amount) {
		this.uid = uid;
		this.amount = amount;
	}
}

module.exports = { User, Balance, Expense, Group, PaymentNode, UserNode };
