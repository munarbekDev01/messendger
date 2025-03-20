"use client";
import React, { Suspense } from "react";
import WebsocketChat from "@/components/pages/WebSocetPages/WebsocketChat";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const stringData = searchParams.get("params");
  const data = stringData ? JSON.parse(stringData) : null;

  // Wrap the WebsocketChat with Suspense to prevent prerendering issues
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <WebsocketChat data={data || { key: "", id: 0, user_name: "" }} />
      </div>
    </Suspense>
  );
};

export default page;
