'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  ListNumberedIcon,
  QuoteIcon,
  CodeIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const items = [
    {
      icon: BoldIcon,
      isActive: () => editor.isActive('bold'),
      onClick: () => editor.chain().focus().toggleBold().run(),
      tooltip: 'Bold',
    },
    {
      icon: ItalicIcon,
      isActive: () => editor.isActive('italic'),
      onClick: () => editor.chain().focus().toggleItalic().run(),
      tooltip: 'Italic',
    },
    {
      icon: ListBulletIcon,
      isActive: () => editor.isActive('bulletList'),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      tooltip: 'Bullet List',
    },
    {
      icon: ListNumberedIcon,
      isActive: () => editor.isActive('orderedList'),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      tooltip: 'Numbered List',
    },
    {
      icon: QuoteIcon,
      isActive: () => editor.isActive('blockquote'),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      tooltip: 'Quote',
    },
    {
      icon: CodeIcon,
      isActive: () => editor.isActive('code'),
      onClick: () => editor.chain().focus().toggleCode().run(),
      tooltip: 'Code',
    },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800',
            item.isActive() && 'bg-gray-100 dark:bg-gray-800'
          )}
          title={item.tooltip}
        >
          <item.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
};

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Untitled"
          className="text-4xl font-bold w-full bg-transparent border-none outline-none"
        />
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}