import React from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("error loading topics", error);
    return null; // Return null if there is an error
  }
};

export default async function TopicList() {
  const data = await getTopics();
  
  // Provide a default value for topics if data is null or doesn't have a topics property
  const topics = data?.topics ?? [];

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t: any) => (
          <div key={t._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </>
  );
}
