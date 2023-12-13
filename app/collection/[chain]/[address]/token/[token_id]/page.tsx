'use client'
import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { NftContext } from "@/lib/store"
import { Chain, ChainItem, CovalentClient, NftTokenContract } from "@covalenthq/client-sdk"
import { COVALENT_API_KEY } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function Collection({ params }: { params: { chain: Chain, address: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [collection, setCollection] = useState<NftTokenContract[]>([])
  const [busy, setBusy] = useState<boolean>(true)


  const handleCollection = async () => {
    setBusy(true);

    const client = new CovalentClient(COVALENT_API_KEY ? COVALENT_API_KEY : "");
    try {
        const collectionResp =
            await client.NftService.getTokenIdsForContractWithMetadataByPage(params.chain, params.address);
        if (collectionResp.error) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: collectionResp.error_message
            })
        }
        setCollection(collectionResp.data.items)

        console.log(collectionResp)

    } catch (exception) {
        console.log(exception)
    }
    setBusy(false)
  }

  useEffect(()=>{
    handleCollection()
  },[])

  if(busy) return;

  return (
    <Flex direction="column" gap="4" className="w-full">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        {collection[0].contract_name}
      </h1>
      <Flex wrap="wrap" gap="2">
        {collection.map((o,i) => {
          return <Card key={i}>
            <img src={o.nft_data.external_data.image_256}/>
          </Card>
        })}
      </Flex>
      <Flex gap="2">
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </Flex>
    </Flex>
  )
}
