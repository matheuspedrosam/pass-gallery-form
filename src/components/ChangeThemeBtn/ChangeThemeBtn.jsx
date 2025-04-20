import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";

export default function ChangeThemeBtn() {
    const {theme, setTheme} = useTheme();

    return (
        <div className='fixed top-3 right-3 cursor-pointer p-2' onClick={() => theme === "light" ? setTheme("dark") : setTheme("light")}>
            {theme === "light"
                ? <Sun size={18} />
                : <Moon size={18} />
            }
        </div>
    )
}
