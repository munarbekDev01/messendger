'use client'; // Убедитесь, что эта строка присутствует

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const WebsocketChat = dynamic(() => import('@/components/pages/WebSocetPages/WebsocketChat'), {
  ssr: false,
});

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stringData = searchParams ? searchParams.get("params") : null;
    if (stringData) {
      try {
        setData(JSON.parse(stringData));
      } catch (error) {
        console.error("Invalid JSON in search params:", error);
      }
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <WebsocketChat data={data || { key: "", id: 0, user_name: "" }} />
      </div>
    </Suspense>
  );
};

export default Page;
