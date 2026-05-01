import { Link } from "react-router-dom";
import { menuCategories, menuItems } from "../Services/MenuItems";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {

  const ToolCard = ({ tool }: { tool: typeof menuItems[number] }) => {
    const path = `/${tool.route}`;

    return (
      <Link
        to={path}
        className="group relative p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div className="flex items-start justify-between mb-3">
          <tool.Icon className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">{tool.label}</h3>
        <p className="text-sm text-slate-600 mb-4">{tool.secondary}</p>
        <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:gap-2 transition-all">
          Open <FiArrowRight className="w-4 h-4 ml-1" />
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Categories Overview */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Tools by Category</h2>
          <div className="space-y-8">
            {menuCategories.map(category => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <category.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{category.category}</h3>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map(tool => (
                    <ToolCard key={tool.route} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            💡 Click the star icon to add tools to your favorites for quick access
          </p>
        </div>
      </div>
    </>
  );
}