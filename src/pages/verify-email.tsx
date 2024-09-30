import { useState } from 'react';
import { confirmSignUp } from "aws-amplify/auth"
import { useRouter } from 'next/router';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp({username: email, confirmationCode: code});
      setSuccess('Email successfully verified! You can now log in.');
      // Optionally, redirect to login page
      setTimeout(() => router.push('/login'), 2000);
    } catch (error: any) {
      setError('Error confirming email: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;