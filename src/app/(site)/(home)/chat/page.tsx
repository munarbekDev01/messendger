"use client";
import React, { useEffect, useState } from "react";
import WebsocketChat from "@/components/pages/WebSocetPages/WebsocketChat";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    key: string;
    id: number;
    user_name: string;
  } | null>(null); // Type the state to allow null initially

  useEffect(() => {
    const stringData = searchParams.get("params");
    const parsedData = stringData ? JSON.parse(stringData) : null;
    if (parsedData) {
      setData(parsedData); // Set the parsed data in state
    }
  }, [searchParams]);

  return (
    <div>
      <WebsocketChat data={data || { key: "", id: 0, user_name: "" }} />
    </div>
  );
};

export default Page;
