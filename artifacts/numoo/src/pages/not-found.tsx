import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLangStore } from "@/lib/lang-store";

const TXT = {
  ar: {
    title: "404 الصفحة غير موجودة",
    desc: "الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.",
  },
  en: {
    title: "404 Page Not Found",
    desc: "The page you are looking for does not exist or has been moved.",
  },
} as Record<"ar" | "en", { title: string; desc: string }>;

export default function NotFound() {
  const { lang } = useLangStore();
  const T = TXT[lang];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{T.title}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {T.desc}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
