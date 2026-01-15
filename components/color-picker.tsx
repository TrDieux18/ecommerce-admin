import { Input } from "@/components/ui/input";

interface ColorPickerProps {
   value: string;
   onChange: (value: string) => void;
   disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
   value,
   onChange,
   disabled = false
}) => {
   return (
      <div className="flex items-center gap-x-2">
         <Input
            disabled={disabled}
            placeholder="Color value (e.g., #ff0000)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
         />
         <div className="flex flex-col gap-2">
            <label
               htmlFor="color-input"
               className="p-4 rounded-md border cursor-pointer shrink-0 hover:scale-105 transition-transform"
               style={{ backgroundColor: value || "#000000" }}
            />
            <input
               type="color"
               value={value || "#000000"}
               onChange={(e) => onChange(e.target.value)}
               disabled={disabled}

               id="color-input"
            />
         </div>
      </div>
   );
};