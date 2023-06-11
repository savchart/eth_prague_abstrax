import { useState } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        router.push('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default Auth;
