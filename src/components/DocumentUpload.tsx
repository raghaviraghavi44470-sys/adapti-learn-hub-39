import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  type: string;
}

export const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading' as const,
      type: file.type,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'processing' } : f
        ));
      }, 1000);

      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'completed' } : f
        ));
        toast({
          title: "Document Processed",
          description: `${file.name} has been processed and is ready for analysis.`,
        });
      }, 3000);
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-learning p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-border hover:border-primary hover:bg-primary/5'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Upload Learning Materials</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your documents here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PDF, DOC, DOCX, TXT files
          </p>
          <Button variant="outline" className="mt-4">
            Choose Files
          </Button>
        </div>
      </Card>

      {files.length > 0 && (
        <Card className="card-learning p-6">
          <h4 className="text-lg font-semibold mb-4">Processing Files</h4>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • {file.status}
                    </p>
                  </div>
                </div>
                {getStatusIcon(file.status)}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};