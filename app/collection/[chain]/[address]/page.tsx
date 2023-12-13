'use client'
import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { Chain, ChainItem, CovalentClient, NftTokenContract } from "@covalenthq/client-sdk"
import { COVALENT_API_KEY } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
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
