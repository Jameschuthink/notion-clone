import Sidebar from '@/components/Sidebar';
import Editor from '@/components/Editor';

export default function Home() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Editor />
      </div>
    </main>
  );
}