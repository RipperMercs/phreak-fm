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
  SpecimenReference,
} from "./mdx";
import { ZineBreak } from "./ZineBreak";

const mdxComponents = {
  Callout,
  Pullquote,
  AudioEmbed,
  Figure,
  Aside,
  Timeline,
  TrackList,
  Spectrogram,
  SpecimenReference,
  ZineBreak,
};

interface ArticleRendererProps {
  source: string;
}

export function ArticleRenderer({ source }: ArticleRendererProps) {
  return (
    <div className="max-w-article mx-auto font-body text-text leading-relaxed [&>h2]:font-display [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-display [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-5 [&>ul]:mb-5 [&>ol]:mb-5 [&>ul]:ml-5 [&>ol]:ml-5 [&>li]:mb-1 [&>blockquote]:border-l-2 [&>blockquote]:border-riso-ochre [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-text-muted">
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
