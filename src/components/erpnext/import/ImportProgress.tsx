
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2 } from 'lucide-react';

interface ImportProgressProps {
  isImporting: boolean;
  importProgress: number;
  selectedItemsCount: number;
  onImport: () => void;
}

const ImportProgress: React.FC<ImportProgressProps> = ({
  isImporting,
  importProgress,
  selectedItemsCount,
  onImport
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button 
        onClick={onImport} 
        disabled={isImporting || selectedItemsCount === 0}
        className="flex items-center gap-2"
      >
        {isImporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Importing...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Import Selected Products ({selectedItemsCount})
          </>
        )}
      </Button>

      {isImporting && (
        <div className="flex-1">
          <Progress value={importProgress} className="w-full" />
          <p className="text-sm text-gray-500 mt-1">{importProgress}% complete</p>
        </div>
      )}
    </div>
  );
};

export default ImportProgress;
