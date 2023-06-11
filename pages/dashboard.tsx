import { useEffect, useState } from 'react';
import ContractUploadForm from '../components/ContractUploadForm';
import ContractList from '../components/ContractList';

const Dashboard = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('username');
        setUsername(user);
    }, []);

    return (
        <div>
            {username && <p>Welcome, {username}</p>}
            <ContractUploadForm />
            <ContractList />
        </div>
    );
};

export default Dashboard;
