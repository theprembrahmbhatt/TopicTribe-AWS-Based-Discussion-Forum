import { useState } from 'react';

export default function CommentBox({ addComment }: { addComment: (comment: string) => void }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      addComment(text);
      setText('');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your comment"
      />
      <button onClick={handleSubmit}>Post Comment</button>
    </div>
  );
}
