import { useState } from 'react';

const ContractList = () => {
    const [contracts, setContracts] = useState([
        {
            name: "Contract 1",
            code: `
      pragma solidity >=0.4.22 <0.9.0;

      contract Contract1 {
          function greet() public pure returns (string memory) {
              return "Hello, World!";
          }
      }
      `
        },
        {
            name: "Contract 2",
            code: `
      pragma solidity >=0.4.22 <0.9.0;

      contract Contract2 {
          function greet() public pure returns (string memory) {
              return "Hello, Universe!";
          }
      }
      `
        },
        {
            name: "AutoInvest",
            code: `
      pragma solidity ^0.8.13;

      interface IERC20 {
          function transfer(address to, uint256 value) external returns (bool);
          function balanceOf(address who) external view returns (uint256);
      }

      interface AAIPool {
          function deposit(uint256 _amount) external;
      }

      contract AutoInvest {
          address private _tokenAddress;
          address private _poolAddress;
          uint256 private _investThreshold;

          constructor (address tokenAddress, address poolAddress, uint256 investThreshold) {
              _tokenAddress = tokenAddress;
              _poolAddress = poolAddress;
              _investThreshold = investThreshold;
          }

          function invest() public {
              uint256 balance = IERC20(_tokenAddress).balanceOf(address(this));
              if (balance >= _investThreshold) {
                  uint256 excess = balance - _investThreshold;
                  require(IERC20(_tokenAddress).transfer(_poolAddress, excess), "AutoInvest: transfer failed");
                  AAIPool(_poolAddress).deposit(excess);
              }
          }
      }
      `,
            paramsPlaceholder: "Enter token address, pool address, invest threshold"
        }
    ]);

    const [selectedContract, setSelectedContract] = useState(null);
    const [parameters, setParameters] = useState('');

    const handleContractSelect = (contract) => {
        setSelectedContract(contract);
    };

    const handleParametersChange = (event) => {
        setParameters(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Selected contract:', selectedContract);
        console.log('Parameters:', parameters);
    };

    return (
        <div>
            <h2>Available Contracts</h2>
            <ul>
                {contracts.map((contract, index) => (
                    <li key={index} onClick={() => handleContractSelect(contract)}>
                        {contract.name}
                        <pre>{contract.code}</pre>
                        <input type="text" onChange={handleParametersChange} placeholder={contract.paramsPlaceholder || "Enter parameters"}/>
                        <button onClick={handleSubmit}>Submit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContractList;
