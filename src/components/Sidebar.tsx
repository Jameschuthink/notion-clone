'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, DocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface PageItem {
  id: string;
  title: string;
  children?: PageItem[];
  level: number;
  isExpanded?: boolean;
}

const initialPages: PageItem[] = [
  {
    id: '1',
    title: 'Getting Started',
    level: 0,
    children: [
      {
        id: '2',
        title: 'Welcome',
        level: 1,
      },
      {
        id: '3',
        title: 'Basic Features',
        level: 1,
      },
    ],
  },
  {
    id: '4',
    title: 'Projects',
    level: 0,
    children: [
      {
        id: '5',
        title: 'Project A',
        level: 1,
      },
      {
        id: '6',
        title: 'Project B',
        level: 1,
      },
    ],
  },
];

export default function Sidebar() {
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [selectedPageId, setSelectedPageId] = useState<string>('1');

  const toggleExpand = (pageId: string) => {
    setPages(prevPages =>
      prevPages.map(page => {
        if (page.id === pageId) {
          return { ...page, isExpanded: !page.isExpanded };
        }
        return page;
      })
    );
  };

  const renderPageItem = (page: PageItem) => {
    const hasChildren = page.children && page.children.length > 0;
    const isSelected = selectedPageId === page.id;

    return (
      <div key={page.id}>
        <div
          className={clsx(
            'flex items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer',
            isSelected && 'bg-gray-100 dark:bg-gray-800'
          )}
          style={{ paddingLeft: `${page.level * 1.5 + 0.5}rem` }}
          onClick={() => setSelectedPageId(page.id)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(page.id);
              }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {page.isExpanded ? (
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
        {hasChildren && page.isExpanded && (
          <div className="ml-2">
            {page.children.map(child => renderPageItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 h-screen border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Notion Clone</h1>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {pages.map(page => renderPageItem(page))}
      </div>
      <button
        className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        <span className="text-sm">New page</span>
      </button>
    </div>
  );
}