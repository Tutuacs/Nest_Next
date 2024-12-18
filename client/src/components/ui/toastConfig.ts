type ToastConfig = {
    status: string;
    title: string;
    description: string;
    variant: "default" | "destructive" | "warning" | "error" | "ok" | null | undefined;
  };
  
  export const toastConfig: ToastConfig[] = [
    { status: '200', title: 'Success', description: 'Operation completed successfully', variant: 'ok' },
    { status: '201', title: 'Success', description: 'Resource created successfully', variant: 'ok' },
    { status: '400', title: 'Warning', description: 'Bad request', variant: 'warning' },
    { status: '403', title: 'Warning', description: 'Unauthorized request', variant: 'warning' },
    { status: '404', title: 'Warning', description: 'Resource not found', variant: 'warning' },
    { status: '409', title: 'Warning', description: 'Conflict', variant: 'warning' },
    { status: '500', title: 'Error', description: 'Internal server error', variant: 'error' },
    { status: 'default', title: 'Error', description: 'An unexpected error occurred', variant: 'error' },
  ];
  
  export const getToastConfig = (status: string) => {
    return toastConfig.find(config => config.status === status) || toastConfig.find(config => config.status === 'default');
  };