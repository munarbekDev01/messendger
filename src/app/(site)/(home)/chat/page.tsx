
import WebChat from "@/components/pages/WebChat";

const page = () => {


  // Wrap the WebsocketChat with Suspense to prevent prerendering issues
  return (
   <WebChat/>
  );
};

export default page;
