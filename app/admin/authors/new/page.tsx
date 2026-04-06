import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authorContent } from '@/lib/content/authors';
import { validateCreateAuthor } from '@/lib/validation/author.validation';

export default function NewAuthorPage() {
  
  async function createAuthorAction(formData: FormData) {
    'use server';
    
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const avatar = formData.get('avatar') as string;
    const bio = formData.get('bio') as string;
    const expertise = (formData.get('expertise') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [];

    const rawData = { id, name, email, avatar, bio, expertise };
    
    // Server Side Validation
    const { isValid, errors } = validateCreateAuthor(rawData);
    
    if (isValid) {
      authorContent.createAuthor(rawData as any);
      revalidatePath('/admin/authors');
      redirect('/admin/authors');
    } else {
      // In advanced app, use useActionState to pass errors to Client Form
      console.error(errors);
      throw new Error(`Validasi gagal: ${Object.values(errors).join(', ')}`);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tambah Author Baru</h1>
      
      <form action={createAuthorAction} className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Author ID (slug)</label>
          <input name="id" required placeholder="john-doe" className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
          <input name="name" required placeholder="John Doe" className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input type="email" name="email" placeholder="john@example.com" className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL</label>
          <input name="avatar" required placeholder="https://github.com/johndoe.png" className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Keahlian (pisahkan koma)</label>
          <input name="expertise" placeholder="React, Next.js, UI Design" className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bio Singkat</label>
          <textarea name="bio" rows={4} required placeholder="Menceritakan sedikit tentang diri..." className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white transition"></textarea>
        </div>
        
        <div className="mt-4 flex gap-4">
          <a href="/admin/authors" className="px-6 py-3 border rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">Batal</a>
          <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Simpan Author</button>
        </div>
      </form>
    </div>
  );
}
