'use client'
import { Chain } from "@covalenthq/client-sdk"
import { useRouter } from "next/navigation";
import { NFTCollectionTokenListView } from "@covalenthq/goldrush-kit";

export default function Collection({ params }: { params: { chain: Chain, address: string } }) {
  const router = useRouter();

  return (
    <NFTCollectionTokenListView
      chain_name={params.chain}
      collection_address={params.address}
      on_nft_click={(e: any)=>{
        router.push(`/collection/${params.chain}/${params.address}/token/${e.nft_data.token_id}`)
      }}
    />
  )

}
