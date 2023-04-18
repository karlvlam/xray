import { t } from "$lib/trpc/t";

import { z } from "zod";

import * as W3 from "@solana/web3.js";
import * as SNS from "@bonfida/spl-name-service";

export const bonfidaDomains = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        let conn = new W3.Connection(W3.clusterApiUrl('mainnet-beta'));
        let pubkeyWallet = new W3.PublicKey(address);
        let domainKeys = await SNS.getAllDomains(conn, pubkeyWallet);

        //const response = await fetch(domainKeys);
        console.log('### bonfida ####');
        console.log('Address:', address);
        console.log('DomainKeys:', domainKeys);

        let data = [];

        for (let i=0; i < domainKeys.length; i++){
            let name = await SNS.reverseLookup(conn, domainKeys[i]);
            let o = {pubkey: domainKeys[i], name: name};
            data.push(o)
        }

        return data;
    });
