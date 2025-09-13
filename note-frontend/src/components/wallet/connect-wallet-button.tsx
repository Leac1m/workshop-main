"use client";

import { useState } from 'react';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    if (isConnected) {
        setIsConnected(false);
        setWalletAddress("");
        toast({
            title: "Wallet Disconnected",
            description: "You have successfully disconnected your wallet.",
            action: <XCircle className="text-red-500" />,
        });
    } else {
        const mockAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        setWalletAddress(mockAddress);
        setIsConnected(true);
        toast({
            title: "Wallet Connected",
            description: `Successfully connected to address: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
            action: <CheckCircle className="text-green-500" />,
        });
    }
  };

  const getButtonText = () => {
    if (isConnected) {
      return `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
    }
    return 'Connect Wallet';
  };

  return (
    <Button onClick={handleConnect} variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary transition-colors duration-300">
      <Wallet className="mr-2 h-4 w-4" />
      {getButtonText()}
    </Button>
  );
}
