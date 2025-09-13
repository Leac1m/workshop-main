import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions'
import { useCallback } from 'react';

import { config } from '../config'

const { packageId, module, create} = config;


export const useCreateNotes = () => {
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const createNote = useCallback(async (title: string, content: string) => {

        console.log("Content Recieved!", title, content);
        if (!currentAccount) {
            console.error("No wallet Connected!!!")
            return
        }

        try {
            const tx = new Transaction();

            const [note] = tx.moveCall({
                target: `${packageId}::${module}::${create}`,
                arguments: [tx.pure.string(title), tx.pure.string(content), tx.object.clock()]
            });


            tx.transferObjects([note], currentAccount.address)

            signAndExecuteTransaction({
                transaction: tx,
            },
            {
                onSuccess: (result) => {
                    console.log("Congrats a Note: ", result)
                },
                onError: (error) => {
                    console.error("You messed up :", error)
                }
            }
        )
        } catch (err) {
            console.log(err)
        }
    },[currentAccount, signAndExecuteTransaction])

    return createNote
}