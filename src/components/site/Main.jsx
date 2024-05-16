import { LuClipboardPaste } from "react-icons/lu";
import { Button } from "@/components/ui/button";
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

  // Extract set id from a normal quizlet URL
  function extractSetId(url) {
    const regex = /quizlet\.com\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const fetchQuizletSet = async () => {
    if (url == null || url == "") {
      return;
    }
    const setId = extractSetId(url);
    try {
      const response = await fetch(`/api/quizlet-set?setId=${setId}`);
      const data = await response.json();
      setResult(data);
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
    <main className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl text-center my-4 text-quizlet-light-blue">
        Quizlet Set Fetcher
      </h1>
      <div className="mx-2">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the Quizlet URL"
            className="searchInput bg-quizlet-gray bg-opacity-70 rounded-full p-3 px-5 w-full text-gray-300 placeholder:text-gray-500 inline-block"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handlePasteFromClipboard}
                  variant="outline"
                  className="border border-gray-500 hover:border-gray-900 transition flex items-center absolute right-4 top-1 p-2 bg-gray-200 rounded-full"
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
        <Button
          onClick={fetchQuizletSet}
          className="rounded-full bg-quizlet-blue w-full mt-4"
        >
          <p className="text-[16px]">Fetch Quizlet Set</p>
        </Button>

        <div className="bg-neutral-600 w-full h-[500px] rounded-lg mt-8">
          <pre className="w-full">
            <code className="w-max" placeholder='fg'>
              {result && JSON.stringify(result, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
