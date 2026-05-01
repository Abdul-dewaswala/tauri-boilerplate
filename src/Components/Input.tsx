interface InputProps {
  label?: string;
  value: string | number;
  setValue: (value: string | number) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
  helperText?: string;
  resetHelperText?: () => void;
}

export default function Input({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
  helperText,
  resetHelperText
}: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        className="w-full border p-2 rounded"
        type={type}
        value={value ?? ""}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder={placeholder}
        onKeyUp={resetHelperText}
      />
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
    </div>
  );
}