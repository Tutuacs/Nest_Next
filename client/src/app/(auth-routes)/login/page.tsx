"use client";

import { getToastConfig } from "@/components/ui/toastConfig";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.status) {

      const config = getToastConfig(result?.status.toString());
      
      let message = 'Success';

      if (result.status != 200 && result.status != 201) {
        message = result.error || "Error";
      }
      
      toast({ title: config!.title, description: message, variant: config!.variant });
    }

    if (result?.error) {
      return;
    }

    setTimeout(() => {
      router.push('/home');
    }, 100);
  }


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="p-8 bg-white rounded-t-lg w-96">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
              
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:border-red-500 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Digite seu email de login"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:border-red-500 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href="/forgot" className="text-blue-400 hover:underline">
              esqueceu sua senha?
            </Link>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Link href="/register">
        <div className="flex p-8 m-auto text-2xl text-white rounded-b-lg hover:bg-slate-800 bg-slate-900 w-96 hover:text-red-400">
          <div className="m-auto">Não tenho cadastro</div>
        </div>
      </Link>
    </main>
  );
}
