import Link from 'next/link';
import { authorContent } from '@/lib/content/authors';

export default function AdminAuthorsPage() {
  const authors = authorContent.getAllAuthors();

  return (
    <div className="p-10 max-w-6xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Authors</h1>
        <Link 
          href="/admin/authors/new" 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Tambah Author
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm tracking-wider uppercase">
              <th className="p-4 font-semibold">Profil</th>
              <th className="p-4 font-semibold">ID / Username</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={author.avatar || '/static/default-avatar.png'} alt="av" className="w-10 h-10 rounded-full object-cover border" />
                  <span className="font-medium text-gray-900">{author.name}</span>
                </td>
                <td className="p-4 text-gray-600 font-mono text-sm">{author.id}</td>
                <td className="p-4 text-gray-600">{author.email || '-'}</td>
                <td className="p-4">
                   {/* In real app, implement soft delete or edit pages */}
                   <span className="text-gray-400 italic text-sm">Hanya List (CRUD Placeholder)</span>
                </td>
              </tr>
            ))}
            {authors.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Belum ada author ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
