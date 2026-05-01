import { useAutostart } from '../Hooks/useAutostart';
import { FiToggleRight, FiHelpCircle } from 'react-icons/fi';
import { SHORTCUTS } from '../constant';

export default function Settings() {
  const { enabled, loading, toggle } = useAutostart();

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* System Settings Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-6">System Settings</h3>

        {/* Autostart Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-3 flex-1">
            <FiToggleRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Launch on Startup</p>
              <p className="text-sm text-slate-500">
                {loading ? 'Loading...' : enabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggle(!enabled)}
            disabled={loading}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ${
              enabled ? 'bg-green-500' : 'bg-slate-300'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiHelpCircle className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Keyboard Shortcuts</h3>
        </div>

        <div className="space-y-4">
          {/* Toggle Window Shortcut */}
          <div className="pb-4 border-b border-slate-200">
            <p className="font-medium text-slate-900 mb-2">Toggle Window</p>
            <p className="text-sm text-slate-600 mb-2">Show or hide the application window</p>
            <div className="flex gap-2">
              <kbd className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded text-sm font-semibold text-slate-700">
                {SHORTCUTS.TOGGLE_WINDOW}
              </kbd>
            </div>
          </div>

          {/* Open Search Shortcut */}
          <div>
            <p className="font-medium text-slate-900 mb-2">Global Search</p>
            <p className="text-sm text-slate-600 mb-2">Open the global search modal to quickly find tools</p>
            <div className="flex gap-2">
              <kbd className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded text-sm font-semibold text-slate-700">
                {SHORTCUTS.OPEN_SEARCH}
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 Tip:</strong> These shortcuts work globally, even when the application window is not focused.
        </p>
      </div>
    </div>
  );
}
