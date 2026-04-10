interface PostBodyProps {
  html: string;
}

export default function PostBody({ html }: PostBodyProps) {
  return (
    <article
      className="prose prose-lg prose-sky max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
