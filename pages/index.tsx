import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Web3Provider } from '../components/Web3Context';
import ContractForm from '../components/ContractForm';

const Index = () => {
    const SocialLoginDynamic = dynamic(
        () => import("../components/Auth").then((res) => res.default),
        {
            ssr: false,
        }
    );

    return (
        <Web3Provider>
            <Suspense fallback={<div>Loading...</div>}>
                <SocialLoginDynamic />
                <ContractForm />
            </Suspense>
        </Web3Provider>
    );
};

export default Index;
