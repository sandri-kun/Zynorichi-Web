import React from 'react';
import { Link } from '@/i18n/navigation';
import { Author } from '@/types/author';

interface AuthorProfileCardProps {
  author: Author;
  lang?: string;
  showLink?: boolean;
}

export function AuthorProfileCard({ author, lang = 'id', showLink = true }: AuthorProfileCardProps) {
  const CardContent = (
    <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm my-10 transition-shadow hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <img 
          src={author.avatar || '/static/default-avatar.png'} 
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" 
          alt={author.name} 
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{author.name}</h2>
          {author.credentials && (
            <p className="text-blue-600 font-medium mb-3">
              {author.credentials.title} @ {author.credentials.company}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {author.expertise?.map(skill => (
              <span key={skill} className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href={`/authors/${author.id}`}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
