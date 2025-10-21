import fondoLogin from '../images/fondo_login.png';
interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundImage: `url(${fondoLogin})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-4xl">
            <div className="bg-[rgba(255,255,255,0.45)] rounded-lg p-12 shadow-2xl mx-auto text-center" style={{ backdropFilter: 'blur(6px)' }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Intranet <span className="italic">BNC</span></h1>
            <div className="flex items-center justify-center space-x-6">
              <button onClick={onLogin} className="bg-bnc-accent hover:bg-bnc-accent/90 text-white font-bold px-10 py-3 rounded-full">Entrar</button>
              <button onClick={onLogin} className="bg-bnc-accent hover:bg-bnc-accent/90 text-white font-bold px-10 py-3 rounded-full">Olvidó la contraseña</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
