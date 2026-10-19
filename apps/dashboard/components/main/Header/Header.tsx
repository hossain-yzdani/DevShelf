import { Plus, Save } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface TProps {
  title: string;
  description: string;
  button: string;
  saveLogo?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  href?: string;
  is?: any;
}

const Header = (props: TProps) => {
  const buttonContent = (
    <>
      {props.saveLogo ? <Save size={18} /> : <Plus size={18} />}
      {props.button}
    </>
  );

  if (props.setOpen) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">{props.title}</h1>
          <p className="text-gray-400 mt-1">{props.description}</p>
        </div>
        {!props.is && (
          <button
            onClick={() => props.setOpen?.(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] font-medium hover:bg-[#F5F5F5]/90 transition"
          >
            {buttonContent}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">{props.title}</h1>
        <p className="text-gray-400 mt-1">{props.description}</p>
      </div>
      <Link
        href={props.href || "/"}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] font-medium hover:bg-[#F5F5F5]/90 transition"
      >
        {buttonContent}
      </Link>
    </div>
  );
};

export default Header;
