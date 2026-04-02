import { Author } from 'content'

export function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="bg-slate-50 border rounded-2xl p-6 shadow-sm my-10">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img 
          src={author.avatar} 
          className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" 
          alt={author.name} 
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{author.name}</h2>
          <p className="text-blue-600 font-medium text-sm mb-2">
            {author.credentials?.title} @ {author.credentials?.company}
          </p>
          <p className="text-gray-600 text-sm italic">"{author.bio}"</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {author.expertise.map(skill => (
              <span key={skill} className="px-2 py-1 bg-white border text-gray-700 rounded-md text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}