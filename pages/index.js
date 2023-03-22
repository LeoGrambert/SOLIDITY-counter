import { useEffect, useState } from "react";
import { getContract } from "../ethereum";
import Counter from "../contracts/Counter.json";

export default function Home() {
  const [count, setCount] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function initContract() {
      const contract = getContract(
        "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        Counter.abi,
        0 // Use the first account as the signer
      );
      setContract(contract);
      const initialCount = await contract.getCount();
      setCount(initialCount.toNumber());
    }
    initContract();
  }, []);

  async function increment() {
    if (!contract) return;
    const tx = await contract.increment();
    await tx.wait();
    const updatedCount = await contract.getCount();
    setCount(updatedCount.toNumber());
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
