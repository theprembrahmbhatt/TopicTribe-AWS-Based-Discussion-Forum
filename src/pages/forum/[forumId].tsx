import { useRouter } from 'next/router';
import Link from 'next/link';
import TopicList from '@/components/TopicList';

const topics = [
  { id: 1, title: 'Topic 1', forumId: 1 },
  { id: 2, title: 'Topic 2', forumId: 1 },
  { id: 3, title: 'Topic 3', forumId: 2 },
];

export default function ForumPage() {
  const router = useRouter();
  const { forumId } = router.query;

  const forumTopics = topics.filter(topic => topic.forumId === Number(forumId));

  return (
    <div>
      <h1>Topics in Forum {forumId}</h1>
      <TopicList topics={forumTopics} />
      <Link href="/home">Back to Forums</Link>
    </div>
  );
}
