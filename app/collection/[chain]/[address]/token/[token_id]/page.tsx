'use client'
import { Chain} from "@covalenthq/client-sdk"
import { NFTDetailView } from "@covalenthq/goldrush-kit";

export default function Collection({ params }: { params: { chain: Chain, address: string, token_id: string } }) {
  return (
    <NFTDetailView
      chain_name={params.chain}
      collection_address={params.address}
      token_id={params.token_id}
    />
  )
}
