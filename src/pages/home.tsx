import ForumList from '@/components/ForumList';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  return (

          <div>
            <ForumList />
          </div>
  );
}
