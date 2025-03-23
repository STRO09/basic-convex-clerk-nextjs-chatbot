"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    _id: string;
    text: string;
    role: "user" | "bot";
  }>>([]);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const queryMessages = useQuery(api.myFunctions.getMessages);
  const sendMessage = useMutation(api.myFunctions.storeMessage);

  // Only update messages on the client (prevents hydration errors)
  useEffect(() => {
    if (queryMessages) {
      setMessages(queryMessages);
    }
  }, [queryMessages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await sendMessage({ text: message, role: "user" });
    setMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Clerk
        <UserButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Clerk
        </h1>
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages?.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.role === "user" ? "ml-auto bg-blue-600" : "bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-blue-600 px-4 py-2 rounded"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
