import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

export default function ChangeThemeBtn() {
    const {theme, setTheme} = useTheme();

    return (
        <div className="flex justify-end">
            <div className='cursor-pointer' onClick={() => theme === "light" ? setTheme("dark") : setTheme("light")}>
                {theme === "light"
                    ? <Sun size={18} />
                    : <Moon size={18} />
                }
            </div>
        </div>
    )
}
