import { useId } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  /** Renders a textarea instead of an input. */
  rows?: number;
  autoComplete?: string;
  className?: string;
};

/**
 * Dark input/textarea with a floating label: the label sits inside the
 * field and lifts on focus or once there's a value (pure CSS, via the
 * `placeholder=" "` + :placeholder-shown trick — see .field in
 * globals.css). A signal-coloured line draws in along the bottom on focus;
 * :user-invalid shows the validation state only after interaction.
 */
export function Field({ label, name, type = "text", required, rows, autoComplete, className }: FieldProps) {
  const id = useId();
  const shared = {
    id,
    name,
    required,
    placeholder: " ",
    autoComplete,
    className: cn("field", !!rows && "resize-y"),
  };
  return (
    <div className={cn("field-wrap", className)}>
      {rows ? <textarea rows={rows} {...shared} /> : <input type={type} {...shared} />}
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <span className="field-line" aria-hidden />
    </div>
  );
}
