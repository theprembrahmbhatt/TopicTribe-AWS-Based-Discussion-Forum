import { useRouter } from 'next/router';
import { useState } from 'react';
import RichEditor from '../../components/RichEditor';
import Link from 'next/link';

const commentsData = [
  { id: 1, text: 'This is a comment on topic 1', topicId: 1 },
  { id: 2, text: 'This is a comment on topic 2', topicId: 1 },
];

export default function TopicPage() {
  const router = useRouter();
  const { topicId } = router.query;

  const [comments, setComments] = useState(
    commentsData.filter(comment => comment.topicId === Number(topicId))
  );

  const addComment = (comment: string) => {
    setComments([...comments, { id: comments.length + 1, text: comment, topicId: Number(topicId) }]);
  };

  return (
    <div>
      <h1>Comments for Topic {topicId}</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <RichEditor />
      <Link href={`/forum/${topicId}`}>Back to Topics</Link>
    </div>
  );
}
