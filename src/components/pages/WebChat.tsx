"use client"
import { FC } from "react";
import React, { Suspense } from "react";
import WebsocketChat from "@/components/pages/WebSocetPages/WebsocketChat";
import { useSearchParams } from "next/navigation";
const WebChat: FC = () => {
    const searchParams = useSearchParams();
    console.log(searchParams);
    
    const stringData = searchParams.get("params");
    const data = stringData ? JSON.parse(stringData) : null;
 return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <WebsocketChat data={data || { key: "", id: 0, user_name: "" }} />
    </div>
  </Suspense>
 );
};

export default WebChat;
