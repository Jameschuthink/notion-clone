import { create } from 'zustand';

interface Page {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  children: string[];
}

interface Store {
  pages: Record<string, Page>;
  currentPageId: string | null;
  setCurrentPage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<Page>) => void;
  createPage: (parentId: string | null) => string;
  deletePage: (pageId: string) => void;
}

const useStore = create<Store>((set) => ({
  pages: {
    '1': {
      id: '1',
      title: 'Getting Started',
      content: '',
      parentId: null,
      children: ['2', '3'],
    },
    '2': {
      id: '2',
      title: 'Welcome',
      content: 'Welcome to your Notion clone!',
      parentId: '1',
      children: [],
    },
    '3': {
      id: '3',
      title: 'Basic Features',
      content: 'Learn about the basic features...',
      parentId: '1',
      children: [],
    },
  },
  currentPageId: '1',

  setCurrentPage: (pageId) =>
    set(() => ({
      currentPageId: pageId,
    })),

  updatePage: (pageId, updates) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [pageId]: {
          ...state.pages[pageId],
          ...updates,
        },
      },
    })),

  createPage: (parentId) => {
    const newId = Math.random().toString(36).substr(2, 9);
    set((state) => {
      const newPages = {
        ...state.pages,
        [newId]: {
          id: newId,
          title: 'Untitled',
          content: '',
          parentId,
          children: [],
        },
      };

      if (parentId && state.pages[parentId]) {
        newPages[parentId] = {
          ...newPages[parentId],
          children: [...newPages[parentId].children, newId],
        };
      }

      return {
        pages: newPages,
        currentPageId: newId,
      };
    });
    return newId;
  },

  deletePage: (pageId) =>
    set((state) => {
      const { [pageId]: deletedPage, ...remainingPages } = state.pages;
      if (deletedPage.parentId) {
        remainingPages[deletedPage.parentId] = {
          ...remainingPages[deletedPage.parentId],
          children: remainingPages[deletedPage.parentId].children.filter(
            (id) => id !== pageId
          ),
        };
      }
      return {
        pages: remainingPages,
        currentPageId:
          state.currentPageId === pageId ? null : state.currentPageId,
      };
    }),
}));

export default useStore;