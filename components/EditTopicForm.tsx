"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditTopicForm({ id, title, description }: { id: string; title: string; description: string }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        const res = await fetch(`https://todo-app-pasindu.vercel.app/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button className="bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600  font-bold text-white py-3 px-6 w-fit rounded-full">
        Update Topic
      </button>
    </form>
  );
}
