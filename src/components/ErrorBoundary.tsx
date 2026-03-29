import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = this.state.error?.message || 'An unexpected error occurred.';
      let isFirestoreError = false;
      let firestoreDetails = null;

      try {
        const parsed = JSON.parse(errorMessage);
        if (parsed && parsed.operationType) {
          isFirestoreError = true;
          firestoreDetails = parsed;
          errorMessage = parsed.error;
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full border border-red-100">
            <div className="flex items-center gap-4 mb-6 text-red-600">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-black">Đã xảy ra lỗi</h1>
                <p className="text-red-500/80 font-medium">Ứng dụng gặp sự cố không mong muốn.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl mb-6 overflow-auto max-h-64 border border-slate-200 text-sm font-mono text-slate-700">
              {errorMessage}
            </div>

            {isFirestoreError && firestoreDetails && (
              <div className="bg-orange-50 p-4 rounded-xl mb-6 border border-orange-200 text-sm">
                <h3 className="font-bold text-orange-800 mb-2">Chi tiết lỗi cơ sở dữ liệu:</h3>
                <ul className="list-disc list-inside text-orange-700 space-y-1">
                  <li><strong>Thao tác:</strong> {firestoreDetails.operationType}</li>
                  <li><strong>Đường dẫn:</strong> {firestoreDetails.path}</li>
                </ul>
                <p className="mt-3 text-orange-600 font-medium">
                  Vui lòng kiểm tra quyền truy cập hoặc cấu hình Firebase của bạn.
                </p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
