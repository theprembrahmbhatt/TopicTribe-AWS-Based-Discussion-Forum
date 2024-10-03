import Link from 'next/link';

interface Topic {
  id: number;
  title: string;
}

export default function TopicList({ topics }: { topics: Topic[] }) {
  return (
    <ul>
      {topics.map(topic => (
        <li key={topic.id}>
          <Link href={`/topic/${topic.id}`}>
            {topic.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}