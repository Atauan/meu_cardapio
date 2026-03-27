import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Printer,
  Settings,
  FileText,
  ChevronDown,
  ChevronUp,
  Type,
  AlignLeft,
  ClipboardPaste,
  Save,
  FileUp
} from 'lucide-react';

const STORAGE_KEY = 'meuCardapioData';

const defaultData = {
  restaurantName: 'A Cantina do Chef',
  subtitle: 'Sabores autênticos desde 1998',
  theme: 'classic',
  fontSize: 'medium', // small, medium, large
  categories: [
    {
      id: 'cat-1',
      name: 'Entradas',
      expanded: true,
      pageBreakBefore: false,
      items: [
        { id: 'item-1', name: 'Bruschetta de Tomate', description: 'Pão rústico tostado com tomate fresco, alho e manjericão.', price: '5.50' },
        { id: 'item-2', name: 'Tábua de Queijos', description: 'Seleção de queijos regionais acompanhados de compota e nozes.', price: '12.00' }
      ]
    },
    {
      id: 'cat-2',
      name: 'Pratos Principais',
      expanded: true,
      pageBreakBefore: false,
      items: [
        { id: 'item-3', name: 'Bacalhau à Brás', description: 'Lascas de bacalhau envolvidas em batata palha, cebola e ovos.', price: '14.50' },
        { id: 'item-4', name: 'Bife da Casa', description: 'Bife do lombo com molho especial de pimentas, servido com batata frita.', price: '18.00' }
      ]
    },
    {
      id: 'cat-3',
      name: 'Sobremesas',
      expanded: false,
      pageBreakBefore: false,
      items: [
        { id: 'item-5', name: 'Mousse de Chocolate', description: 'Mousse caseira com 70% cacau.', price: '4.00' }
      ]
    }
  ]
};

export default function App() {
  // Carrega do localStorage ou usa dados padrão
  const [menuData, setMenuData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  // Estado para importação em massa
  const [bulkText, setBulkText] = useState('');
  const [bulkTargetCategory, setBulkTargetCategory] = useState('');

  // Salva no localStorage sempre que menuData muda
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
    } catch { /* storage full */ }
  }, [menuData]);

  // Funções de manipulação do estado principal
  const updateInfo = (field, value) => {
    setMenuData({ ...menuData, [field]: value });
  };

  // Funções para Categorias
  const addCategory = () => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: 'Nova Categoria',
      expanded: true,
      pageBreakBefore: false,
      items: []
    };
    setMenuData({ ...menuData, categories: [...menuData.categories, newCat] });
  };

  const updateCategory = (id, field, value) => {
    const updatedCategories = menuData.categories.map(cat =>
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    setMenuData({ ...menuData, categories: updatedCategories });
  };

  const removeCategory = (id) => {
    const updatedCategories = menuData.categories.filter(cat => cat.id !== id);
    setMenuData({ ...menuData, categories: updatedCategories });
  };

  const toggleCategory = (id) => {
    const updatedCategories = menuData.categories.map(cat =>
      cat.id === id ? { ...cat, expanded: !cat.expanded } : cat
    );
    setMenuData({ ...menuData, categories: updatedCategories });
  };

  // Funções para Itens
  const addItem = (categoryId) => {
    const newItem = {
      id: `item-${Date.now()}`,
      name: 'Novo Prato',
      description: 'Descrição do prato...',
      price: '0.00'
    };

    const updatedCategories = menuData.categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: [...cat.items, newItem], expanded: true };
      }
      return cat;
    });

    setMenuData({ ...menuData, categories: updatedCategories });
  };

  const updateItem = (categoryId, itemId, field, value) => {
    const updatedCategories = menuData.categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedItems = cat.items.map(item =>
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...cat, items: updatedItems };
      }
      return cat;
    });
    setMenuData({ ...menuData, categories: updatedCategories });
  };

  const removeItem = (categoryId, itemId) => {
    const updatedCategories = menuData.categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
      }
      return cat;
    });
    setMenuData({ ...menuData, categories: updatedCategories });
  };

  const handlePrint = () => {
    window.print();
  };

  // Importação em massa — parseia linhas "Nome Preço" ou só "Nome"
  const handleBulkImport = () => {
    if (!bulkText.trim() || !bulkTargetCategory) return;

    const lines = bulkText.split('\n').filter(line => line.trim());
    const newItems = lines.map((line) => {
      const trimmed = line.trim();
      // Tenta extrair preço do final da linha (ex: "Água 3.00" ou "Heineken 12.00")
      const match = trimmed.match(/^(.+?)\s+(\d+(?:[.,]\d{1,2})?)\s*$/);
      if (match) {
        return {
          id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: match[1].trim(),
          description: '',
          price: match[2].replace(',', '.')
        };
      }
      // Sem preço — cria item sem valor
      return {
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmed,
        description: '',
        price: ''
      };
    });

    const updatedCategories = menuData.categories.map(cat => {
      if (cat.id === bulkTargetCategory) {
        return { ...cat, items: [...cat.items, ...newItems], expanded: true };
      }
      return cat;
    });

    setMenuData({ ...menuData, categories: updatedCategories });
    setBulkText('');
  };

  // Mapa de tamanhos de fonte
  const fontSizeMap = {
    small:  { title: 'text-3xl', subtitle: 'text-xs', category: 'text-lg', item: 'text-sm', desc: 'text-xs', price: 'text-sm', spacing: 'space-y-3', catSpacing: 'space-y-6', pad: 'p-6' },
    medium: { title: 'text-5xl', subtitle: 'text-md', category: 'text-2xl', item: 'text-lg', desc: 'text-sm', price: 'text-lg', spacing: 'space-y-6', catSpacing: 'space-y-10', pad: 'p-10' },
    large:  { title: 'text-6xl', subtitle: 'text-lg', category: 'text-3xl', item: 'text-xl', desc: 'text-base', price: 'text-xl', spacing: 'space-y-8', catSpacing: 'space-y-12', pad: 'p-12' },
  };

  const fs = fontSizeMap[menuData.fontSize] || fontSizeMap.medium;

  // Estilos baseados no tema escolhido + tamanho de fonte
  const getThemeStyles = () => {
    switch (menuData.theme) {
      case 'modern':
        return {
          wrapper: `bg-white text-gray-800 font-sans ${fs.pad}`,
          header: 'text-center mb-12',
          title: `${fs.title} font-black uppercase tracking-widest text-gray-900 mb-2`,
          subtitle: `${fs.subtitle} font-medium uppercase tracking-widest text-gray-400`,
          category: `${fs.category} font-bold border-b-2 border-gray-900 pb-2 mb-6 uppercase tracking-wide`,
          itemName: `${fs.item} font-bold text-gray-900`,
          itemDesc: `${fs.desc} text-gray-500 mt-1`,
          itemPrice: `${fs.price} font-bold text-gray-900`,
          priceDots: 'hidden'
        };
      case 'rustic':
        return {
          wrapper: `bg-[#faf6f0] text-[#5c4033] font-serif ${fs.pad} border-[10px] border-[#8b5a2b]/20`,
          header: 'text-center mb-10 border-b-2 border-[#8b5a2b]/30 pb-6',
          title: `${fs.title} font-bold tracking-tight text-[#4a3020] mb-3`,
          subtitle: `${fs.subtitle} italic text-[#8b5a2b]`,
          category: `${fs.category} font-bold text-[#4a3020] mb-6 text-center mt-8`,
          itemName: `${fs.item} font-bold text-[#5c4033]`,
          itemDesc: `${fs.desc} italic text-[#705446] mt-1`,
          itemPrice: `${fs.price} font-bold text-[#4a3020]`,
          priceDots: 'flex-grow border-b-2 border-dotted border-[#8b5a2b]/40 mx-3 relative top-[-6px]'
        };
      case 'classic':
      default:
        return {
          wrapper: `bg-white text-gray-900 font-serif ${fs.pad}`,
          header: 'text-center mb-12',
          title: `${fs.title} font-normal mb-3`,
          subtitle: `${fs.subtitle} text-gray-600 italic`,
          category: `${fs.category} font-semibold mb-6 mt-8 text-center uppercase tracking-widest`,
          itemName: `${fs.item} font-semibold text-gray-900`,
          itemDesc: `${fs.desc} text-gray-600 mt-1`,
          itemPrice: `${fs.price} font-semibold text-gray-900`,
          priceDots: 'flex-grow border-b border-dashed border-gray-300 mx-3 relative top-[-6px]'
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row overflow-hidden font-sans">

      {/* PAINEL LATERAL - EDITOR (Oculto na impressão) */}
      <div className="w-full md:w-1/3 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full print:hidden z-10 shadow-lg">
        <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center sticky top-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Editor de Cardápio
            </h1>
            <p className="text-xs text-gray-500 mt-1">Personalize os detalhes abaixo</p>
          </div>
          <button
            onClick={handlePrint}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
            title="Imprimir ou Guardar como PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Definições Gerais */}
          <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              Informações Gerais
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome do Restaurante</label>
                <div className="relative">
                  <Type className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={menuData.restaurantName}
                    onChange={(e) => updateInfo('restaurantName', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Subtítulo / Slogan</label>
                <div className="relative">
                  <AlignLeft className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={menuData.subtitle}
                    onChange={(e) => updateInfo('subtitle', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Estilo Visual</label>
                <select
                  value={menuData.theme}
                  onChange={(e) => updateInfo('theme', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="classic">Clássico (Elegante, Serif)</option>
                  <option value="modern">Moderno (Limpo, Minimalista)</option>
                  <option value="rustic">Rústico (Aconchegante, Cores Quentes)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Tamanho da Fonte</label>
                <select
                  value={menuData.fontSize || 'medium'}
                  onChange={(e) => updateInfo('fontSize', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="small">Pequeno — mais itens por página</option>
                  <option value="medium">Médio — padrão</option>
                  <option value="large">Grande — destaque</option>
                </select>
              </div>
            </div>
          </section>

          {/* Importação Rápida em Massa */}
          <section className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ClipboardPaste className="w-4 h-4 text-blue-500" />
              Importação Rápida
            </h2>
            <p className="text-xs text-gray-500 mb-3">Cole uma lista de itens, um por linha. Formato: <strong>Nome do Produto Preço</strong><br/>Se não tiver preço, só coloque o nome.</p>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Categoria de destino</label>
              <select
                value={bulkTargetCategory}
                onChange={(e) => setBulkTargetCategory(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">Selecione uma categoria...</option>
                {menuData.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Água 3.00\nGuaravita 3.00\nRefrigerante 7.00\nBala Halls\nChiclete Trident`}
              rows="6"
              className="w-full text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono"
            />

            <button
              onClick={handleBulkImport}
              disabled={!bulkText.trim() || !bulkTargetCategory}
              className="w-full mt-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" /> Importar Itens
            </button>
          </section>

          {/* Gestão de Categorias e Itens */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Categorias e Pratos</h2>
              <button
                onClick={addCategory}
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Categoria
              </button>
            </div>

            <div className="space-y-4">
              {menuData.categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {/* Cabeçalho da Categoria */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex-1 flex items-center gap-2 mr-2">
                      <button onClick={() => toggleCategory(category.id)} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                        {category.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                        className="w-full text-sm font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:bg-white outline-none px-1 py-0.5 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateCategory(category.id, 'pageBreakBefore', !category.pageBreakBefore)}
                        className={`p-1.5 rounded transition-colors ${category.pageBreakBefore ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={category.pageBreakBefore ? 'Inicia em nova página ✓' : 'Iniciar em nova página'}
                      >
                        <FileUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addItem(category.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Adicionar Prato"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeCategory(category.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Remover Categoria"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lista de Itens (Expandível) */}
                  {category.expanded && (
                    <div className="p-3 space-y-3 bg-white">
                      {category.items.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-2">Sem itens nesta categoria. Adicione um prato!</p>
                      ) : (
                        category.items.map((item) => (
                          <div key={item.id} className="relative p-3 border border-gray-100 rounded-lg bg-gray-50/50 group">
                            <button
                              onClick={() => removeItem(category.id, item.id)}
                              className="absolute right-2 top-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                              title="Remover Prato"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="space-y-2 pr-6">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => updateItem(category.id, item.id, 'name', e.target.value)}
                                  placeholder="Nome do Prato"
                                  className="flex-1 text-sm font-semibold border-b border-gray-200 bg-transparent focus:border-blue-500 outline-none pb-1"
                                />
                                <div className="relative w-24">
                                  <span className="absolute left-1 top-1 text-gray-500 text-xs font-bold">R$</span>
                                  <input
                                    type="text"
                                    value={item.price}
                                    onChange={(e) => updateItem(category.id, item.id, 'price', e.target.value)}
                                    placeholder="0.00"
                                    className="w-full text-sm font-semibold border-b border-gray-200 bg-transparent focus:border-blue-500 outline-none pb-1 pl-6 text-right"
                                  />
                                </div>
                              </div>
                              <textarea
                                value={item.description}
                                onChange={(e) => updateItem(category.id, item.id, 'description', e.target.value)}
                                placeholder="Descrição detalhada..."
                                rows="2"
                                className="w-full text-xs text-gray-600 bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white rounded p-1 outline-none resize-none transition-colors"
                              />
                            </div>
                          </div>
                        ))
                      )}

                      <button
                        onClick={() => addItem(category.id)}
                        className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all flex justify-center items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Adicionar Novo Prato
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ÁREA DE PRÉ-VISUALIZAÇÃO / IMPRESSÃO */}
      <div className="flex-1 overflow-y-auto bg-gray-200 p-4 md:p-8 print:p-0 print:bg-white print:overflow-visible">
        <div className="flex flex-col items-center gap-8 print:gap-0">

          {/* Página principal com cabeçalho */}
          <div className={`
            menu-print-area
            w-full max-w-3xl min-h-[1056px] shadow-2xl print:shadow-none
            transition-all duration-300 bg-white
            print:w-full print:max-w-none print:m-0 print:min-h-0
            ${themeStyles.wrapper}
          `}>

            {/* Cabeçalho do Restaurante */}
            <div className={themeStyles.header}>
              <h1 className={themeStyles.title}>
                {menuData.restaurantName || 'Nome do Restaurante'}
              </h1>
              {menuData.subtitle && (
                <p className={themeStyles.subtitle}>{menuData.subtitle}</p>
              )}
            </div>

            {/* Categorias e Itens */}
            <div className={fs.catSpacing}>
              {menuData.categories.map((category, catIndex) => (
                <div
                  key={`preview-${category.id}`}
                  className={`menu-category ${category.pageBreakBefore ? 'page-break-here' : ''}`}
                >
                  {/* Indicador visual de nova página (preview) */}
                  {category.pageBreakBefore && catIndex > 0 && (
                    <div className="print:hidden flex items-center gap-3 mb-8 -mx-4">
                      <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">↓ NOVA PÁGINA</span>
                      <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
                    </div>
                  )}

                  {/* Nome da Categoria */}
                  <h2 className={themeStyles.category}>
                    {category.name}
                  </h2>

                  {/* Itens da Categoria */}
                  <div className={`${fs.spacing} ${menuData.theme === 'modern' ? 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 space-y-0 print:grid-cols-2' : ''}`}>
                    {category.items.map((item) => (
                      <div key={`preview-${item.id}`} className={`menu-item ${menuData.theme === 'modern' ? '' : 'flex flex-col'}`}>

                        <div className="flex justify-between items-end w-full">
                          <span className={themeStyles.itemName}>{item.name}</span>
                          <div className={themeStyles.priceDots}></div>
                          {item.price ? (
                            <span className={themeStyles.itemPrice}>R$ {item.price}</span>
                          ) : (
                            <span className={`${themeStyles.itemPrice} whitespace-nowrap`}>R$ <span className="inline-block w-16 border-b-2 border-dotted border-gray-400 print:border-gray-600">&nbsp;</span></span>
                          )}
                        </div>

                        {item.description && (
                          <p className={`w-11/12 ${themeStyles.itemDesc}`}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center print:border-gray-300">
              <p className="text-xs text-gray-400">
                Obrigado pela preferência!
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Estilos globais para impressão e paginação A4 */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body, html {
            margin: 0;
            padding: 0;
            background: white;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }

          /* O container flui naturalmente pelas páginas */
          .menu-print-area {
            min-height: auto !important;
            height: auto !important;
            overflow: visible !important;
            box-shadow: none !important;
          }

          /* Itens individuais nunca quebram no meio de uma página */
          .menu-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Títulos de categoria ficam com o conteúdo — nunca ficam sozinhos no final da página */
          .menu-category h2 {
            break-after: avoid;
            page-break-after: avoid;
          }

          /* Categorias marcadas com 'Nova Página' iniciam em folha nova */
          .page-break-here {
            break-before: page;
            page-break-before: always;
          }
        }
      `}} />
    </div>
  );
}