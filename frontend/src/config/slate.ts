import { BaseEditor, BaseRange, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react'

export type CustomText = {
  text: string;
  decoration?: string;
  children: Descendant[];
};

export type EmptyText = {
  text: string;
};

export type TextElement = {
  type: 'text';
  text: string;
  children: Descendant[];
};

export type EmojiElement = {
  type: 'emoji';
  id: string;
  emoji: string;
  custom: boolean;
  shortcode: string;
  children: EmptyText[];
};

export type LinkElement = {
  type: 'link',
  href: string,
  text: string,
  children: Descendant[],
};

export type ServerInviteElement = {
  type: 'server_invite',
  href: string,
  text: string,
  children: Descendant[],
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & {
  nodeToDecorations?: Map<Element, Range[]>
};

export type CustomRange = BaseRange & {
  [key: string]: unknown;
};

export type CustomElement = TextElement |
  EmojiElement |
  LinkElement |
  ServerInviteElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Range: CustomRange;
  }
}