import { vector, Image } from "../constants/images";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-center items-center h-[56px] ">
      <div className="flex flex-row justify-end items-center w-[800px] space-x-[5px]">
        <div>
          <button className="border border-solid hover:border-[#1A1A1A] rounded-[40px] py-[11.5px] px-[8.820px]">
            <select name="menu" id="menu">
              <option value="menu">Menu</option>
            </select>
          </button>
        </div>
        <div className="flex">
          <button className="flex border border-solid border-[#1A1A1A] rounded-[40px] py-[12px] px-[17.40px]">
            <span className="flex items-center h-full mr-[8px]">
              {" "}
              <Image src={vector} alt="vector" />
            </span>
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}
