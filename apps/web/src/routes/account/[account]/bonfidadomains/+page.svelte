<script>
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    //import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import { SOL } from "@helius-labs/xray/dist";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";
    import formatMoney from "src/lib/util/format-money";

    

    const account = $page.params.account;

    const client = trpcWithQuery($page);


    //const balances = client.balances.createQuery(account);

    //const sol = client.price.createQuery(SOL);

    const sns = client.bonfidaDomains.createQuery(account);
    //const sns = client.bonfidaDomains.createQuery(account);


    $: domainList = $sns?.data

</script>

<div>
    <!--a
        class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary"
        href="/token/{SOL}"
    -->
    {#if domainList}
    {#each domainList as domain}
        <div class="col-span-10 flex items-center justify-between text-right md:col-span-11">
            <div>
               {domain.pubkey} 
            </div>
            <div>
               {domain.name} 
            </div>
        </div>
     {/each}
    {/if}

</div>
