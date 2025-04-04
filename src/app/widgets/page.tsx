import widgetsData from "@/data/widgets.json";
import Header from "@/components/layout/Header";
import WidgetCard from "@/components/widgets/WidgetCard";

export default function WidgetListPage() {
  const widgets = widgetsData.widgets;

  // Duplicate the widgets to have more items for the grid
  const duplicatedWidgets = [
    ...widgets,
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-1` })),
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-2` })),
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-3` })),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {duplicatedWidgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 py-2 px-4 text-xs text-gray-500">
        <div className="flex justify-center space-x-4">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Contact</span>
          <span>Docs</span>
        </div>
        <div className="text-center mt-1">&copy; 2024. All rights reserved</div>
      </footer>
    </div>
  );
}
