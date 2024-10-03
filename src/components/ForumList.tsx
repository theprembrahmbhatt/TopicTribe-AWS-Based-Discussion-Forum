import Link from 'next/link';

interface Forum {
  id: number;
  name: string;
}

export default function ForumList({ forums }: { forums: Forum[] }) {
  return (
    <ul>
      {forums.map(forum => (
        <li key={forum.id}>
          <Link href={`/forum/${forum.id}`}>
            {forum.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}