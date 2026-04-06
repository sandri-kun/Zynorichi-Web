import { Link } from '@/i18n/navigation';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/date';

interface ArticleCardProps {
  post: Post;
  lang: string;
}

export function ArticleCard({ post, lang }: ArticleCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/blog/${post.category}/${post.slug}`} className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
            {post.category}
          </span>
          <time className="text-gray-500 text-sm font-medium">
            {formatDate(post.date, lang)}
          </time>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
          {post.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {post.readingTime || 5} min read
            </span>
          </div>
          <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
