'use client';

import { ChevronDownIcon, ChevronRightIcon, PlusIcon, DocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useStore from '@/store/useStore';

interface PageItemProps {
  pageId: string;
  level: number;
}

const PageItem = ({ pageId, level }: PageItemProps) => {
  const page = useStore((state) => state.pages[pageId]);
  const currentPageId = useStore((state) => state.currentPageId);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!page) return null;

  const hasChildren = page.children.length > 0;
  const isSelected = currentPageId === pageId;

  return (
    <div>
      <div
        className={clsx(
          'flex items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer',
          isSelected && 'bg-gray-100 dark:bg-gray-800'
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => setCurrentPage(pageId)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-3 w-3" />
            ) : (
              <ChevronRightIcon className="h-3 w-3" />
            )}
          </button>
        ) : (
          <DocumentIcon className="h-4 w-4 text-gray-400 mr-1" />
        )}
        <span className="ml-1 text-sm truncate">{page.title}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-2">
          {page.children.map((childId) => (
            <PageItem key={childId} pageId={childId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const createPage = useStore((state) => state.createPage);
  const rootPages = useStore((state) =>
    Object.values(state.pages).filter((page) => !page.parentId)
  );

  return (
    <div className="w-64 h-screen border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Notion Clone</h1>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {rootPages.map((page) => (
          <PageItem key={page.id} pageId={page.id} level={0} />
        ))}
      </div>
      <button
        onClick={() => createPage(null)}
        className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        <span className="text-sm">New page</span>
      </button>
    </div>
  );
}