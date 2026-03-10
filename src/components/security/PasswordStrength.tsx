import { useState } from "react";
function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkStrength = (value: string) => {
    setPassword(value);

    if (value.length < 6) {
      setStrength("Weak");
    } else if (value.length < 10) {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  };

  const getColor = () => {
    if (strength === "Weak") return "text-red-600";
    if (strength === "Medium") return "text-yellow-600";
    if (strength === "Strong") return "text-green-600";
    return "";
  };

  return (
    <div className="max-w-md p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Create Password</h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => checkStrength(e.target.value)}
        className="border w-full p-2 rounded"
      />

      {password && (
        <p className={`mt-2 font-semibold ${getColor()}`}>
          Strength: {strength}
        </p>
      )}
    </div>
  );
}

export default PasswordStrength;