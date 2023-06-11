import { useContext, useState } from "react";
import { Web3Context } from '../contexts/Web3Context';

const ContractForm = () => {
    const { web3, account } = useContext(Web3Context);
    const [code, setCode] = useState('');
    const [params, setParams] = useState('');

    const deploy = async () => {
        const contract = new web3.eth.Contract(JSON.parse(params));
        const deploy = contract.deploy({ data: code });
        const gas = await deploy.estimateGas();
        const options = {
            data: code,
            arguments: JSON.parse(params),
        };
        const sentDeploy = contract.deploy(options).send({
            from: account,
            gas,
        });
        console.log("Contract deployed at ", sentDeploy._address);
    };

    return (
        <div>
            <textarea placeholder="Contract code" onChange={(e) => setCode(e.target.value)} />
            <textarea placeholder="Contract params" onChange={(e) => setParams(e.target.value)} />
            <button onClick={deploy}>Deploy Contract</button>
        </div>
    );
};

export default ContractForm;
