import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
    const baseStyles = 'w-full px-5 py-3.5 bg-dark-bg border-2 rounded-xl transition-all duration-300 focus:outline-none text-white font-medium placeholder:text-gray-500 placeholder:font-normal';
    const normalStyles = 'border-gray-600 focus:border-neon-pink focus:ring-4 focus:ring-neon-pink/30 focus:shadow-2xl focus:shadow-neon-pink/20 hover:border-gray-500';
    const errorStyles = 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/30 shadow-lg shadow-red-500/20';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-white mb-3 tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-2 text-sm text-red-400 font-semibold flex items-center gap-1" role="alert">
            <span className="text-lg">⚠️</span> {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-300 font-medium">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', rows = 4, ...props }, ref) => {
    const baseStyles = 'w-full px-5 py-3.5 bg-dark-bg border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none text-white font-medium placeholder:text-gray-500 placeholder:font-normal';
    const normalStyles = 'border-gray-600 focus:border-mint focus:ring-4 focus:ring-mint/30 focus:shadow-2xl focus:shadow-mint/20 hover:border-gray-500';
    const errorStyles = 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/30 shadow-lg shadow-red-500/20';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-white mb-3 tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-2 text-sm text-red-400 font-semibold flex items-center gap-1" role="alert">
            <span className="text-lg">⚠️</span> {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-300 font-medium">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
