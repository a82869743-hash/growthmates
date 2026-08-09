interface BlogQuoteProps {
  quote: string;
  author: string;
  role?: string;
}

const BlogQuote = ({ quote, author, role }: BlogQuoteProps) => (
  <blockquote className="my-10 rounded-2xl border-l-4 border-primary bg-primary/5 py-6 px-8">
    <p className="text-lg font-medium leading-relaxed text-foreground italic">
      "{quote}"
    </p>
    <footer className="mt-3 text-sm text-muted-foreground">
      — {author}{role && <span className="text-muted-foreground/70">, {role}</span>}
    </footer>
  </blockquote>
);

export default BlogQuote;
