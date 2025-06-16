
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ImportResult } from '@/services/erpnext/productService';

interface ImportResultAlertProps {
  result: ImportResult;
}

const ImportResultAlert: React.FC<ImportResultAlertProps> = ({ result }) => {
  return (
    <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
      {result.success ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <AlertCircle className="h-4 w-4 text-red-600" />
      )}
      <AlertTitle>
        {result.success ? "Import Completed" : "Import Failed"}
      </AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <div>
            <strong>Imported:</strong> {result.imported} products
          </div>
          <div>
            <strong>Updated:</strong> {result.updated} products
          </div>
          <div>
            <strong>Skipped:</strong> {result.skipped} products
          </div>
          {result.errors.length > 0 && (
            <div>
              <strong>Errors:</strong>
              <ul className="list-disc list-inside mt-1">
                {result.errors.slice(0, 5).map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
                {result.errors.length > 5 && (
                  <li className="text-sm">... and {result.errors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ImportResultAlert;
