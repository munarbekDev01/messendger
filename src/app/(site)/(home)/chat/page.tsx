"use client"
import WebsocketChat from '@/components/pages/WebSocetPages/WebsocketChat';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const page = () => {
     const searchParams = useSearchParams(); 
      const stringData = searchParams.get("params"); 
      const data = stringData ? JSON.parse(stringData) : null;
      console.log(data);
    return (
        <div>
            <WebsocketChat data={data}/>
        </div>
    );
};

export default page;