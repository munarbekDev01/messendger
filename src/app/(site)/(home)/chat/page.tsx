"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const WebsocketChat = dynamic(
  () => import("@/components/pages/WebSocetPages/WebsocketChat"),
  { ssr: false }
);

const PageContent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    import("next/navigation").then((mod) => {
      const searchParams = mod.useSearchParams();
      const stringData = searchParams ? searchParams.get("params") : null;
      if (stringData) {
        try {
          setData(JSON.parse(stringData));
        } catch (error) {
          console.error("Invalid JSON in search params:", error);
        }
      }
    });
  }, []);

  return (
    <WebsocketChat data={data || { key: "", id: 0, user_name: "" }} />
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
