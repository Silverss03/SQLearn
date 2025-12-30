import { useEditorState } from '@/hooks/useEditorState';
import './styles/index.scss';

export { default } from '@/components/RichTextEditor';

export type { UseEditorStateReturn } from '@/hooks/useEditorState';
export { useEditorState };
export { BubbleMenu } from '@tiptap/react';
export type { Editor, UseEditorOptions } from '@tiptap/react';
export * from './extensions/BaseKit';
