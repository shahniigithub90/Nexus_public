import { useState } from "react";
interface Transaction {
  id: number;
  date: string;
  sender: string;
  receiver: string;
  amount: number;
  status: "Completed" | "Pending";
}

function PaymentsPage() {
  const [balance, setBalance] = useState(12500);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2026-03-01",
      sender: "Investor A",
      receiver: "Startup B",
      amount: 2000,
      status: "Completed",
    },
  ]);

  // Deposit simulation
  const handleDeposit = () => {
    const amount = 500;

    setBalance(balance + amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sender: "You",
      receiver: "Wallet",
      amount: amount,
      status: "Completed",
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Withdraw simulation
  const handleWithdraw = () => {
    const amount = 200;

    if (balance < amount) {
      alert("Insufficient balance");
      return;
    }

    setBalance(balance - amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sender: "Wallet",
      receiver: "You",
      amount: amount,
      status: "Completed",
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Transfer simulation
  const handleTransfer = () => {
    const amount = 300;

    if (balance < amount) {
      alert("Insufficient balance");
      return;
    }

    setBalance(balance - amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sender: "You",
      receiver: "Other User",
      amount: amount,
      status: "Completed",
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Funding startup simulation
  const handleFundStartup = () => {
    const amount = 1000;

    if (balance < amount) {
      alert("Not enough funds");
      return;
    }

    setBalance(balance - amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sender: "Investor",
      receiver: "Startup Founder",
      amount: amount,
      status: "Completed",
    };

    setTransactions([newTransaction, ...transactions]);

    alert("Startup funded successfully!");
  };

  return (
    <div className="p-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Payments & Wallet</h1>

      {/* Wallet Balance */}
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h2 className="text-lg">Wallet Balance</h2>
        <p className="text-3xl font-bold mt-2">${balance}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleDeposit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Deposit
        </button>

        <button
          onClick={handleWithdraw}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>

        <button
          onClick={handleTransfer}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Transfer
        </button>
      </div>

      {/* Funding Deal Section */}
      <div className="border p-4 rounded mb-8">
        <h2 className="text-lg font-semibold mb-2">Fund a Startup</h2>

        <p>Startup: AI Health App</p>
        <p>Funding Request: $1000</p>

        <button
          onClick={handleFundStartup}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fund Startup
        </button>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Sender</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="border p-2">{tx.date}</td>
                <td className="border p-2">{tx.sender}</td>
                <td className="border p-2">{tx.receiver}</td>
                <td className="border p-2">${tx.amount}</td>
                <td className="border p-2">{tx.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default PaymentsPage;