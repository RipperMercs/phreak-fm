"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  Callout,
  Pullquote,
  AudioEmbed,
  Figure,
  Aside,
  Timeline,
  TrackList,
  Spectrogram,
} from "./mdx";

const mdxComponents = {
  Callout,
  Pullquote,
  AudioEmbed,
  Figure,
  Aside,
  Timeline,
  TrackList,
  Spectrogram,
};

interface ArticleRendererProps {
  source: MDXRemoteSerializeResult;
}

export function ArticleRenderer({ source }: ArticleRendererProps) {
  return (
    <div className="prose prose-invert max-w-article mx-auto font-serif text-foreground leading-relaxed">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}
