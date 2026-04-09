import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
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
  source: string;
}

export function ArticleRenderer({ source }: ArticleRendererProps) {
  return (
    <div className="prose prose-invert max-w-article mx-auto font-serif text-foreground leading-relaxed">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}
