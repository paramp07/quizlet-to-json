import { LuClipboardPaste } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function Main() {
  const [url, setUrl] = useState("");
  const [pasted, setPasted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Extract set id from a normal quizlet URL
  function extractSetId(url) {
    const regex = /quizlet\.com\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const fetchQuizletSet = async () => {
    setLoading(true);
    if (url == null || url == "") {
      return;
    }
    const setId = extractSetId(url);
    try {
      const response = await fetch(`/api/quizlet-set?setId=${setId}`);
      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Quizlet set:", error);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <main className="max-w-4xl px-4 mx-auto">
      <h1 className="my-4 text-4xl text-center text-quizlet-light-blue">
        Quizlet Set Fetcher
      </h1>
      <div className="mx-2">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the Quizlet URL"
            className="inline-block w-full p-3 px-5 text-gray-300 rounded-full searchInput bg-quizlet-gray bg-opacity-70 placeholder:text-gray-500"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handlePasteFromClipboard}
                  variant="outline"
                  className="absolute flex items-center p-2 transition bg-gray-200 border border-gray-500 rounded-full hover:border-gray-900 right-4 top-1"
                >
                  <div className="flex items-center gap-1 px-2 text-quizlet-dark-blue">
                    <LuClipboardPaste />
                    {pasted ? <p>Pasted</p> : <p>Paste</p>}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paste Quizlet URL</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {loading ? (
          <Button disabled className="w-full mt-4 rounded-full bg-quizlet-blue">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            onClick={fetchQuizletSet}
            className="w-full mt-4 rounded-full bg-quizlet-blue"
          >
            <p className="text-[16px]">Fetch Quizlet Set</p>
          </Button>
        )}

        <div className="bg-neutral-600 w-full h-[500px] rounded-lg mt-8">
          <pre className="w-full">
            <code className="w-max" placeholder="fg">
              {result && JSON.stringify(result, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
