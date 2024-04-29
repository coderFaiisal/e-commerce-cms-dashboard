import { Info, TriangleAlert, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const notify = (type: string, message: string, title?: string) => {
  switch (type) {
    case 'info':
      toast(t => (
        <>
          <div className="flex items-start space-x-3 min-w-36 mr-5">
            <div>
              <Info
                strokeWidth={1.5}
                className="bg-blue-600 w-6 h-6 rounded-full text-white"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold tracking-wider">
                {title ? title : 'Info'}
              </h1>
              <p className="text-sm">{message}</p>
            </div>
          </div>

          <div>
            <X
              onClick={() => toast.remove(t.id)}
              strokeWidth={1}
              className="w-4 h-4 rounded-full cursor-pointer  hover:text-[#ff4b4b] transition-all ease-in-out duration-200"
            />
          </div>
        </>
      ));
      break;
    case 'success':
      toast(t => (
        <>
          <div className="flex items-start space-x-3 min-w-36 mr-5">
            <div>
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold tracking-wider">
                {title ? title : 'Success'}
              </h1>
              <p className="text-sm">{message}</p>
            </div>
          </div>

          <div>
            <X
              onClick={() => toast.remove(t.id)}
              strokeWidth={1}
              className="w-4 h-4 rounded-full cursor-pointer  hover:text-[#ff4b4b] transition-all ease-in-out duration-150"
            />
          </div>
        </>
      ));
      break;
    case 'warning':
      toast(t => (
        <>
          <div className="flex items-start space-x-3 min-w-36 mr-5">
            <div>
              <TriangleAlert
                strokeWidth={3}
                className="bg-yellow-400 w-6 h-6 p-1 rounded-full text-white"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold tracking-wider">
                {title ? title : 'Warning'}
              </h1>
              <p className="text-sm">{message}</p>
            </div>
          </div>

          <div>
            <X
              onClick={() => toast.remove(t.id)}
              strokeWidth={1}
              className="w-4 h-4 rounded-full cursor-pointer  hover:text-[#ff4b4b] transition-all ease-in-out duration-150"
            />
          </div>
        </>
      ));
      break;
    case 'error':
      toast(t => (
        <>
          <div className="flex items-start space-x-3 min-w-36 mr-5">
            <div>
              <X
                strokeWidth={3}
                className="bg-[#ff4b4b] w-6 h-6 p-1 rounded-full text-white"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold tracking-wider">
                {title ? title : 'Error'}
              </h1>
              <p className="text-sm">{message}</p>
            </div>
          </div>

          <div>
            <X
              onClick={() => toast.remove(t.id)}
              strokeWidth={1}
              className="w-4 h-4 rounded-full cursor-pointer  hover:text-[#ff4b4b] transition-all ease-in-out duration-150"
            />
          </div>
        </>
      ));
      break;
    default:
      break;
  }
};
