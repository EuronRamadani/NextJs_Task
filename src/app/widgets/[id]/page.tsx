import widgetsData from "@/data/widgets.json";
import { notFound } from "next/navigation";
import WidgetDetails from "@/components/WidgetDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const widget = widgetsData.widgets.find((w) => w.id === resolvedParams.id);

  if (!widget) {
    notFound();
  }

  return <WidgetDetails widget={widget} />;
}
