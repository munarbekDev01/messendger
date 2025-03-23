"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const WebsocketChat = dynamic(
  () => import("@/components/pages/WebSocetPages/WebsocketChat"),
  { ssr: false }
);

const PageContent = () => {
  const searchParams = useSearchParams(); // ❗ Вызываем здесь, а не в useEffect
  const [data, setData] = useState<{ key: string; id: number; user_name: string } | null>(null);

  useEffect(() => {
    const stringData = searchParams.get("params");
    console.log(stringData, "Sdddddddddddddddddddddddd");

    if (stringData) {
      try {
        setData(JSON.parse(stringData));
      } catch (error) {
        console.error("Invalid JSON in search params:", error);
      }
    }
  }, [searchParams]); // ❗ Добавляем зависимость, чтобы перезапускался при изменении URL

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
