import { useState } from 'react';

const ContractUploadForm = () => {
    const [contractName, setContractName] = useState('');
    const [contractCode, setContractCode] = useState('');

    const handleContractSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Now we would typically send this contractCode to server
        // and save it in the directory,
        // but since we are mocking it, we will just log it here
        console.log("Submitted Contract: ", contractName, contractCode);
    };

    return (
        <div>
            <h2>Upload Contract</h2>
            <p>Upload a contract to the blockchain.</p>
        <form onSubmit={handleContractSubmit}>
            <label htmlFor="contractName">
                Contract Name:
                <input
                    type="text"
                    id="contractName"
                    value={contractName}
                    onChange={e => setContractName(e.target.value)}
                />
            </label>
            <label htmlFor="contractCode">
                Contract Code:
                <textarea
                    id="contractCode"
                    value={contractCode}
                    onChange={e => setContractCode(e.target.value)}
                />
            </label>
            <button type="submit">Upload</button>
        </form>
        </div>
    );
};

export default ContractUploadForm;
