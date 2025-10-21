interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="BNC Building"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <svg className="absolute top-0 right-0 w-3/4 h-full" viewBox="0 0 800 800" preserveAspectRatio="none">
          <path d="M 0,0 L 800,0 L 800,800 Q 400,750 0,700 Z" fill="rgba(249, 115, 22, 0.4)" />
          <path d="M 200,0 L 800,50 L 800,800 Q 500,780 200,750 Z" fill="rgba(249, 115, 22, 0.2)" />
        </svg>
      </div>

      <div className="absolute top-8 right-12 z-10">
        <div className="bg-white rounded-lg p-3 shadow-xl">
          <img
            src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="BNC Logo"
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-start px-20">
        <div className="max-w-2xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
            <h1 className="text-white mb-4">
              <span className="text-5xl font-light">Intranet </span>
              <span className="text-6xl font-black italic">BNC</span>
            </h1>

            <div className="flex space-x-6 mt-12">
              <button
                onClick={onLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
              >
                Entrar
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
                Olvidó la contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
