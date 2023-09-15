import { BaseEditor, BaseRange } from 'slate'
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react'

export type CustomText = {
  text: string;
  decoration?: string;
};

export type TextElement = {
  type: 'text';
  children: CustomText[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & {
  nodeToDecorations?: Map<Element, Range[]>
};

export type EmptyText = {
  text: string;
};

export type EmojiElement = {
  type: 'emoji';
  emoji: string;
  custom: boolean;
  shortcode: string;
  children: EmptyText[];
};

export type CustomRange = BaseRange & {
  [key: string]: unknown;
};

export type CustomElement = TextElement |
  EmojiElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Range: CustomRange;
  }
}