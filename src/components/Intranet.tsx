import { Settings, HelpCircle, Star, Share2, Search, Menu } from 'lucide-react';

interface IntranetProps {
  onOpenChatbot: () => void;
}

export default function Intranet({ onOpenChatbot }: IntranetProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-500 text-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-orange-600 rounded">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">SharePoint</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-orange-600 rounded">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-orange-600 rounded">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="BNC Logo"
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="text-xl font-light text-gray-600">Banco Nacional de Crédito</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                <Star className="w-4 h-4" />
                <span className="text-sm">No lo sigue</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Compartir</span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 pb-3">
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-700 hover:text-gray-900 pb-2 border-b-2 border-orange-500 font-medium">Banco Nacional de Crédito</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Biblioteca virtual</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Cambio de Clave</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Cambio de Clave VPN</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">De interés</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Caja de Ahorro</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Gestión de Datos</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Directorio</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-2">Organigrama</a>
          </div>
        </div>
      </nav>

      <aside className="fixed left-0 top-32 w-48 h-full bg-white border-r border-gray-200 p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en este sitio"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
        <nav className="space-y-1">
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VP Recursos Humanos...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VP Mercadeo y Comu...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VP Gestión Operativa ...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">GA Valores y Accionista...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VPE Gestión del Riesgo</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VP de Productos y Ser...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VPE Ingeniería Tecnol...</a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">VP Prevención y Contr...</a>
        </nav>
      </aside>

      <main className="ml-48 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-right text-sm text-gray-500 mb-4">
            Publicado el 21/4/2025
          </div>

          <div className="bg-blue-900 rounded-lg mb-8 h-48 flex items-center justify-center">
            <h1 className="text-white text-8xl font-black italic tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>BNC</h1>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="relative h-48">
                <img
                  src="https://images.pexels.com/photos/1543762/pexels-photo-1543762.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Cumpleaños"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Cumpleaños</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="relative h-48">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Somos BNC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Somos BNC</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="relative h-48">
                <img
                  src="https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=400"
                  alt="BNC En Línea"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">BNC</h3>
                  <p className="text-white text-sm">En Línea</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="relative h-48">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Gestión Corporativo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Gestión</h3>
                  <p className="text-white text-sm">Corporativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button
        onClick={onOpenChatbot}
        className="fixed bottom-8 right-8 transform transition-all hover:scale-110 focus:outline-none group z-50"
      >
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=200"
            alt="Asistente Virtual"
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
          <div className="absolute -top-8 right-0 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-bold text-gray-800 whitespace-nowrap">¡Hola, soy Abrill!</span>
          </div>
        </div>
      </button>
    </div>
  );
}
